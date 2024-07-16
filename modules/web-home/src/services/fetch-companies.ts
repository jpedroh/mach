import { DatabaseConnection } from '@mach/shared-database'

export async function fetchCompanies(db: DatabaseConnection) {
  const companies = await db.query.companies.findMany({
    columns: {
      company: true,
    },
  })

  return companies.map((v) => String(v.company))
}
