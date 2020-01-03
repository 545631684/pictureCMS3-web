const login = () => import( /* webpackChunkName: "group-foo" */ 'VIEWS/web/login/login.vue')
const enrollUser = () => import( /* webpackChunkName: "group-foo" */ 'VIEWS/web/enrollUser/enrollUser.vue')
const retrieveUser = () => import( /* webpackChunkName: "group-foo" */ 'VIEWS/web/retrieveUser/retrieveUser.vue')
const index = () => import( /* webpackChunkName: "group-foo" */ 'VIEWS/web/index/index.vue')
const article = () => import( /* webpackChunkName: "group-foo" */ 'VIEWS/web/article/article.vue')

export default [
  {
    path: '*',
    redirect: '/login'
  },
  {
    path: '/web',
    name: 'index',
    component: index,
  },
  {
    path: '/web/article/:id/:name/:tid/:searchTerms',
    name: 'article',
    component: article
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