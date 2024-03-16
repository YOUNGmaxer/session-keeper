import { Domain } from './domain'

export type Cookie = chrome.cookies.Cookie

export async function getCookiesByDomain(domain: Domain): Promise<Cookie[]> {
  return new Promise((resolve) => {
    chrome.cookies.getAll({ domain }, function (cookies) {
      resolve(cookies)
    })
  })
}
