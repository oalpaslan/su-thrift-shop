import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '@/components/HomePage'
import LogInPage from '@/components/LoginPage'
import Cart from '@/components/Cart'
import SignUpPage from '@/components/SignUpPage'
import Profile from '@/components/user/Profile'
import ForgotPassword from '@/components/ForgotPassword'
import Products from '@/components/Products'
import Product from '@/components/ProductPage'
import Auth from '@/components/Authentication'
import ProfileEdit from '@/components/user/ProfileEdit'
import OrderConfirmation from '@/components/OrderConfirmation'
import Logout from '@/components/views/Logout'
import AdminProfile from '@/components/AdminProfile'
Vue.use(Router)

export default new Router({
	mode: 'history',
	routes: [
		{
			path: '/',
			name: 'HomePage',
			component: HomePage
		},
		{
			path: '/login-page',
			name: 'LogInPage',
			component: LogInPage
		},
		{
			path: '/cart',
			name: 'Cart',
			component: Cart
		},
		{
			path: '/signup-page',
			name: 'SignUpPage',
			component: SignUpPage
		},
		{
			path: '/user/profile',
			name: 'Profile',
			component: Profile,
			meta: {
				requiresLogin: true
			}

		},
		{
			path: '*',
			name: 'HomePage',
			component: HomePage
		},
		{
			path: '/forgot-pass',
			name: 'ForgotPassword',
			component: ForgotPassword
		},
		{
			path: '/products',
			name: 'Products',
			component: Products
		},
		{
			path: '/product/:Pid',
			name: 'Product',
			component: Product
		},
		{
			path: '/authentication',
			name: 'Auth',
			component: Auth
		},
		{
			path: '/user/profedit',
			name: 'ProfileEdit',
			component: ProfileEdit,
			meta: {
				requiresLogin: true
			}
		},

		{
			path: '/confirmation',
			name: 'OrderConfirmation',
			component: OrderConfirmation
		}, {
			path: '/logout',
			name: 'Logout',
			component: Logout,
			meta: {
				requiresLogin: true
			}
		},
		{
			path: '/admin',
			name: 'AdminProfile',
			component: AdminProfile
		}


	]
})
