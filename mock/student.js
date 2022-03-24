const Mock = require('mockjs')

const personInfoList = []
const personCount = 3

const gradeList = []
const gradeCount = 20
const timetableList = []
const timetableCount = 20
const awardList = []
const awardCount = 20
const punishList = []
const punishCount = 20

Mock.Random.extend({
  phone: function() {
    var phonePrefixs = [134, 135, 136, 137, 138, 139, 147, 148, 150, 151, 152, 157, 158, 159, 165, 172, 178, 182, 183, 184,
      187, 188, 198, 130, 131, 132, 145, 146, 155, 156, 166, 171, 175, 176, 185, 186, 133, 149, 153, 173, 174,
      177, 180, 181, 189, 191, 199, 170]
    return this.pick(phonePrefixs) + Mock.mock(/\d{8}/)
  }
})

for (let i = 0; i < personCount; i++) {
  personInfoList.push(Mock.mock({
    'number|1': ['2018051613004', '2018051613005', '2018051613006'],
    name: '@cname',
    'gender|1': ['男', '女'],
    'cType|1': ['居民身份证', '护照'],
    cNumber: Mock.Random.id(),
    birthDate: '@date',
    'nation|1': ['汉族', '少数民族'],
    'politicsStatus|1': ['中共党员', '团员', '群众'],
    address: '@province' + '@city' + '@county',
    'contact|1': '@phone',
    'isCampus|1': ['是', '否'],
    'grade|1': ['08级', '09级', '07级']
  }))
}

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
    'courseNumber|20220000-20229999': 20220000,
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
    'awardNumber|20220000-20229999': 20220000,
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
    'awardBonus|1000-9999': 1000
  }))
}

for (let i = 0; i < punishCount; i++) {
  punishList.push(Mock.mock({
    id: i + 1,
    'punishNumber|20220000-20229999': 20220000,
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
    url: '/vue-element-admin/person/info',
    type: 'get',
    response: config => {
      const { number, page = 1, limit = 10 } = config.query
      // console.log(number)
      console.log(personInfoList)
      const mockList = personInfoList.filter(item => {
        if (number && ('' + item.number).indexOf(number) < 0) return false
        return true
      })

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
    url: '/vue-element-admin/personinfo/save',
    type: 'post',
    response: config => {
      const updateData = config.body
      console.log(personInfoList)
      const index = personInfoList.findIndex(v => v.number === updateData.number)
      personInfoList[index] = updateData

      const personInfo = personInfoList[index]

      return {
        code: 20000,
        msg: 'success',
        data: personInfo
      }
    }
  },
  {
    url: '/vue-element-admin/grade/list',
    type: 'get',
    response: config => {
      const { course, examTime, page = 1, limit = 10, sort } = config.query
      console.log('examTime')
      console.log(examTime)
      let mockList = gradeList.filter(item => {
        if (course && item.course.indexOf(course) < 0) return false
        if (examTime && (new Date(item.examTime)).getTime() !== (new Date(examTime)).getTime()) return false
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
      const { course, teacher, page = 1, limit = 10, sort } = config.query

      let mockList = timetableList.filter(item => {
        if (course && item.course.indexOf(course) < 0) return false
        if (teacher && item.teacher.indexOf(teacher) < 0) return false
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
      const { page = 1, limit = 10, sort } = config.query

      let mockList = awardList.filter(item => {
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
      const { page = 1, limit = 10, sort } = config.query

      let mockList = punishList.filter(item => {
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
  }
]

