interface Option {
  storage: chrome.storage.LocalStorageArea
}

class EasyStorage {
  storage: chrome.storage.LocalStorageArea

  constructor(opt: Option) {
    this.storage = opt.storage
  }

  async get(key: string) {
    const res = await this.storage.get(key)
    return res[key]
  }

  async set(key: string, value: any) {
    await this.storage.set({
      [key]: value,
    })
  }
}

export const storage = new EasyStorage({ storage: chrome.storage.local })
