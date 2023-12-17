import { SearchPage } from '@mach/web/search'

export const revalidate = 0

export const runtime = 'edge'

export const metadata = {
  title: 'Mach',
}

export default async function Search({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined }
  }) {

  return <SearchPage query={searchParams ?? {}} />
}
