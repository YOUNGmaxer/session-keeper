import App from './App.vue'
import { getCookiesByDomain } from './modules/cookie'

const app = createApp(App)

app.mount('#app')

getCookiesByDomain('.moomoo.com')
