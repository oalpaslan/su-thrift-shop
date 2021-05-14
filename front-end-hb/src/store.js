import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import { EventBus } from './event-bus.js';
Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		accessToken: null,
		refreshToken: null,
		APIData: '',
		uid: '',
		search: '',
	},
	mutations: {
		updateStorage(state, { access, refresh }) {
			state.accessToken = access
			state.refreshToken = refresh
		},
		destroyToken(state) {
			state.accessToken = null
			state.refreshToken = null
		},
		searchedObj(state, searched) {
			state.search = searched
		}
	},
	getters: {
		loggedIn(state) {
			return state.accessToken != null

		}
	},
	actions: {
		userLogout(context) {

			if (context.getters.loggedIn) {
				context.commit('destroyToken')
			}
		},
		userLogin(context, usercredentials) {
			return new Promise((resolve, reject) => {
				axios.post('http://127.0.0.1:8000/authentication/login/', {
					email: usercredentials.email,
					password: usercredentials.password
				})
					.then(response => {
						this.state.uid = usercredentials.email
						context.commit('updateStorage', { access: response.data.access, refresh: response.data.refresh })
						resolve()
						//EventBus.$emit('get-login-info', this.getters.loggedIn())
						console.log(access, refresh)
					})
					.catch(err => {
						reject(err)
					})
			})
		},
		logged() {
			EventBus.$emit("log", this.getters.loggedIn)
		},
		search(context) {
			return new Promise((resolve, reject) => {
				axios.get("http://127.0.0.1/productList/?search=")
					.then(response => {
						context.commit('searchedObj', { searched: response.data.productName })
						resolve()
						console.log(searched)
					})
					.catch(err => {
						console.log(err)
					})
			})
		}
	}
})
