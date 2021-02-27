import { createApp } from 'vue'
import App from './App.vue'
import StoryblokVue from 'storyblok-vue'

const app = createApp(App)
app.directive(StoryblokVue)
app.mount('#app')
