import { getCookies, removeAccountCookie, saveAccountCookie } from '@/modules/cookie'
import { queryCurrentDomain } from './api'
import { queryDomainAccounts, saveDomainAccounts } from './storage'
import { Domain, DomainAccountMap } from './type'
import { Account, interCurrentAccountId, useAccount } from '@/modules/account'

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
      await this.syncCurrentAccount()
    },

    /** 同步当前用户 */
    async syncCurrentAccount() {
      const currentAccountId = await interCurrentAccountId()
      if (currentAccountId) {
        const currentAccount = this.currentAccounts.find((item) => item.id === currentAccountId)
        if (currentAccount) useAccount().currentAccount = currentAccount
      }
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
