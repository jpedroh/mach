import { db } from '@mach/shared/database'

export async function fetchCompanies() {
  const companies = await db.query.companies.findMany({
    columns: {
      company: true,
    },
  })

  return companies.map((v) => String(v.company))
}
