import { Account } from '@/modules/account'
import { Domain } from './type'
import { storage } from '@/modules/storage'
import { logger } from '@/modules/logger'

enum StorageKey {
  domains = 'domains',
}

export const updateDomains = async (domain: Domain) => {
  const domains = (await storage.get<Domain[]>(StorageKey.domains)) || []
  if (domains.includes(domain)) return
  await storage.set(StorageKey.domains, [...domains, domain])
}

export const queryDomains = async (): Promise<Domain[]> => {
  try {
    return await storage.get<Domain[]>(StorageKey.domains)
  } catch (err: any) {
    logger.error(err)
    return []
  }
}

export const saveDomainAccounts = async (domain: Domain, accounts: Account[]): Promise<void> => {
  try {
    await storage.set(domain, accounts)
    updateDomains(domain)
  } catch (err: any) {
    logger.error(err)
  }
}

export const queryDomainAccounts = async (domain: Domain): Promise<Account[]> => {
  try {
    return await storage.get<Account[]>(domain)
  } catch (err: any) {
    logger.error(err)
    return []
  }
}
