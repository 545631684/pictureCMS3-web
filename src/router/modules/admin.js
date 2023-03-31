const backstage = () => import( /* webpackChunkName: "group-foo" */ 'VIEWS/admin/backstage/backstage.vue')
const backstageIndex = () => import( /* webpackChunkName: "group-foo" */ 'VIEWS/admin/backstageIndex/backstageIndex.vue')
const articleAdd = () => import( /* webpackChunkName: "group-foo" */ 'VIEWS/admin/articleAdd/articleAdd.vue')
const articleUpdate = () => import( /* webpackChunkName: "group-foo" */ 'VIEWS/admin/articleUpdate/articleUpdate.vue')
const seeArticle = () => import( /* webpackChunkName: "group-foo" */ 'VIEWS/admin/seeArticle/seeArticle.vue')
const recoveryArticle = () => import( /* webpackChunkName: "group-foo" */ 'VIEWS/admin/recoveryArticle/recoveryArticle.vue')
const statistics = () => import( /* webpackChunkName: "group-foo" */ 'VIEWS/admin/statistics/statistics.vue')
const userList = () => import( /* webpackChunkName: "group-foo" */ 'VIEWS/admin/userList/userList.vue')
const userRecovery = () => import( /* webpackChunkName: "group-foo" */ 'VIEWS/admin/userRecovery/userRecovery.vue')
const userGroup = () => import( /* webpackChunkName: "group-foo" */ 'VIEWS/admin/userGroup/userGroup.vue')
const category = () => import( /* webpackChunkName: "group-foo" */ 'VIEWS/admin/category/category.vue')
const userInfo = () => import( /* webpackChunkName: "group-foo" */ 'VIEWS/admin/userInfo/userInfo.vue')
const userCollect = () => import( /* webpackChunkName: "group-foo" */ 'VIEWS/admin/userCollect/userCollect.vue')

export default [
  {
    path: '/backstage',
    name: 'backstage',
    component: backstage,
    redirect: '/backstage/home',
    children: [
      {
        // 后台首页 也是个人中心
        path: 'home',
        name: 'home',
        component: backstageIndex
      },
      {
        // 上传img
        path: 'articleAdd',
        name: 'backstageArticleAdd',
        component: articleAdd
      },
      {
        // 修改img
        path: 'articleUpdate/:id',
        name: 'backstageArticleUpdate',
        component: articleUpdate
      },
      {
        // 查看文章
        path: 'seeArticle',
        name: 'backstageSeeArticle',
        component: seeArticle
      },
      {
        // 文章回收站
        path: 'recoveryArticle',
        name: 'backstageRecoveryArticle',
        component: recoveryArticle
      },
      {
        // 统计页面
        path: 'statistics',
        name: 'backstageStatistics',
        component: statistics
      },
      {
        // 用户列表页
        path: 'userList',
        name: 'backstageUserList',
        component: userList
      },
      {
        // 用户信息
        path: 'userInfo',
        name: 'backstageUserInfo',
        component: userInfo
      },
      {
        // 用户回收站
        path: 'userRecovery',
        name: 'backstageUserRecovery',
        component: userRecovery
      },
      {
        // 权限组
        path: 'userGroup',
        name: 'backstageUserGroup',
        component: userGroup
      },
      {
        // 层级类目、标签的设置
        path: 'category',
        name: 'backstageCategory',
        component: category
      },
      {
        // 个人收藏
        path: 'userCollect',
        name: 'backstageUserCollect',
        component: userCollect
      }
    ]
  },
  {
    path: '/backstage/*',
    name: '404',
    component: backstage
  }
]
