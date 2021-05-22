import Vue from 'vue'
import App from './App'
import store from './util/store.js'
import http from './util/http.js'

Vue.config.productionTip = false
Vue.prototype.$store = store;
Vue.prototype.$http = http;

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
