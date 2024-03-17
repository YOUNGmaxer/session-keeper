import { logger } from './logger'

type Tab = chrome.tabs.Tab

export async function getCurrentTab(): Promise<Tab | null> {
  return new Promise((resolve, reject) => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (chrome.runtime.lastError) {
        logger.error(chrome.runtime.lastError.message)
        resolve(null)
      } else if (tabs.length === 0) {
        logger.error('No active tab identified.')
        resolve(null)
      } else {
        resolve(tabs[0] as Tab)
      }
    })
  })
}

export async function reloadCurrentTab() {
  const tab = await getCurrentTab()
  if (tab?.id) chrome.tabs.reload(tab.id)
}
