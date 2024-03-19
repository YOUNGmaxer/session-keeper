import { storage } from '@/libs/storage'
import { Cookie } from './type'

export const saveAccountCookie = async (accountId: string, cookies: Cookie[]) => {
  await storage.set(accountId, cookies)
}

export const removeAccountCookie = async (accountId: string) => {
  await storage.remove(accountId)
}

export const queryAccountCookie = async (accountId: string): Promise<Cookie[]> => {
  return await storage.get<Cookie[]>(accountId)
}
