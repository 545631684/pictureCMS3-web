const backstage = () => import( /* webpackChunkName: "group-foo" */ 'VIEWS/admin/backstage/backstage.vue')
const backstageIndex = () => import( /* webpackChunkName: "group-foo" */ 'VIEWS/admin/backstageIndex/backstageIndex.vue')
const img = () => import( /* webpackChunkName: "group-foo" */ 'VIEWS/admin/img/img.vue')
const imgUpdate = () => import( /* webpackChunkName: "group-foo" */ 'VIEWS/admin/imgUpdate/imgUpdate.vue')
const psd = () => import( /* webpackChunkName: "group-foo" */ 'VIEWS/admin/psd/psd.vue')
const psdUpdate = () => import( /* webpackChunkName: "group-foo" */ 'VIEWS/admin/psdUpdate/psdUpdate.vue')
const video = () => import( /* webpackChunkName: "group-foo" */ 'VIEWS/admin/video/video.vue')
const videoUpdate = () => import( /* webpackChunkName: "group-foo" */ 'VIEWS/admin/videoUpdate/videoUpdate.vue')
const ai = () => import( /* webpackChunkName: "group-foo" */ 'VIEWS/admin/ai/ai.vue')
const aiUpdate = () => import( /* webpackChunkName: "group-foo" */ 'VIEWS/admin/aiUpdate/aiUpdate.vue')
const engineering = () => import( /* webpackChunkName: "group-foo" */ 'VIEWS/admin/engineering/engineering.vue')
const engineeringUpdate = () => import( /* webpackChunkName: "group-foo" */ 'VIEWS/admin/engineeringUpdate/engineeringUpdate.vue')
const pdf = () => import( /* webpackChunkName: "group-foo" */ 'VIEWS/admin/pdf/pdf.vue')
const pdfUpdate = () => import( /* webpackChunkName: "group-foo" */ 'VIEWS/admin/pdfUpdate/pdfUpdate.vue')
// const word = () => import( /* webpackChunkName: "group-foo" */ 'VIEWS/admin/word/word.vue')
// const wordUpdate = () => import( /* webpackChunkName: "group-foo" */ 'VIEWS/admin/wordUpdate/wordUpdate.vue')
// const excel = () => import( /* webpackChunkName: "group-foo" */ 'VIEWS/admin/excel/excel.vue')
// const excelUpdate = () => import( /* webpackChunkName: "group-foo" */ 'VIEWS/admin/excelUpdate/excelUpdate.vue')
const seeArticle = () => import( /* webpackChunkName: "group-foo" */ 'VIEWS/admin/seeArticle/seeArticle.vue')
const recoveryArticle = () => import( /* webpackChunkName: "group-foo" */ 'VIEWS/admin/recoveryArticle/recoveryArticle.vue')
const statistics = () => import( /* webpackChunkName: "group-foo" */ 'VIEWS/admin/statistics/statistics.vue')
const userList = () => import( /* webpackChunkName: "group-foo" */ 'VIEWS/admin/userList/userList.vue')
const userRecovery = () => import( /* webpackChunkName: "group-foo" */ 'VIEWS/admin/userRecovery/userRecovery.vue')
const userGroup = () => import( /* webpackChunkName: "group-foo" */ 'VIEWS/admin/userGroup/userGroup.vue')
const category = () => import( /* webpackChunkName: "group-foo" */ 'VIEWS/admin/category/category.vue')
const userInfo = () => import( /* webpackChunkName: "group-foo" */ 'VIEWS/admin/userInfo/userInfo.vue')

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
        // 上传ai
        path: 'ai',
        name: 'backstageAi',
        component: ai
      },
      {
        // 上传pdf
        path: 'pdf',
        name: 'backstagePdf',
        component: pdf
      },
      {
        // 上传word
        path: 'word',
        name: 'backstageWord',
        component: ai
      },
      {
        // 上传excel
        path: 'excel',
        name: 'backstageExcel',
        component: ai
      },
      {
        // 上传engineering
        path: 'engineering',
        name: 'backstageEngineering',
        component: engineering
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
        // 修改ai
        path: 'aiUpdate/:id',
        name: 'backstageAiUpdate',
        component: aiUpdate
      },
      {
        // 修改pdf
        path: 'pdfUpdate/:id',
        name: 'backstagePdfUpdate',
        component: pdfUpdate
      },
      // {
      //   // 修改word
      //   path: 'wordUpdate/:id',
      //   name: 'backstageWordUpdate',
      //   component: wordUpdate
      // },
      // {
      //   // 修改excel
      //   path: 'excelUpdate/:id',
      //   name: 'backstageExcelUpdate',
      //   component: excelUpdate
      // },
      {
        // 修改engineering
        path: 'engineeringUpdate/:id',
        name: 'backstageEngineeringUpdate',
        component: engineeringUpdate
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
      }
    ]
  },
]
