export default function Legend() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1.5 pt-4 text-[13px] font-medium text-muted">
      <span className="flex items-center gap-2">
        <span className="h-2.5 w-2.5 rounded-full bg-bday" />
        Birthday
      </span>
      <span className="flex items-center gap-2">
        <span className="h-2.5 w-2.5 rounded-full bg-annivdot" />
        Anniversary
      </span>
      <span className="flex items-center gap-2">
        <span className="h-2.5 w-2.5 rounded-full bg-evt" />
        Events
      </span>
    </div>
  )
}
