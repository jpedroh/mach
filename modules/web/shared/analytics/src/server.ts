import { PostHog } from 'posthog-node'

interface AnalyticsClient {
  captureEvent<T extends Record<string, unknown>>(
    name: string,
    properties: T
  ): void
}

class PosthogAnalyticsClient implements AnalyticsClient {
  private readonly posthog: PostHog

  constructor({
    posthogHost,
    posthogKey,
  }: {
    posthogKey: string
    posthogHost: string
  }) {
    this.posthog = new PostHog(posthogKey, {
      host: posthogHost,
      flushAt: 1,
      flushInterval: 0,
    })
  }

  captureEvent<T extends Record<string, unknown>>(name: string, properties: T) {
    this.posthog.capture({ distinctId: 'server', event: name, properties })
    this.posthog.flush()
  }
}

export function getAnalyticsClient(): AnalyticsClient {
  return new PosthogAnalyticsClient({
    posthogHost: process.env.NEXT_PUBLIC_POSTHOG_HOST ?? '',
    posthogKey: process.env.NEXT_PUBLIC_POSTHOG_KEY ?? '',
  })
}
