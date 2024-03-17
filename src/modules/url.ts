export async function queryCurrentUrl(): Promise<URL> {
  return new Promise((resolve, reject) => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (chrome.runtime.lastError) {
        reject(new Error(chrome.runtime.lastError.message))
      } else if (tabs.length > 0 && tabs[0].url) {
        const url = new URL(tabs[0].url)
        resolve(url)
      } else {
        reject(new Error('No active tab found'))
      }
    })
  })
}
