import type { ReactNode } from 'react'
import { twc } from 'react-twc'
import { Footer } from './footer'
import { Header } from './header'

const Container = twc.div`bg-gray-100 min-h-screen flex flex-col gap-6 justify-center items-center dark:bg-gray-800 p-5 lg:px-40`
const Main = twc.div`grow flex flex-col justify-center items-center gap-6 w-full`

export function Layout({ children }: { children: ReactNode }) {
  return (
    <Container>
      <Main>
        <Header />
        {children}
      </Main>
      <Footer />
    </Container>
  )
}
