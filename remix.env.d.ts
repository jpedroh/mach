export {}

declare module '@remix-run/cloudflare' {
  export interface AppLoadContext {
    cloudflare: {
      env: {
        TURSO_CONNECTION_URL: string
        TURSO_AUTH_TOKEN: string
      }
    }
  }
}
