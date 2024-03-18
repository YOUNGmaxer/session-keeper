import { queryTags, saveTags } from './storage'
import { Tag } from './type'

interface State {
  tags: Tag[]
}

export const useTag = defineStore('tag', {
  state: (): State => ({
    tags: [],
  }),

  actions: {
    /** 同步标签数据 */
    async syncTags() {
      this.tags = await queryTags()
    },

    async addTag(tag: Tag) {
      this.tags.push(tag)
      await saveTags(toRaw(this.tags))
    },
  },
})
