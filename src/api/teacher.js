import request from '@/utils/request'

export function fetchStudentList(query) {
  return request({
    url: '/vue-element-admin/student/list',
    method: 'get',
    params: query
  })
}

export function fetchSubjectList(query) {
  return request({
    url: '/vue-element-admin/subject/list',
    method: 'get',
    params: query
  })
}

export function fetchTGradeList(query) {
  return request({
    url: '/vue-element-admin/tgrade/list',
    method: 'get',
    params: query
  })
}
export function fetchTotalGradeList(query) {
  return request({
    url: '/vue-element-admin/totalgrade/list',
    method: 'get',
    params: query
  })
}

export function fetchDepartmentList(query) {
  return request({
    url: '/vue-element-admin/department/list',
    method: 'get',
    params: query
  })
}

export function fetchTAwardList(query) {
  return request({
    url: '/vue-element-admin/taward/list',
    method: 'get',
    params: query
  })
}

export function fetchTPunishList(query) {
  return request({
    url: '/vue-element-admin/tpunish/list',
    method: 'get',
    params: query
  })
}

export function fetchDormList(query) {
  return request({
    url: '/vue-element-admin/dorm/list',
    method: 'get',
    params: query
  })
}
