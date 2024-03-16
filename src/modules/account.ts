import { TagId } from './tag'

/** 账户信息 */
export interface Account {
  /** 账户 ID */
  id: string
  /** 账户别名 */
  alias: string
  /** 账户所有标签 */
  tags: TagId[]
}
