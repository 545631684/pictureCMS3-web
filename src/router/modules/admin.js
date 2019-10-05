const backstage = () => import( /* webpackChunkName: "group-foo" */ 'VIEWS/admin/backstage/backstage.vue')

export default [
  {
    path: '/backstage',
    name: 'backstage',
    component: backstage
  },
]