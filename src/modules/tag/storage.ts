import { storage } from '@/modules/storage'
import { Tag } from './type'
import { logger } from '@/modules/logger'

const makeTagStorageKey = (domain: string): string => (domain ? `tag_${domain}` : `tag_common`)

export const saveTags = async (tags: Tag[], domain: string = '') => {
  await storage.set(makeTagStorageKey(domain), tags)
}

export const queryTags = async (domain = ''): Promise<Tag[]> => {
  try {
    return await storage.get(makeTagStorageKey(domain))
  } catch (err: any) {
    logger.error(err)
    return []
  }
}
