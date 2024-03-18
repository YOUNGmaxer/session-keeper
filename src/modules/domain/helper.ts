import { Account } from '../account'

export const formatAccount = (account: Account): Account => ({
  ...account,
  tags: Array.isArray(account.tags) ? account.tags : Object.values(account.tags),
})

export const formatAccounts = (accounts: Account[]): Account[] => {
  return (Array.isArray(accounts) ? accounts : Object.values<Account>(accounts)).map((account) =>
    formatAccount(account)
  )
}
