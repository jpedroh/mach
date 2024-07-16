import { DatabaseConnection } from '../../../../shared-database/src'

export async function fetchCompanies(db: DatabaseConnection) {
  const companies = await db.query.companies.findMany({
    columns: {
      company: true,
    },
  })

  return companies.map((v) => String(v.company))
}
