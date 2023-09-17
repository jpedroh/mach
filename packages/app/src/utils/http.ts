function http<
  R = unknown,
  T extends Record<string, string> = Record<string, string>,
>({ url, query }: { url: string; query: T }): Promise<R> {
  const fullUrl = `${url}?${new URLSearchParams(query).toString()}`
  console.log(`Making HTTP request to ${fullUrl}`)

  return fetch(fullUrl, { cache: 'no-store' }).then((response) =>
    response.json()
  )
}

export default http
