import { getEnvironmentVariable } from '@mach/shared/env'
import { connect } from '@planetscale/database'
import { drizzle } from 'drizzle-orm/planetscale-serverless'
import * as schema from './schema'

const connection = connect({
  host: getEnvironmentVariable('DATABASE_HOST'),
  username: getEnvironmentVariable('DATABASE_USERNAME'),
  password: getEnvironmentVariable('DATABASE_PASSWORD'),
  fetch: (url, init) => {
    delete init['cache'] // Remove cache header
    return fetch(url, init)
  },
})

export const db = drizzle(connection, {
  schema,
  logger: true,
})
