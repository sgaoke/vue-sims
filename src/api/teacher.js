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

export function createSubject(data) {
  return request({
    url: '/vue-element-admin/subject/create',
    method: 'post',
    data
  })
}

export function updateSubject(data) {
  return request({
    url: '/vue-element-admin/subject/update',
    method: 'post',
    data
  })
}

export function deleteSubject(data) {
  return request({
    url: '/vue-element-admin/subject/delete',
    method: 'post',
    data
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

export function createDepartment(data) {
  return request({
    url: '/vue-element-admin/department/create',
    method: 'post',
    data
  })
}

export function updateDepartment(data) {
  return request({
    url: '/vue-element-admin/department/update',
    method: 'post',
    data
  })
}

export function deleteDepartment(data) {
  return request({
    url: '/vue-element-admin/department/delete',
    method: 'post',
    data
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

export function createDorm(data) {
  return request({
    url: '/vue-element-admin/dorm/create',
    method: 'post',
    data
  })
}

export function updateDorm(data) {
  return request({
    url: '/vue-element-admin/dorm/update',
    method: 'post',
    data
  })
}

export function deleteDorm(data) {
  return request({
    url: '/vue-element-admin/dorm/delete',
    method: 'post',
    data
  })
}

export function createStudentAccount(data) {
  return request({
    url: '/vue-element-admin/student/create',
    method: 'post',
    data
  })
}

export function updateStudentAccount(data) {
  return request({
    url: '/vue-element-admin/student/update',
    method: 'post',
    data
  })
}

export function deleteStudentAccount(data) {
  return request({
    url: '/vue-element-admin/student/delete',
    method: 'post',
    data
  })
}
