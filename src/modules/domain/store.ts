import { Domain, DomainAccountMap } from './type'

interface State {
  currentDomain: Domain
  domainMap: DomainAccountMap
}

export const useDomain = defineStore('domain', () => {
  state: (): State => ({
    currentDomain: '',
    domainMap: new Map(),
  })
})
