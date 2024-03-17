import { queryCurrentDomain } from './api'
import { Domain, DomainAccountMap } from './type'

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
    },
  },
})
