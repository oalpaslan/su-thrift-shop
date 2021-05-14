
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import '@babel/polyfill'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Vuex from 'vuex'
import IdleVue from 'idle-vue'
import VueAnalytics from 'vue-analytics'

Vue.use(VueAnalytics, {
	id: 'UA-187904986-1',
	router,
	config: 'G-YWLC6KXY82'
})

const eventsHub = new Vue()

Vue.use(IdleVue, {
	eventEmitter: eventsHub,
	idleTime: 5000
})

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
	if (to.matched.some(record => record.meta.requiresLogin)) {
		if (!store.getters.loggedIn) {
			next({ name: 'LogInPage' })
		} else {
			next()
		}
	} else {
		next()
	}
})


/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	vuetify,
	store,
	axios,
	Vuex,
	VueAxios,
	render: h => h(App)
})

