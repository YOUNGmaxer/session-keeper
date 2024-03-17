import { getCookies, removeAccountCookie, saveAccountCookie } from '@/modules/cookie'
import { queryCurrentDomain } from './api'
import { queryDomainAccounts, saveDomainAccounts } from './storage'
import { Domain, DomainAccountMap } from './type'
import { Account } from '@/modules/account'

interface State {
  currentDomain: Domain
  domainMap: DomainAccountMap
}

export const useDomain = defineStore('domain', {
  state: (): State => ({
    currentDomain: '',
    domainMap: new Map(),
  }),

  getters: {
    currentAccounts: (state) => state.domainMap.get(state.currentDomain) || [],
  },

  actions: {
    async syncDomain() {
      this.currentDomain = await queryCurrentDomain()
      const accounts = await queryDomainAccounts(this.currentDomain)
      this.domainMap.set(this.currentDomain, Array.isArray(accounts) ? accounts : Object.values(accounts))
    },

    async saveDomain() {
      await saveDomainAccounts(this.currentDomain, this.currentAccounts)
    },

    async saveCookie(account: Account) {
      const cookies = await getCookies()
      await saveAccountCookie(account.id, cookies)
    },

    async addAccount(account: Account) {
      this.domainMap.set(this.currentDomain, [...toRaw(this.currentAccounts), account])
      await this.saveDomain()
      await this.saveCookie(account)
    },

    async deleteAccount(account: Account) {
      const accounts = toRaw(this.currentAccounts)
      this.domainMap.set(
        this.currentDomain,
        accounts.filter((item) => item.id !== account.id)
      )
      await this.saveDomain()
      await removeAccountCookie(account.id)
    },
  },
})
