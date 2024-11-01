import { ReactNode } from 'react'
import {
  CheckboxProps,
  Checkbox as ReactAriaCheckbox,
} from 'react-aria-components'

type Props = {
  label: ReactNode
} & Omit<CheckboxProps, 'className'>

export function Checkbox({ label, ...props }: Props) {
  return (
    <div className="focus-within:outline-none focus-within:ring-2 focus-within:rounded focus-within:ring-offset-0 focus-within:ring-blue-400 focus-within:ring-opacity-50">
      <ReactAriaCheckbox
        className={'flex items-center gap-2 text-white'}
        {...props}
      >
        {({ isSelected }) => (
          <>
            <svg
              className={`w-6 h-6 border p-1 border-gray-400 fill-none transition-all rounded duration-200 ${
                isSelected ? 'bg-blue-600 stroke-white' : ''
              }`}
              viewBox="0 0 18 18"
              aria-hidden="true"
              style={{
                strokeWidth: isSelected ? '3px' : '0',
                strokeDashoffset: isSelected ? '44' : '66',
                strokeDasharray: '22px',
              }}
            >
              <polyline points="1 9 7 14 15 4" />
            </svg>
            {label}
          </>
        )}
      </ReactAriaCheckbox>
    </div>
  )
}
