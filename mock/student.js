const Mock = require('mockjs')

const List = []
const count = 20

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
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

module.exports = [
  {
    url: '/vue-element-admin/grade/list',
    type: 'get',
    response: config => {
      const { title, page = 1, limit = 10, sort } = config.query

      let mockList = List.filter(item => {
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
  }
]

