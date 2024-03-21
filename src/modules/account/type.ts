import { TagId } from '@/modules/tag'

/** 账户信息 */
export interface Account {
  /** 账户 ID */
  id: string
  /** 账户别名 */
  alias: string
  /** 账户所有标签 */
  tags: TagId[]
  /** 登录态过期时间 */
  expireTime?: number
}
