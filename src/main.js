import { createApp } from 'vue'
import App from './App.vue'
import moment from 'moment'
import router from './router'
import firebase from "firebase/app";

const firebaseConfig = {
  apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
  authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VUE_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VUE_APP_FIREBASE_APP_ID,
};

firebase.initializeApp(firebaseConfig);

const app = createApp(App)

app.config.globalProperties.$filters = {
  formatDate(dt) {
    return moment(dt).format('MMMM DD, YYYY')
  }
}

app.use(router).mount('#app')
