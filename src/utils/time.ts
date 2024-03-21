/** 是否过期 */
export const isExpired = (timestamp?: number): boolean => {
  if (!timestamp) return false
  const currentTime = Date.now() / 1000
  return currentTime > timestamp
}
