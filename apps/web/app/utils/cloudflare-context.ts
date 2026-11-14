import { createContext } from 'react-router'

export type CloudflareContextValue = {
  cloudflare: {
    env: {
      TURSO_CONNECTION_URL?: string
      TURSO_AUTH_TOKEN?: string
    }
  }
}

export const cloudflareContext = createContext<CloudflareContextValue>()
