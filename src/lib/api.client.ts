type FetchConfigType = Parameters<typeof fetch>[1]

const baseUrl = (arg: string) => `${window.location.origin}/api/${arg}`
const baseConfig: FetchConfigType = {
  method: 'GET',
  headers: {
    'Content-type': 'application/json',
  },
  credentials: 'include',
}

export namespace ApiClient {
  export const get = (url: string) =>
    fetch(baseUrl(url), { ...baseConfig }).then((r) => r.json())

  export const post = (
    url: string,
    data: any,
    requestOptions?: FetchConfigType
  ) =>
    fetch(baseUrl(url), {
      ...baseConfig,
      method: 'POST',
      body: JSON.stringify(data),
      ...requestOptions,
    }).then((r) => r.json())
}
