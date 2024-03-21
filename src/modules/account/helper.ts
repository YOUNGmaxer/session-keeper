import { getCookies, Cookie } from '@/modules/cookie'

const keyCookies = ['uid']

/** 推测当前账户（根据关键 cookie） */
export async function interCurrentAccountId(): Promise<string> {
  const cookies = await getCookies()
  for (const keyCookie of keyCookies) {
    const cookie = cookies.find((item) => item.name === keyCookie)
    if (cookie) return cookie.value
  }
  return ''
}

/** 查找关键 Cookie（即当前账户）的过期时间 */
export function findAccountExpireTime(cookies: Cookie[]): number | null {
  for (const keyCookie of keyCookies) {
    const cookie = cookies.find((item) => item.name === keyCookie)
    if (cookie) return cookie.expirationDate || null
  }
  return null
}
