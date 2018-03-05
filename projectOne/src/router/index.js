import Vue from 'vue'
import Router from 'vue-router'
import Listen from '@/components/Listen'
import Word from '@/components/Word'
import Read from '@/components/Read'
import Article from '@/components/Article'
import Lvideo from '@/components/Video'
import DailySentence from '@/components/DailySentence'
Vue.use(Router)
import "@/css/reset.scss"
import "@/css/iconfont.scss"
export default new Router({
    routes: [{
        path: '/',
        redirect: '/listen'
    }, {
        path: '/listen',
        name: 'Listen',
        component: Listen,
        meta: { keepAlive: true }
    }, {
        path: '/read',
        name: 'Read',
        component: Read,
        meta: { keepAlive: true }
    }, {
        path: '/article/:id',
        name: 'Article',
        component: Article,
        meta: { keepAlive: false }
    }, {
        path: '/video/:detail',
        name: 'Lvideo',
        component: Lvideo,
        meta: { keepAlive: false }
    }, {
        path: '/dailySentence/:sid',
        name: 'DailySentence',
        component: DailySentence,
        meta: { keepAlive: false }
    }, {
        path: '/word',
        name: 'Word',
        component: Word,
        meta: { keepAlive: true }
    }]
})