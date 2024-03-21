import { isExpired } from '@/utils/time'
import { Cookie } from './type'

/** 判断 Cookie 是否已经过期 */
export const checkIsCookieExpired = (cookie: Cookie): boolean => {
  if (!cookie.expirationDate) {
    // 如果没有过期时间，假设 Cookie 没有过期
    return false
  }

  return isExpired(cookie.expirationDate)
}
