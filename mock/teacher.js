const Mock = require('mockjs')

const studentList = []
const studentCount = 30
const subjectList = []
const subjectCount = 20
const tgradeList = []
const tgradeCount = 30
const totalGradeList = []
const totalGradeCount = 30
const departmentList = []
const departmentCount = 30
const awardList = []
const awardCount = 20
const punishList = []
const punishCount = 30

const dormList = []
const dormCount = 30

Mock.Random.extend({
  phone: function() {
    var phonePrefixs = [134, 135, 136, 137, 138, 139, 147, 148, 150, 151, 152, 157, 158, 159, 165, 172, 178, 182, 183, 184,
      187, 188, 198, 130, 131, 132, 145, 146, 155, 156, 166, 171, 175, 176, 185, 186, 133, 149, 153, 173, 174,
      177, 180, 181, 189, 191, 199, 170]
    return this.pick(phonePrefixs) + Mock.mock(/\d{8}/)
  }
})
// console.log(Mock.Random.phone)

for (let i = 0; i < studentCount; i++) {
  studentList.push(Mock.mock({
    id: i + 1,
    'studentNumber|2018051613000-2018051613999': 2018051613000,
    studentName: '@cname',
    'gender|1': ['男', '女'],
    'idType|1': ['居民身份证', '护照'],
    idNumber: Mock.Random.id(),
    birthDate: '@date',
    'nation|1': ['汉族', '少数民族'],
    'politicsStatus|1': ['中共党员', '团员', '群众'],
    address: '@province' + '@city' + '@county',
    'contact|1': '@phone',
    'isResidence|1': ['是', '否'],
    'class|1': ['08级', '09级', '07级']
  }))
}

for (let i = 0; i < subjectCount; i++) {
  subjectList.push(Mock.mock({
    // id: '@increment()',
    id: i + 1,
    'courseNumber|10000-99999': 10000,
    'courseName|1': ['语文', '数学', '英语', '政治', '生物', '物理', '化学', '地理', '体育', '微机', '音乐', '美术'],
    'courseType|1': ['学科课程', '综合课程', '实验课程', '户外活动课'],
    teacher: '@cname',
    schoolTime: '@date',
    schoolAddress: '@county(true)',
    'contact|1': '@phone'
  }))
}

for (let i = 0; i < tgradeCount; i++) {
  tgradeList.push(Mock.mock({
    // id: '@increment()',
    id: i + 1,
    'className|1': ['初一一班', '初一二班', '初一三班', '初二一班', '初二二班', '初三一班'],
    'studentNumber|100000-999999': 100000,
    studentName: '@cname',
    'courseName|1': ['语文', '数学', '英语', '政治', '生物', '物理', '化学', '地理', '体育', '微机', '音乐', '美术'],
    'courseScore|1': ['100', '70', '70', '45', '45', '20', '70', '100'],
    teacher: '@cname',
    examTime: '@date',
    examScore: '@integer(60, 100)',
    scoreRank: '@integer(1, 50)',
    'scoreReason|1': ['题目出错', '', '多个答案', ''],
    'remark|1': ['缺考', '', '', '', '', '请假', '', '', '', '']
  }))
}

for (let i = 0; i < totalGradeCount; i++) {
  totalGradeList.push(Mock.mock({
    // id: '@increment()',
    id: i + 1,
    'className|1': ['初一一班', '初一二班', '初一三班', '初二一班', '初二二班', '初三一班'],
    'studentNumber|100000-999999': 100000,
    studentName: '@cname',
    courseYW: '@integer(1, 100)',
    courseSX: '@integer(1, 100)',
    courseYY: '@integer(1, 100)',
    courseZZ: '@integer(1, 70)',
    courseSWCZ: '@integer(1, 70)',
    courseSW: '@integer(1, 70)',
    courseWLCZ: '@integer(1, 70)',
    courseWL: '@integer(1, 70)',
    courseHXCZ: '@integer(1, 70)',
    courseHX: '@integer(1, 70)',
    courseDL: '@integer(1, 45)',
    courseDLHWKC: '@integer(1, 45)',
    courseTY: '@integer(1, 45)',
    courseWJSYK: '@integer(1, 45)',
    courseWJ: '@integer(1, 45)',
    courseYYUE: '@integer(1, 20)',
    courseMS: '@integer(1, 20)',
    scoreTotalScore: '@integer(500, 750)',
    scoreTotalRank: '@integer(1, 50)',
    'scoreReason|1': ['题目出错', '', '多个答案', ''],
    'remark|1': ['缺考', '', '', '', '', '请假', '', '', '', '']
  }))
}

