export function getEnvironmentVariable(
  name: string,
  fallback?: string
): string {
  if (typeof process.env[name] === 'string') {
    return process.env[name] as string
  } else if (fallback) {
    return fallback
  }
  throw new Error(`Variable ${name} is not defined and no fallback provided`)
}
