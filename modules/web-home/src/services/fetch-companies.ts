import type { DatabaseConnection } from '@mach/shared-database/connection'

export async function fetchCompanies(db: DatabaseConnection) {
  const companies = await db.query.companies.findMany({
    columns: {
      company: true,
    },
  })

  return companies.map((v) => String(v.company))
}
