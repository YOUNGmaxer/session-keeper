import { queryCurrentUrl } from '@/libs/url'
import { Cookie } from './type'
import { logger } from '@/libs/logger'
import { checkIsCookieExpired } from './helper'

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

export async function setCookie(url: string, cookie: Cookie): Promise<Cookie> {
  return new Promise((resolve, reject) => {
    chrome.cookies.set(
      {
        url,
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
          reject(chrome.runtime.lastError)
        } else {
          resolve(newCookie)
        }
      }
    )
  })
}

export async function setCookies(cookies: Cookie[]): Promise<void> {
  const url = await queryCurrentUrl()
  const tasks = []
  for (const cookie of cookies) {
    // hostOnly 的 cookie 无法设置，跳过
    if (cookie.hostOnly) continue
    // 过期 cookie 跳过
    if (checkIsCookieExpired(cookie)) continue
    tasks.push(setCookie(url.href, cookie))
  }
  await Promise.allSettled(tasks)
}
