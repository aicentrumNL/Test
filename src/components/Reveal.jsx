import useReveal from '../hooks/useReveal'

// Subtiele fade/translate-in op scroll — CSS-transities, geen runtime-dependency.
export default function Reveal({ children, as: Tag = 'div', delay = 0, className = '', style, ...rest }) {
  const [ref, inView] = useReveal()
  const mergedStyle = delay ? { ...style, '--reveal-delay': `${Math.round(delay * 1000)}ms` } : style
  return (
    <Tag
      ref={ref}
      className={`reveal ${inView ? 'is-in' : ''} ${className}`.trim()}
      style={mergedStyle}
      {...rest}
    >
      {children}
    </Tag>
  )
}
