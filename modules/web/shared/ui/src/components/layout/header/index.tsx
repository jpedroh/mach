import { FC } from 'react'

export const Header: FC = () => {
  return (
    <div className={'text-center grid gap-4'}>
      <h1 className="text-6xl font-light dark:text-white">mach</h1>
      <h2 className="text-2xl text-gray-500 dark:text-gray-300">
        An open source tool for flight simulation
      </h2>
    </div>
  )
}
