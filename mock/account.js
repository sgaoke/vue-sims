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
    'studentNumber|2022000000-2022009999': 2022000000,
    studentName: '@cname',
    'gender|1': ['male', 'female'],
    'password|100000-999999': 100000,
    email: '@email'
  }))
}

for (let i = 0; i < ateacherCount; i++) {
  ateacherList.push(Mock.mock({
    id: i + 1,
    'teacherNumber|2022000000-2022009999': 2022000000,
    teacherName: '@cname',
    'gender|1': ['male', 'female'],
    'password|100000-999999': 100000,
    email: '@email'
  }))
}

module.exports = [
  {
    url: '/vue-element-admin/astudent/list',
    type: 'get',
    response: config => {
      const { studentNumber, studentName, page = 1, limit = 10, sort } = config.query
      let mockList = astudentList.filter(item => {
        if (studentNumber && ('' + item.studentNumber).indexOf(studentNumber) < 0) return false
        if (studentName && item.studentName.indexOf(studentName) < 0) return false
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
      const { teacherNumber, teacherName, page = 1, limit = 10, sort } = config.query
      let mockList = ateacherList.filter(item => {
        if (teacherNumber && ('' + item.teacherNumber).indexOf(teacherNumber) < 0) return false
        if (teacherName && item.teacherName.indexOf(teacherName) < 0) return false
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
    url: '/vue-element-admin/student-account/create',
    type: 'post',
    response: config => {
      const createData = config.body
      astudentList.unshift(createData)
      const pageList = astudentList.map((item, index) => {
        item.id = index + 1
      })
      return {
        code: 20000,
        msg: 'success',
        data: {
          total: pageList.length,
          items: pageList
        }
      }
    }
  },

  {
    url: '/vue-element-admin/student-account/update',
    type: 'post',
    response: config => {
      const updateData = config.body
      const index = astudentList.findIndex(v => v.id === updateData.id)
      astudentList[index] = updateData
      const pageList = astudentList.map((item, index) => {
        item.id = index + 1
      })
      return {
        code: 20000,
        msg: 'success',
        data: {
          total: pageList.length,
          items: pageList
        }
      }
    }
  },
  {
    url: '/vue-element-admin/student-account/delete',
    type: 'post',
    response: config => {
      const deleteData = config.body
      const index = astudentList.findIndex(v => v.id === deleteData.id)
      astudentList.splice(index, 1)
      const pageList = astudentList.map((item, index) => {
        item.id = index + 1
      })
      return {
        code: 20000,
        msg: 'success',
        data: {
          total: pageList.length,
          items: pageList
        }
      }
    }
  },
  {
    url: '/vue-element-admin/teacher-account/create',
    type: 'post',
    response: config => {
      const createData = config.body
      ateacherList.unshift(createData)
      const pageList = ateacherList.map((item, index) => {
        item.id = index + 1
      })
      return {
        code: 20000,
        msg: 'success',
        data: {
          total: pageList.length,
          items: pageList
        }
      }
    }
  },

  {
    url: '/vue-element-admin/teacher-account/update',
    type: 'post',
    response: config => {
      const updateData = config.body
      const index = ateacherList.findIndex(v => v.id === updateData.id)
      ateacherList[index] = updateData
      const pageList = ateacherList.map((item, index) => {
        item.id = index + 1
      })
      return {
        code: 20000,
        msg: 'success',
        data: {
          total: pageList.length,
          items: pageList
        }
      }
    }
  },

  {
    url: '/vue-element-admin/teacher-account/delete',
    type: 'post',
    response: config => {
      const deleteData = config.body
      const index = ateacherList.findIndex(v => v.id === deleteData.id)
      ateacherList.splice(index, 1)
      const pageList = ateacherList.map((item, index) => {
        item.id = index + 1
      })
      return {
        code: 20000,
        msg: 'success',
        data: {
          total: pageList.length,
          items: pageList
        }
      }
    }
  }
]

