import request from '@/utils/request'

export function fetchAStudentList(query) {
  return request({
    url: '/vue-element-admin/astudent/list',
    method: 'get',
    params: query
  })
}

export function fetchATeacherList(query) {
  return request({
    url: '/vue-element-admin/ateacher/list',
    method: 'get',
    params: query
  })
}

