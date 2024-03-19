const loadingMap: Map<string, Ref<boolean>> = new Map()

/** 如果没有 namespace，则为局部 loading */
export const useLoading = (namespace?: string) => {
  if (namespace && !loadingMap.has(namespace)) {
    loadingMap.set(namespace, ref(false))
  }
  const loading = namespace ? loadingMap.get(namespace)! : ref(false)
  const setLoading = (value: boolean) => (loading.value = value)

  return {
    loading,
    setLoading,
    startLoading: () => setLoading(true),
    endLoading: () => setLoading(false),
  }
}
