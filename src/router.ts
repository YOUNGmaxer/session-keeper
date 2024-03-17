import { createRouter, createWebHashHistory } from 'vue-router'
import Domain from '@/components/Domain/index.vue'
import Tag from '@/components/Tag/index.vue'

export enum RouterName {
  Domain = 'Domain',
  Tag = 'Tag',
}

export const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: RouterName.Domain,
      component: Domain,
    },
    {
      path: '/tag',
      name: RouterName.Tag,
      component: Tag,
    },
  ],
})
