import { queryAccountCookie, setCookies } from '@/modules/cookie'
import { Account } from './type'
import { useLoading } from '@/libs/loading'
import { logger } from '@/libs/logger'

interface State {
  currentAccount: Account | null
}

export const useAccount = defineStore('account', {
  state: (): State => ({
    currentAccount: null,
  }),

  actions: {
    /** 切换账户 */
    async switchAccount(account: Account): Promise<boolean> {
      if (this.currentAccount?.id === account.id) {
        logger.info('已切到当前账户', this.currentAccount.id, account.id)
        return false
      }
      const { startLoading, endLoading } = useLoading('global')
      startLoading()
      this.currentAccount = account
      try {
        const cookies = await queryAccountCookie(account.id)
        await setCookies(cookies)
        return true
      } catch (err) {
        logger.error(err)
        return false
      } finally {
        endLoading()
      }
    },
  },
})
