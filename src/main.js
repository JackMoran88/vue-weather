import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'


//FontAwesome
import {library} from '@fortawesome/fontawesome-svg-core'
import {
    faExclamation,
    faInfo,
    faPlus,
    faRedoAlt,
    faSearch,
    faTimes,
    faTrashAlt,
    faChevronLeft
} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'

library.add(faRedoAlt, faTrashAlt, faSearch, faPlus, faTimes, faExclamation, faInfo, faChevronLeft)
Vue.component('font-awesome-icon', FontAwesomeIcon)


Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
