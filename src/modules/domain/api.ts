import { queryCurrentUrl } from '@/modules/url'

export async function queryCurrentDomain(): Promise<string> {
  const url = await queryCurrentUrl()
  return url.host
}
