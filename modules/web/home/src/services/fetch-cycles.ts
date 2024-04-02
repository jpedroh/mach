import { db } from '@mach/shared/database'

export async function fetchCycles() {
  const cycles = await db.query.cycles.findMany({
    columns: { cycle: true },
    orderBy: (cycles, { desc }) => desc(cycles.cycle),
  })
  return cycles.map((v) => v.cycle)
}
