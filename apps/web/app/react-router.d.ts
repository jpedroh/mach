import 'react-router'

declare module 'react-router' {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface AppLoadContext {
    cloudflare: {
      env: {
        TURSO_CONNECTION_URL: string
        TURSO_AUTH_TOKEN: string
      }
    }
  }
}
