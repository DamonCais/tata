// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'
import store from "@/store"
import VueLazyLoad from 'vue-lazyload'

Vue.use(VueLazyLoad, {
    error: '../static/lazy.jpg',
    loading: '../static/lazy.jpg'
})
Vue.config.productionTip = false
    // Vue.use(Vuex);
Vue.use(VueResource);
/* eslint-disable no-new */


new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
})