export type TagId = string
export type TagColor = 'default' | 'primary' | 'info' | 'success' | 'warning' | 'error'

/** 标签 */
export interface Tag {
  /** 标签ID */
  id: TagId
  /** 标签名 */
  name: string
  /** 标签颜色 */
  color: TagColor
}
