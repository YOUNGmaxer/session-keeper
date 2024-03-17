import { queryAccountCookie, setCookies } from '@/modules/cookie'
import { Account } from './type'

interface State {
  currentAccount: Account | null
}

export const useAccount = defineStore('account', {
  state: (): State => ({
    currentAccount: null,
  }),

  actions: {
    /** 切换账户 */
    async switchAccount(account: Account) {
      if (this.currentAccount?.id === account.id) return
      this.currentAccount = account
      const cookies = await queryAccountCookie(account.id)
      console.log('azeryang => switchAccount => cookies:', cookies)
      await setCookies(cookies)
    },
  },
})
