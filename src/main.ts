import 'virtual:uno.css'
import App from './App.vue'
import { getCookiesByDomain } from './modules/cookie'
import { storage } from './modules/storage'
import { createPinia } from 'pinia'
import { queryCurrentDomain } from './modules/domain'

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.mount('#app')

queryCurrentDomain().then((res) => {
  console.log('current tab domain', res)
})

// getCookiesByDomain('.moomoo.com')

// storage.get('test').then((res) => {
//   console.log('first get', res)
//   storage.set('test', '111').then((res) => {
//     console.log('after set', res)
//     storage.get('test').then((res) => {
//       console.log('after get', res)
//     })
//   })
// })
