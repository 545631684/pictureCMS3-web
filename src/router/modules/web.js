const login = () => import( /* webpackChunkName: "group-foo" */ 'VIEWS/web/login/login.vue')

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
]