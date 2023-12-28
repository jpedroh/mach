import { twc } from 'react-twc'

const Container = twc.div`grid gap-4 text-center`
const Title = twc.h1`text-6xl font-light dark:text-white`
const SubTitle = twc.h2`text-2xl text-gray-500 dark:text-gray-300`

export function Header() {
  return (
    <Container>
      <Title>mach</Title>
      <SubTitle>An open source tool for flight simulation</SubTitle>
    </Container>
  )
}
