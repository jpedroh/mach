import { ReactNode } from 'react'

export function Table({ children }: { children: ReactNode }) {
  return <table className={'table-fixed w-full'}>{children}</table>
}

Table.Head = function TableHead({ children }: { children: ReactNode }) {
  return (
    <thead className="bg-blue-700 text-white uppercase">
      <tr>{children}</tr>
    </thead>
  )
}

Table.Heading = function TableHeading({ children }: { children: ReactNode }) {
  return <th className="font-semibold p-2">{children}</th>
}

Table.Body = function TableBody({ children }: { children: ReactNode }) {
  return (
    <tbody className="bg-gray-300 bg-opacity-10 dark:text-white uppercase">
      {children}
    </tbody>
  )
}

Table.Row = function TableRow({ children }: { children: ReactNode }) {
  return <tr>{children}</tr>
}

Table.Column = function TableColumn({
  children,
  className = '',
  ...rest
}: { children: ReactNode } & React.HTMLAttributes<HTMLTableColElement>) {
  return (
    <td className={`p-2 text-center ${className}`} {...rest}>
      {children}
    </td>
  )
}
