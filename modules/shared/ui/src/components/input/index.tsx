import { InputProps, Input as ReactAriaInput } from 'react-aria-components'

export function Input({ className = '', ...props }: InputProps) {
  return (
    <ReactAriaInput
      className={({ isFocused }) => {
        return [
          'py-2 px-3 pr-[2rem] rounded-lg border flex-grow dark:bg-gray-600 dark:border-gray-400 dark:text-gray-200',
          isFocused ? 'outline-none ring-2 ring-blue-400 ring-opacity-50' : '',
          className,
        ].join(' ')
      }}
      {...props}
    />
  )
}
