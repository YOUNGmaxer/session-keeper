import { Account } from './account'

export type Domain = string

/** 域名和账户配置表 */
export type DomainAccountMap = Map<Domain, Account[]>
