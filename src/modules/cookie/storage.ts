import { storage } from '@/modules/storage'
import { Cookie } from './type'

export const saveAccountCookie = async (accountId: string, cookies: Cookie[]) => {
  await storage.set(accountId, cookies)
}

export const queryAccountCookie = async (accountId: string): Promise<Cookie[]> => {
  return await storage.get<Cookie[]>(accountId)
}
