import Select from "react-select";

export function SelectInput<Option>(props: {
  options: Option[];
  onChange: (value: string) => void;
  name: string;
}) {
  return (
    <Select
      options={props.options}
      name={props.name}
      unstyled
      classNames={{
        control: (state) => {
          let className =
            "py-2 px-3 rounded-lg border dark:bg-gray-600 dark:border-gray-800 dark:text-gray-200";
          if (state.isFocused) {
            className += " outline-none ring-2 ring-blue-400 ring-opacity-50";
          }
          return className;
        },
        option(props) {
          let className = `py-2 px-4 ${
            props.isFocused
              ? "bg-blue-600 text-white"
              : "bg-white dark:bg-gray-600 dark:text-gray-200"
          }`;
          return className;
        },
      }}
      onChange={(evt: any) => props.onChange(!!evt ? evt.value : "")}
    ></Select>
  );
}
