// CTA wrapper with a light sweeping around an animated gradient border. The
// inner pill carries its own background (innerClassName) so only the border ring
// animates. Use for primary calls-to-action.
export default function StarBorder({
  as: Tag = 'a',
  className = '',
  innerClassName = 'bg-navy text-white',
  color = '#F7A600',
  speed = 5,
  children,
  ...rest
}) {
  return (
    <Tag
      className={`star-border ${className}`}
      style={{ '--star-color': color, '--star-speed': `${speed}s` }}
      {...rest}
    >
      <span className={`star-border-inner ${innerClassName}`}>{children}</span>
    </Tag>
  )
}
