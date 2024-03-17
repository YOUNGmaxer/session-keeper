import { Account } from '@/modules/account'
import { Domain } from './type'
import { storage } from '@/modules/storage'
import { logger } from '@/modules/logger'

export const saveDomainAccounts = async (domain: Domain, accounts: Account[]): Promise<void> => {
  try {
    await storage.set(domain, accounts)
  } catch (err: any) {
    logger.error(err)
  }
}

export const queryDomainAccounts = async (domain: Domain): Promise<Account[]> => {
  try {
    const res = await storage.get<Account[]>(domain)
    return res
  } catch (err: any) {
    logger.error(err)
    return []
  }
}
