import Select from 'react-select'

type Option = { value: string; label: string }

export function SelectInput(props: {
  options: Option[]
  onChange: (value: string) => void
  name: string
  defaultValue?: Option
}) {
  return (
    <Select<Option>
      options={props.options}
      name={props.name}
      unstyled
      defaultValue={props.defaultValue}
      classNames={{
        control: (state) => {
          let className =
            'py-2 px-3 rounded-lg border dark:bg-gray-600 dark:border-gray-800 dark:text-gray-200'
          if (state.isFocused) {
            className += ' outline-none ring-2 ring-blue-400 ring-opacity-50'
          }
          return className
        },
        option(props) {
          const className = `py-2 px-4 ${
            props.isFocused
              ? 'bg-blue-600 text-white'
              : 'bg-white dark:bg-gray-600 dark:text-gray-200'
          }`
          return className
        },
      }}
      onChange={(evt) => props.onChange(evt?.value ?? '')}
    ></Select>
  )
}
