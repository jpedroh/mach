import { HomePage } from '@mach/web/home/server'

export const revalidate = 3600

export const runtime = 'edge'

export const metadata = {
  title: 'Mach',
}

export default async function Page() {
  return <HomePage />
}
