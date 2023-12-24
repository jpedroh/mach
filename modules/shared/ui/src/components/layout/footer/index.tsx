import { Link } from '@mach/shared/ui/server'

export function Footer() {
  return (
    <div className={'dark:text-white text-center w-full'}>
      <p>
        <Link href="https://github.com/jpedroh/mach/" target="_blank">
          Mach
        </Link>
        {' - '}
        Use for flight simulation only
      </p>
      <p>
        Developed by{' '}
        <Link href="https://jpedroh.dev" target="_blank">
          João Pedro Henrique
        </Link>
      </p>
    </div>
  )
}
