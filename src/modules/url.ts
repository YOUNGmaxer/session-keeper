import { getCurrentTab } from './tab'

export async function queryCurrentUrl(): Promise<URL> {
  const currentTab = await getCurrentTab()
  return new URL(currentTab?.url || '')
}
