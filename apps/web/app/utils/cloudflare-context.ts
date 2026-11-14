import { createContext } from 'react-router'

export interface CloudflareContextValue {
  cloudflare: {
    env: Env
    ctx: ExecutionContext
  }
}

export const cloudflareContext = createContext<CloudflareContextValue>()
