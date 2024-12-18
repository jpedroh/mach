'use client'

import { twc } from 'react-twc'
import { Link } from '../../link'

const Container = twc.div`dark:text-white text-center w-full`

export function Footer() {
  return (
    <Container>
      <p>
        <Link
          href="https://github.com/jpedroh/mach/"
          target="_blank"
          rel="noreferrer"
        >
          Mach
        </Link>
        {' - '}
        Use for flight simulation only
      </p>
      <p>
        Developed by{' '}
        <Link href="https://jpedroh.dev" target="_blank" rel="noreferrer">
          João Pedro Henrique
        </Link>
      </p>
    </Container>
  )
}
