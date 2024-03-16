import 'virtual:uno.css'
import App from './App.vue'
import { getCookiesByDomain } from './modules/cookie'
import { storage } from './modules/storage'

const app = createApp(App)

app.mount('#app')

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
