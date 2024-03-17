import { getCookies } from '@/modules/cookie'
import { queryCurrentDomain } from './api'
import { queryDomainData, saveDomainData } from './storage'
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
      getCookies().then((res) => console.log('cookie', res))
      const domainData = await queryDomainData(this.currentDomain)
      this.domainMap.set(this.currentDomain, domainData)
    },

    async saveDomain() {
      await saveDomainData(this.currentDomain, this.currentAccounts)
    },

    async addAccount(account: Account) {
      this.domainMap.set(this.currentDomain, [...this.currentAccounts, account])
      await this.saveDomain()
    },
  },
})
