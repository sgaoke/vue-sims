import request from '@/utils/request'

export function fetchGradeList(query) {
  return request({
    url: '/vue-element-admin/grade/list',
    method: 'get',
    params: query
  })
}
