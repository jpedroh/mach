export {}

declare module 'react-router' {
  interface AppLoadContext {
    cloudflare: {
      env: {
        TURSO_CONNECTION_URL: string
        TURSO_AUTH_TOKEN: string
      }
    }
  }
}
