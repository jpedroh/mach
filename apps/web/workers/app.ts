import { createRequestHandler, RouterContextProvider } from 'react-router'

import { cloudflareContext } from '../app/utils/cloudflare-context'

const requestHandler = createRequestHandler(
  () => import('virtual:react-router/server-build'),
  import.meta.env.MODE,
)

export default {
  async fetch(request, env, ctx) {
    const context = new RouterContextProvider()
    context.set(cloudflareContext, { cloudflare: { env, ctx } })
    return requestHandler(request, context)
  },
} satisfies ExportedHandler<Env>
