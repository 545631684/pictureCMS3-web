const backstage = () => import( /* webpackChunkName: "group-foo" */ 'VIEWS/admin/backstage/backstage.vue')
const backstageIndex = () => import( /* webpackChunkName: "group-foo" */ 'VIEWS/admin/backstageIndex/backstageIndex.vue')
const img = () => import( /* webpackChunkName: "group-foo" */ 'VIEWS/admin/img/img.vue')
const imgUpdate = () => import( /* webpackChunkName: "group-foo" */ 'VIEWS/admin/imgUpdate/imgUpdate.vue')
const psd = () => import( /* webpackChunkName: "group-foo" */ 'VIEWS/admin/psd/psd.vue')
const psdUpdate = () => import( /* webpackChunkName: "group-foo" */ 'VIEWS/admin/psdUpdate/psdUpdate.vue')
const video = () => import( /* webpackChunkName: "group-foo" */ 'VIEWS/admin/video/video.vue')
const videoUpdate = () => import( /* webpackChunkName: "group-foo" */ 'VIEWS/admin/videoUpdate/videoUpdate.vue')
const seeArticle = () => import( /* webpackChunkName: "group-foo" */ 'VIEWS/admin/seeArticle/seeArticle.vue')
const recoveryArticle = () => import( /* webpackChunkName: "group-foo" */ 'VIEWS/admin/recoveryArticle/recoveryArticle.vue')
const statistics = () => import( /* webpackChunkName: "group-foo" */ 'VIEWS/admin/statistics/statistics.vue')
const userList = () => import( /* webpackChunkName: "group-foo" */ 'VIEWS/admin/userList/userList.vue')
const userRecovery = () => import( /* webpackChunkName: "group-foo" */ 'VIEWS/admin/userRecovery/userRecovery.vue')
const userGroup = () => import( /* webpackChunkName: "group-foo" */ 'VIEWS/admin/userGroup/userGroup.vue')
const category = () => import( /* webpackChunkName: "group-foo" */ 'VIEWS/admin/category/category.vue')

export default [
  {
    path: '/backstage',
    name: 'backstage',
    component: backstage,
    children: [
      {
        // 后台首页 也是个人中心
        path: 'home',
        name: 'home',
        component: backstageIndex
      },
      {
        // 上传img
        path: 'img',
        name: 'backstageImg',
        component: img
      },
      {
        // 上传psd
        path: 'psd',
        name: 'backstagePsd',
        component: psd
      },
      {
        // 上传video
        path: 'video',
        name: 'backstageVideo',
        component: video
      },
      {
        // 修改img
        path: 'imgUpdate/:id',
        name: 'backstageImgUpdate',
        component: imgUpdate
      },
      {
        // 修改psd
        path: 'psdUpdate/:id',
        name: 'backstagePsdUpdate',
        component: psdUpdate
      },
      {
        // 修改video
        path: 'videoUpdate/:id',
        name: 'backstageVideoUpdate',
        component: videoUpdate
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
      }
    ]
  },
]