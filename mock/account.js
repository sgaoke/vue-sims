const Mock = require('mockjs')

const astudentList = []
const astudentCount = 30
const ateacherList = []
const ateacherCount = 20

Mock.Random.extend({
  phone: function() {
    var phonePrefixs = [134, 135, 136, 137, 138, 139, 147, 148, 150, 151, 152, 157, 158, 159, 165, 172, 178, 182, 183, 184,
      187, 188, 198, 130, 131, 132, 145, 146, 155, 156, 166, 171, 175, 176, 185, 186, 133, 149, 153, 173, 174,
      177, 180, 181, 189, 191, 199, 170]
    return this.pick(phonePrefixs) + Mock.mock(/\d{8}/)
  }
})
// console.log(Mock.Random.phone)

for (let i = 0; i < astudentCount; i++) {
  astudentList.push(Mock.mock({
    id: i + 1,
    'studentNumber|100000-999999': 100000,
    studentName: '@cname',
    'gender|1': ['男', '女'],
    'password|100000-999999': 100000,
    email: '@email'
  }))
}

for (let i = 0; i < ateacherCount; i++) {
  ateacherList.push(Mock.mock({
    id: i + 1,
    'teacherNumber|1000000-9999999': 1000000,
    studentName: '@cname',
    'gender|1': ['男', '女'],
    'password|100000-999999': 100000,
    email: '@email'
  }))
}

module.exports = [
  {
    url: '/vue-element-admin/astudent/list',
    type: 'get',
    response: config => {
      const { title, page = 1, limit = 10, sort } = config.query

      let mockList = astudentList.filter(item => {
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
    url: '/vue-element-admin/ateacher/list',
    type: 'get',
    response: config => {
      const { title, page = 1, limit = 10, sort } = config.query

      let mockList = ateacherList.filter(item => {
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

