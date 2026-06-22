/*
 * Animated terminal-grid background.
 *
 * A full-viewport grid of white boxes separated by thin grey grid lines.
 * Soft colour "splashes" (blue / red) float ABOVE the grid — they are smooth
 * organic blobs, not aligned to the squares, and the grid shows through them.
 * Hovering the grid lifts the tiles under the cursor: they rise, grow a touch
 * and cast a soft shadow, easing back down as the cursor moves away.
 *
 * Pure canvas, zero dependencies, self-contained.
 */
(function () {
  'use strict';

  var canvas = document.getElementById('grid');
  var ctx = canvas.getContext('2d');

  // ---- Tunables -----------------------------------------------------------
  var PITCH = 10;          // distance between cell centres (px, CSS)
  var GAP = 1;             // gap between boxes = width of the grid lines (px)
  var SPEED = 0.00028;     // global time scale (low = slow, subtle drift)
  var SPLASH_CELLS = 10.8; // splash core radius in grid cells (~108px, kept ~constant)
  var SPLASH_ALPHA = 0.4;  // peak splash opacity (grid stays visible through it)

  // Hover lift
  var HOVER_RADIUS = 95;   // cursor influence radius (px)
  var MAX_LIFT = 9;        // how far the nearest tile rises (px)
  var GROW = 4;            // extra size of a fully lifted tile (px)
  var EASE = 0.14;         // hover fade-in / fade-out speed

  // Colours as [r, g, b].
  var LINE = [225, 228, 234];  // grey grid line (resting, light)
  var WHITE = '#ffffff';       // box interior
  var BLUE = [37, 99, 235];    // blue accent
  var RED = [222, 47, 62];     // red accent
  var lineStr = 'rgb(' + LINE[0] + ',' + LINE[1] + ',' + LINE[2] + ')';

  // Splash anchors. nx/ny = home position (0..1 of the viewport),
  // ax/ay = drift amplitude (fraction), sx/sy = drift speed, ph = phase,
  // hue = 0 (blue) | 1 (red).
  var BLOBS = [
    // Top-right corner: blue + red
    { nx: 0.95, ny: 0.05, ax: 0.015, ay: 0.015, sx: 0.21, sy: 0.17, ph: 0.0, hue: 0 },
    { nx: 0.85, ny: 0.06, ax: 0.015, ay: 0.015, sx: 0.16, sy: 0.23, ph: 1.7, hue: 1 },
    // Bottom-left corner: blue + red
    { nx: 0.05, ny: 0.95, ax: 0.015, ay: 0.015, sx: 0.19, sy: 0.15, ph: 3.1, hue: 0 },
    { nx: 0.15, ny: 0.94, ax: 0.015, ay: 0.015, sx: 0.14, sy: 0.20, ph: 4.6, hue: 1 },
    // Opposite corners: a single colour each
    { nx: 0.05, ny: 0.05, ax: 0.015, ay: 0.015, sx: 0.18, sy: 0.21, ph: 2.2, hue: 0 }, // top-left: blue
    { nx: 0.95, ny: 0.95, ax: 0.015, ay: 0.015, sx: 0.20, sy: 0.16, ph: 5.0, hue: 1 } // bottom-right: red
  ];

  // ---- State --------------------------------------------------------------
  var W = 0, H = 0, dpr = 1;
  var cols = 0, rows = 0;
  var box = 0;                 // drawn box size in CSS px
  var splashR = 60;            // splash core radius in px (from SPLASH_CELLS)

  var mouseX = -1, mouseY = -1;
  var hoverStrength = 0, hoverTarget = 0;

  // Offscreen canvas holding the static grid (drawn once per resize, blitted
  // each frame) so tiny cells don't cost thousands of fillRects per frame.
  var gridCanvas = null, gctx = null;

  var reduceMotion = window.matchMedia
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false;

  function smoothstep(e0, e1, x) {
    var t = (x - e0) / (e1 - e0);
    t = t < 0 ? 0 : t > 1 ? 1 : t;
    return t * t * (3 - 2 * t);
  }

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = window.innerWidth;
    H = window.innerHeight;

    canvas.width = Math.floor(W * dpr);
    canvas.height = Math.floor(H * dpr);
    canvas.style.width = W + 'px';
    canvas.style.height = H + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    cols = Math.ceil(W / PITCH) + 1;
    rows = Math.ceil(H / PITCH) + 1;
    box = PITCH - GAP;
    splashR = SPLASH_CELLS * PITCH;
    buildGrid();
  }

  // Render the static grid (grey lines + white boxes) to the offscreen canvas.
  function buildGrid() {
    if (!gridCanvas) {
      gridCanvas = document.createElement('canvas');
      gctx = gridCanvas.getContext('2d');
    }
    gridCanvas.width = canvas.width;
    gridCanvas.height = canvas.height;
    gctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    gctx.fillStyle = lineStr;
    gctx.fillRect(0, 0, W, H);
    gctx.fillStyle = WHITE;
    for (var gy = 0; gy < rows; gy++) {
      var py = gy * PITCH;
      for (var gx = 0; gx < cols; gx++) {
        gctx.fillRect(gx * PITCH, py, box, box);
      }
    }
  }

  // One soft radial blob of colour, fading to transparent at its edge.
  function blob(x, y, r, col, a) {
    if (a <= 0.01 || r <= 0) return;
    var c = col[0] + ',' + col[1] + ',' + col[2];
    var grad = ctx.createRadialGradient(x, y, 0, x, y, r);
    grad.addColorStop(0, 'rgba(' + c + ',' + a.toFixed(3) + ')');
    grad.addColorStop(0.65, 'rgba(' + c + ',' + a.toFixed(3) + ')'); // solid core
    grad.addColorStop(1, 'rgba(' + c + ',0)');                       // blur only on the border
    ctx.fillStyle = grad;
    ctx.fillRect(x - r, y - r, r * 2, r * 2);
  }

  // Cursor influence (0..1) at a tile centre, eased by hoverStrength.
  function influenceAt(px, py) {
    var dx = px - mouseX;
    var dy = py - mouseY;
    var d = Math.sqrt(dx * dx + dy * dy);
    if (d >= HOVER_RADIUS) return 0;
    return smoothstep(0, 1, 1 - d / HOVER_RADIUS) * hoverStrength;
  }

  function frame(now) {
    var t = reduceMotion ? 1000 : now * SPEED;
    var gx, gy, px, py;

    hoverStrength += (hoverTarget - hoverStrength) * EASE;

    // Pass 1+2: blit the pre-rendered static grid (grey lines + white boxes).
    ctx.globalCompositeOperation = 'source-over';
    ctx.shadowBlur = 0;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    ctx.drawImage(gridCanvas, 0, 0, W, H);

    // Pass 3: hover lift — redraw the tiles under the cursor, raised, grown and
    // shadowed, so the shadow reads as depth.
    if (mouseX >= 0 && hoverStrength > 0.01) {
      var reach = HOVER_RADIUS + MAX_LIFT + GROW;
      var gx0 = Math.max(0, Math.floor((mouseX - reach) / PITCH));
      var gx1 = Math.min(cols - 1, Math.ceil((mouseX + reach) / PITCH));
      var gy0 = Math.max(0, Math.floor((mouseY - reach) / PITCH));
      var gy1 = Math.min(rows - 1, Math.ceil((mouseY + reach) / PITCH));

      for (gy = gy0; gy <= gy1; gy++) {
        for (gx = gx0; gx <= gx1; gx++) {
          px = gx * PITCH;
          py = gy * PITCH;
          var inf = influenceAt(px + box / 2, py + box / 2);
          if (inf <= 0.01) continue;

          var lift = inf * MAX_LIFT;
          var grow = inf * GROW;

          ctx.shadowColor = 'rgba(24,42,78,' + (0.32 * inf).toFixed(3) + ')';
          ctx.shadowBlur = 6 + 8 * inf;
          ctx.shadowOffsetY = 3 + 6 * inf;
          ctx.fillStyle = WHITE;
          ctx.fillRect(px - grow * 0.5, py - lift - grow * 0.5, box + grow, box + grow);
          ctx.shadowBlur = 0;
          ctx.shadowOffsetY = 0;
        }
      }
      ctx.shadowBlur = 0;
      ctx.shadowOffsetY = 0;
    }

    // Pass 4: colour splashes floating ABOVE the grid. Each is a main blob plus
    // a couple of smaller droplets for an organic, splashed look.
    for (var bi = 0; bi < BLOBS.length; bi++) {
      var bl = BLOBS[bi];
      var x = (bl.nx + bl.ax * Math.sin(t * bl.sx + bl.ph)) * W;
      var y = (bl.ny + bl.ay * Math.cos(t * bl.sy + bl.ph)) * H;
      var col = bl.hue ? RED : BLUE;
      var pulse = 0.85 + 0.15 * Math.sin(t * 1.4 + bl.ph);
      var a = SPLASH_ALPHA * pulse;

      blob(x, y, splashR, col, a);

      for (var j = 0; j < 1; j++) {
        var ang = bl.ph * 1.7 + j * 2.5;
        var off = splashR * (0.45 + 0.15 * j);
        blob(
          x + Math.cos(ang) * off,
          y + Math.sin(ang) * off * 0.85,
          splashR * (0.5 - j * 0.12),
          col,
          a * 0.7
        );
      }
    }

    requestAnimationFrame(frame);
  }

  // ---- Input --------------------------------------------------------------
  window.addEventListener('mousemove', function (e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
    hoverTarget = 1;
  });
  window.addEventListener('mouseout', function (e) {
    if (!e.relatedTarget) hoverTarget = 0; // cursor left the window
  });
  window.addEventListener('blur', function () {
    hoverTarget = 0;
  });

  window.addEventListener('resize', resize);
  resize();
  requestAnimationFrame(frame);
})();
