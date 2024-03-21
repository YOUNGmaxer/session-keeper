import { Cookie, queryAccountCookie } from '@/modules/cookie'
import { findAccountExpireTime } from './helper'
import { Account } from './type'

/** 同步账户状态（比如有效期） */
export async function syncAccountStatus(account: Account): Promise<Cookie[]> {
  const cookies = await queryAccountCookie(account.id)
  const expireTime = findAccountExpireTime(cookies)
  if (expireTime) account.expireTime = expireTime
  return cookies
}