for (let i = 0; i < departmentCount; i++) {
  departmentList.push(Mock.mock({
    id: i + 1,
    'classNumber|1000-9999': 1000,
    'className|1': ['初一一班', '初一二班', '初一三班', '初二一班', '初二二班', '初三一班'],
    'studentNumber|100000-999999': 100000,
    studentName: '@cname',
    layTime: '@date',
    'layReason|1': ['堵车', '睡过头了', '未设置闹钟'],
    earlyTime: '@date',
    'earlyReason|1': ['家里有事', '去医院', '赶火车'],
    leaveTime: '@date',
    'leaveReason|1': ['生病了', '家里有事', '核酸检测']
  }))
}

for (let i = 0; i < awardCount; i++) {
  awardList.push(Mock.mock({
    // id: '@increment()',
    id: i + 1,
    'studentNumber|100000-999999': 100000,
    studentName: '@cname',
    'gender|1': ['男', '女'],
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
    'awardBonus|10000-99999': 10000,
    awardTime: '@date'
  }))
}

for (let i = 0; i < punishCount; i++) {
  punishList.push(Mock.mock({
    id: i + 1,
    'studentNumber|100000-999999': 100000,
    studentName: '@cname',
    'gender|1': ['男', '女'],
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

for (let i = 0; i < dormCount; i++) {
  dormList.push(Mock.mock({
    // id: '@increment()',
    id: i + 1,
    'studentNumber|100000-999999': 100000,
    studentName: '@cname',
    'gender|1': ['男', '女'],
    'dormName|1': ['雅风苑a栋3-1',
      '清风苑b栋2-1',
      '清风苑b栋2-1',
      '清风苑b栋2-3',
      '雅风苑a栋3-1',
      '清风苑b栋2-3',
      '清风苑b栋2-3',
      '雅风苑a栋3-1'],
    'className|1': ['初一一班', '初一二班', '初一三班', '初二一班', '初二二班', '初三一班'],
    'contact|1': '@phone'
  }))
}

module.exports = [
  {
    url: '/vue-element-admin/student/list',
    type: 'get',
    response: config => {
      const { title, page = 1, limit = 10, sort } = config.query

      let mockList = studentList.filter(item => {
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
    url: '/vue-element-admin/subject/list',
    type: 'get',
    response: config => {
      const { title, page = 1, limit = 10, sort } = config.query

      let mockList = subjectList.filter(item => {
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
    url: '/vue-element-admin/tgrade/list',
    type: 'get',
    response: config => {
      const { title, page = 1, limit = 10, sort } = config.query

      let mockList = tgradeList.filter(item => {
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
    url: '/vue-element-admin/totalgrade/list',
    type: 'get',
    response: config => {
      const { title, page = 1, limit = 10, sort } = config.query

      let mockList = totalGradeList.filter(item => {
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
    url: '/vue-element-admin/department/list',
    type: 'get',
    response: config => {
      const { title, page = 1, limit = 10, sort } = config.query

      let mockList = departmentList.filter(item => {
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
    url: '/vue-element-admin/taward/list',
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
    url: '/vue-element-admin/tpunish/list',
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
    url: '/vue-element-admin/dorm/list',
    type: 'get',
    response: config => {
      const { title, page = 1, limit = 10, sort } = config.query

      let mockList = dormList.filter(item => {
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

