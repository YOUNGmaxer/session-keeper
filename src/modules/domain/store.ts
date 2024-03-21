import { getCookies, removeAccountCookie, saveAccountCookie } from '@/modules/cookie'
import { queryCurrentDomain } from './api'
import { queryDomainAccounts, saveDomainAccounts } from './storage'
import { Domain, DomainAccountMap } from './type'
import { Account, interCurrentAccountId, useAccount } from '@/modules/account'
import { formatAccounts } from './helper'

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
      this.domainMap.set(this.currentDomain, formatAccounts(accounts))
      await this.syncCurrentAccount()
    },

    /** 同步当前用户 */
    async syncCurrentAccount() {
      const currentAccountId = await interCurrentAccountId()
      if (currentAccountId) {
        useAccount().currentCookieAccountId = currentAccountId
        const currentAccount = this.currentAccounts.find((item) => item.id === currentAccountId)
        if (currentAccount) {
          await useAccount().updateCurrentAccount(currentAccount)
        }
      }
    },

    async saveDomain() {
      await saveDomainAccounts(this.currentDomain, this.currentAccounts)
    },

    /** 只能添加当前登录的账户 */
    async addAccount(account: Account) {
      this.domainMap.set(this.currentDomain, [...toRaw(this.currentAccounts), account])
      // 更新当前账户为新添加的账户
      await useAccount().updateCurrentAccount(account)
      await this.saveDomain()
    },

    /** 更新账户 */
    async updateAccount(account: Account) {
      // 更新其中的一个账户
      this.domainMap.set(
        this.currentDomain,
        this.currentAccounts.map((item) => (item.id === account.id ? account : item))
      )
      await this.saveDomain()
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
