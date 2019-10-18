const login = () => import( /* webpackChunkName: "group-foo" */ 'VIEWS/web/login/login.vue')
const enrollUser = () => import( /* webpackChunkName: "group-foo" */ 'VIEWS/web/enrollUser/enrollUser.vue')

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
]