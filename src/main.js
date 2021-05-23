import { createApp } from 'vue'
import App from './App.vue'
import moment from 'moment'
import router from './router'

const app = createApp(App)

app.config.globalProperties.$filters = {
  formatDate(dt) {
    return moment(dt).format('MMMM DD, YYYY')
  }
}

app.use(router).mount('#app')
