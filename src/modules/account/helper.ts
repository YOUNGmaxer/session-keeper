import { getCookies } from '@/modules/cookie'

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
