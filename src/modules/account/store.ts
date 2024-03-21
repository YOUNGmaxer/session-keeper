import { queryAccountCookie, saveAccountCookie, setCookies, Cookie } from '@/modules/cookie'
import { Account } from './type'
import { useLoading } from '@/libs/loading'
import { logger } from '@/libs/logger'
import { isExpired } from '@/utils/time'
import { Message } from '@/plugins/message'
import { syncAccountStatus } from './api'

interface State {
  currentCookieAccountId: string
  currentAccount: Account | null
}

export const useAccount = defineStore('account', {
  state: (): State => ({
    currentCookieAccountId: '',
    currentAccount: null,
  }),

  actions: {
    /** 更新当前账户 */
    async updateCurrentAccount(account: Account) {
      const cookies = await syncAccountStatus(account)
      this.currentAccount = account
      // 同步 Cookie
      await saveAccountCookie(account.id, cookies)
    },

    /** 切换账户 */
    async switchAccount(account: Account): Promise<boolean> {
      if (this.currentAccount?.id === account.id) {
        logger.info('已切到当前账户', this.currentAccount.id, account.id)
        return false
      }
      // 先同步账户状态，以便后续判断是否可以进行切换
      await syncAccountStatus(account)
      if (account.expireTime && isExpired(account.expireTime)) {
        logger.warn(`账户(${account.id})已过期，暂无法切换`)
        Message?.error(`账户(${account.id})已过期，暂无法切换`)
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
