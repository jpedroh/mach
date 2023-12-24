import { ListBoxItemProps, ListBoxItem } from 'react-aria-components'
import { Option } from './types'

export function SelectOption({
  className = '',
  ...rest
}: ListBoxItemProps<Option>) {
  return (
    <ListBoxItem
      className={({ isFocused, isSelected }) => {
        return [
          'py-2 px-4 min-w-[10rem]',
          isFocused || isSelected
            ? 'bg-blue-600 text-white'
            : 'bg-white dark:bg-gray-600 dark:text-gray-200',
          className,
        ].join(' ')
      }}
      {...rest}
    />
  )
}
