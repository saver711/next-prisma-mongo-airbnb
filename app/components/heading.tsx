import clsx from "clsx"

type HeadingProps = {
  title: string
  subtitle?: string
  center?: boolean
}

export const Heading = ({ title, center, subtitle }: HeadingProps) => {
  const containerClasses = clsx({
    "text-center": center,
    "text-start": !center,
  })
  return (
    <div className={clsx(containerClasses)}>
      <div className="text-2xl font-bold">{title}</div>
      {subtitle && <div className="text-neutral-500 mt-2 font-light">{subtitle}</div>}
    </div>
  )
}
