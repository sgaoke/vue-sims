const Mock = require('mockjs')

const gradeList = []
const gradeCount = 20
const timetableList = []
const timetableCount = 20
const awardList = []
const awardCount = 20
const punishList = []
const punishCount = 20

for (let i = 0; i < gradeCount; i++) {
  gradeList.push(Mock.mock({
    // id: '@increment()',
    id: i + 1,
    'course|1': ['语文', '数学', '英语', '政治', '生物', '物理', '化学', '地理', '体育', '微机', '音乐', '美术'],
    teacher: '@cname',
    examTime: '@date',
    examScore: '@integer(60, 100)',
    scoreRank: '@integer(1, 100)',
    'remark|1': ['缺考', '', '', '', '', '请假', '', '', '', '']
  }))
}

for (let i = 0; i < timetableCount; i++) {
  timetableList.push(Mock.mock({
    // id: '@increment()',
    id: i + 1,
    'courseNumber|10000-99999': 10000,
    'course|1': ['语文', '数学', '英语', '政治', '生物', '物理', '化学', '地理', '体育', '微机', '音乐', '美术'],
    'courseType|1': ['学科课程', '综合课程', '实验课程', '户外活动课'],
    teacher: '@cname',
    schooltime: '@date'
  }))
}

for (let i = 0; i < awardCount; i++) {
  awardList.push(Mock.mock({
    // id: '@increment()',
    id: i + 1,
    'awardNumber|10000-99999': 10000,
    'awardProject|1': [
      '“我爱我家”征文比赛',
      '迎春杯',
      '全国初中数学联赛',
      '初中生古诗文大赛',
      '“我是小能手”物理竞赛',
      '全国青少年科技创新大赛',
      '英语角',
      '第一届少年编程大赛'
    ],
    'awardLevel|1': [
      '县级',
      '校级',
      '市级',
      '国家级'
    ],
    'awardWay|1': [
      '奖金+证书',
      '奖金',
      '奖状',
      '证书'
    ],
    'awardCategory|1': [
      '一等',
      '二等',
      '三等'
    ],
    'awardBonus|10000-99999': 10000
  }))
}

for (let i = 0; i < punishCount; i++) {
  punishList.push(Mock.mock({
    id: i + 1,
    'punishNumber|10000-99999': 10000,
    'punishName|1': [
      '故意毁坏公共桌椅',
      '扰乱考场秩序',
      '作弊'
    ],
    punishDate: '@date',
    'disciplineCategory|1': [
      '违纪',
      '严重违纪'
    ],
    disciplineDate: '@date',
    'disciplineReason|1': [
      '已赔偿',
      '已改正',
      '未解除'
    ]
  }))
}

module.exports = [
  {
    url: '/vue-element-admin/grade/list',
    type: 'get',
    response: config => {
      const { title, page = 1, limit = 10, sort } = config.query

      let mockList = gradeList.filter(item => {
        if (title && item.title.indexOf(title) < 0) return false
        return true
      })

      if (sort === '-id') {
        mockList = mockList.reverse()
      }

      const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))

      return {
        code: 20000,
        data: {
          total: mockList.length,
          items: pageList
        }
      }
    }
  },
  {
    url: '/vue-element-admin/timetable/list',
    type: 'get',
    response: config => {
      const { title, page = 1, limit = 10, sort } = config.query

      let mockList = timetableList.filter(item => {
        if (title && item.title.indexOf(title) < 0) return false
        return true
      })

      if (sort === '-id') {
        mockList = mockList.reverse()
      }

      const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))

      return {
        code: 20000,
        data: {
          total: mockList.length,
          items: pageList
        }
      }
    }
  },
  {
    url: '/vue-element-admin/award/list',
    type: 'get',
    response: config => {
      const { title, page = 1, limit = 10, sort } = config.query

      let mockList = awardList.filter(item => {
        if (title && item.title.indexOf(title) < 0) return false
        return true
      })

      if (sort === '-id') {
        mockList = mockList.reverse()
      }

      const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))

      return {
        code: 20000,
        data: {
          total: mockList.length,
          items: pageList
        }
      }
    }
  },
  {
    url: '/vue-element-admin/punish/list',
    type: 'get',
    response: config => {
      const { title, page = 1, limit = 10, sort } = config.query

      let mockList = punishList.filter(item => {
        if (title && item.title.indexOf(title) < 0) return false
        return true
      })

      if (sort === '-id') {
        mockList = mockList.reverse()
      }

      const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))

      return {
        code: 20000,
        data: {
          total: mockList.length,
          items: pageList
        }
      }
    }
  },
  {
    url: '/vue-element-admin/article/create',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },

  {
    url: '/vue-element-admin/article/update',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  }
]

