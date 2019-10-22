const login = () => import( /* webpackChunkName: "group-foo" */ 'VIEWS/web/login/login.vue')
const enrollUser = () => import( /* webpackChunkName: "group-foo" */ 'VIEWS/web/enrollUser/enrollUser.vue')
const retrieveUser = () => import( /* webpackChunkName: "group-foo" */ 'VIEWS/web/retrieveUser/retrieveUser.vue')

export default [
  {
    path: '*',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'login',
    component: login
  },
  {
    path: '/enrollUser',
    name: 'enrollUser',
    component: enrollUser
  },
  {
    path: '/retrieveUser',
    name: 'retrieveUser',
    component: retrieveUser
  },
]