import { queryCurrentUrl } from '@/modules/url'
import { Cookie } from './type'
import { logger } from '../logger'

export async function getCookiesByDomain(domain: string): Promise<Cookie[]> {
  return new Promise((resolve) => {
    chrome.cookies.getAll({ domain }, function (cookies) {
      resolve(cookies)
    })
  })
}

export async function getCookies(): Promise<Cookie[]> {
  return new Promise((resolve) => {
    chrome.cookies.getAll({}, function (cookies) {
      resolve(cookies)
    })
  })
}

export async function setCookies(cookies: Cookie[]) {
  return new Promise(async (resolve) => {
    const url = await queryCurrentUrl()
    for (const cookie of cookies) {
      chrome.cookies.set(
        {
          url: url.href,
          domain: cookie.domain,
          name: cookie.name,
          storeId: cookie.storeId,
          value: cookie.value,
          expirationDate: cookie.expirationDate,
          path: cookie.path,
          httpOnly: cookie.httpOnly,
          secure: cookie.secure,
          sameSite: cookie.sameSite,
        },
        (newCookie) => {
          if (!newCookie) {
            logger.error(cookie, chrome.runtime.lastError)
          }
        }
      )
    }
  })
}
