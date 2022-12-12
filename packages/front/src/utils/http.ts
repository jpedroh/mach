function http<R = any, T = any>({
  url,
  query
}: {
  url: string
  query: T
}): Promise<R> {
  const fullUrl = `${url}?${new URLSearchParams(query as any).toString()}`

  return fetch(fullUrl, { cache: "no-store" }).then((response) =>
    response.json()
  );
}

export default http
