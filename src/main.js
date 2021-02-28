import { createApp } from 'vue'
import App from './App.vue'
import StoryblokVue from 'storyblok-vue'
import moment from 'moment'
import router from './router'

const app = createApp(App)

app.config.globalProperties.$filters = {
  formatDate(dt) {
    console.log(dt);
    return moment(dt).format('MMMM DD, YYYY')
  }
}

app.directive(StoryblokVue)
app.use(router).mount('#app')
