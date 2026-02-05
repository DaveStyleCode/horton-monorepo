import {StringInputProps} from 'sanity'

export function UrlWithLink(props: StringInputProps) {
  const {value, renderDefault} = props

  return (
    <div style={{display: 'flex', flexDirection: 'column', gap: '12px'}}>
      {renderDefault(props)}
      {value && (
        <a
          href={value}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '8px 12px',
            borderRadius: '4px',
            border: '1px solid currentColor',
            color: '#2276fc',
            textDecoration: 'none',
            fontSize: '13px',
            width: 'fit-content',
          }}
        >
          Open link ↗
        </a>
      )}
    </div>
  )
}
