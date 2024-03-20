import { Cookie } from './type'

/** 判断 Cookie 是否已经过期 */
export const checkIsCookieExpired = (cookie: Cookie): boolean => {
  if (!cookie.expirationDate) {
    // 如果没有过期时间，假设 Cookie 没有过期
    return false
  }

  // 将当前时间和 Cookie 的过期时间转换为毫秒
  const currentTime = Date.now() / 1000
  const expirationTime = cookie.expirationDate

  // 判断当前时间是否大于 Cookie 的过期时间
  return currentTime > expirationTime
}
