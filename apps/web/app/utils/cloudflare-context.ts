import { createContext } from 'react-router'

export type CloudflareContextValue = {
  cloudflare: {
    env: Env
    ctx: ExecutionContext
  }
}

export const cloudflareContext = createContext<CloudflareContextValue>()
