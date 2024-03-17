import { Cookie } from './type'

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
