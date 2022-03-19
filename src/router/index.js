import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'dashboard' }
    }]
  },
  {
    path: '/personal',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Personal',
        component: () => import('@/views/personal/index'),
        meta: { title: '个人信息', icon: 'el-icon-help' }
      }
    ]
  },
  {
    path: '/grade',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Grade',
        component: () => import('@/views/grade/index'),
        meta: { title: '成绩信息', icon: 'el-icon-notebook-1' }
      }
    ]
  },
  {
    path: '/timetable',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Timetable',
        component: () => import('@/views/timetable/index'),
        meta: { title: '课表信息', icon: 'el-icon-s-management' }
      }
    ]
  },
  {
    path: '/rewards',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Rewards',
        component: () => import('@/views/rewards/index'),
        meta: { title: '奖惩信息', icon: 'el-icon-s-data' }
      }
    ]
  },
  // 教师角色-学生信息
  {
    path: '/student',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Student',
        component: () => import('@/views/student/index'),
        meta: { title: '学生信息', icon: 'el-icon-odometer' }
      }
    ]
  },
  // 教师角色-课程信息
  {
    path: '/subject',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Subject',
        component: () => import('@/views/subject/index'),
        meta: { title: '课程信息', icon: 'el-icon-s-management' }
      }
    ]
  },
  // 教师角色-成绩信息
  {
    path: '/t-grade',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'TGrade',
        component: () => import('@/views/t-grade/index'),
        meta: { title: '成绩信息', icon: 'el-icon-collection' }
      }
    ]
  },
  // 教师角色-班级出勤信息
  {
    path: '/department',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Department',
        component: () => import('@/views/department/index'),
        meta: { title: '班级出勤信息', icon: 'el-icon-takeaway-box' }
      }
    ]
  },
  // 教师角色-奖惩信息
  {
    path: '/t-rewards',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'TRewards',
        component: () => import('@/views/t-rewards/index'),
        meta: { title: '奖惩信息', icon: 'el-icon-s-data' }
      }
    ]
  },
  // 教师角色-宿舍信息
  {
    path: '/teacher',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Teacher',
        component: () => import('@/views/teacher/index'),
        meta: { title: '宿舍信息', icon: 'el-icon-notebook-2' }
      }
    ]
  },
  // 管理员-账号管理
  {
    path: '/account-manage',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'AccountManage',
        component: () => import('@/views/account-manage/index'),
        meta: { title: '账号管理', icon: 'el-icon-s-data' }
      }
    ]
  },
  // 管理员-课程管理
  // {
  //   path: '/course-manage',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       name: 'CourseManage',
  //       component: () => import('@/views/course-manage/index'),
  //       meta: { title: '课程管理', icon: 'el-icon-s-data' }
  //     }
  //   ]
  // },
  /* {
    path: '/example',
    component: Layout,
    redirect: '/example/table',
    name: 'Example',
    meta: { title: 'Example', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'table',
        name: 'Table',
        component: () => import('@/views/table/index'),
        meta: { title: 'Table', icon: 'table' }
      },
      {
        path: 'tree',
        name: 'Tree',
        component: () => import('@/views/tree/index'),
        meta: { title: 'Tree', icon: 'tree' }
      }
    ]
  },

  {
    path: '/form',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Form',
        component: () => import('@/views/form/index'),
        meta: { title: 'Form', icon: 'form' }
      }
    ]
  },

  {
    path: '/nested',
    component: Layout,
    redirect: '/nested/menu1',
    name: 'Nested',
    meta: {
      title: 'Nested',
      icon: 'nested'
    },
    children: [
      {
        path: 'menu1',
        component: () => import('@/views/nested/menu1/index'), // Parent router-view
        name: 'Menu1',
        meta: { title: 'Menu1' },
        children: [
          {
            path: 'menu1-1',
            component: () => import('@/views/nested/menu1/menu1-1'),
            name: 'Menu1-1',
            meta: { title: 'Menu1-1' }
          },
          {
            path: 'menu1-2',
            component: () => import('@/views/nested/menu1/menu1-2'),
            name: 'Menu1-2',
            meta: { title: 'Menu1-2' },
            children: [
              {
                path: 'menu1-2-1',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
                name: 'Menu1-2-1',
                meta: { title: 'Menu1-2-1' }
              },
              {
                path: 'menu1-2-2',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
                name: 'Menu1-2-2',
                meta: { title: 'Menu1-2-2' }
              }
            ]
          },
          {
            path: 'menu1-3',
            component: () => import('@/views/nested/menu1/menu1-3'),
            name: 'Menu1-3',
            meta: { title: 'Menu1-3' }
          }
        ]
      },
      {
        path: 'menu2',
        component: () => import('@/views/nested/menu2/index'),
        name: 'Menu2',
        meta: { title: 'menu2' }
      }
    ]
  },

  {
    path: 'external-link',
    component: Layout,
    children: [
      {
        path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
        meta: { title: 'External Link', icon: 'link' }
      }
    ]
  }, */

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
