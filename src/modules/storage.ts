import { logger } from './logger'

interface Option {
  storage: chrome.storage.LocalStorageArea
}

class EasyStorage {
  storage: chrome.storage.LocalStorageArea

  constructor(opt: Option) {
    this.storage = opt.storage
  }

  async get<T>(key: string): Promise<T> {
    const res = await this.storage.get(key)
    return res[key]
  }

  async set(key: string, value: any) {
    try {
      await this.storage.set({
        [key]: value,
      })
    } catch (err: any) {
      logger.error(err)
    }
  }
}

export const storage = new EasyStorage({ storage: chrome.storage.local })
