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

export function createStudentAccount(data) {
  return request({
    url: '/vue-element-admin/student-account/create',
    method: 'post',
    data
  })
}

export function updateStudentAccount(data) {
  return request({
    url: '/vue-element-admin/student-account/update',
    method: 'post',
    data
  })
}

export function deleteStudentAccount(data) {
  return request({
    url: '/vue-element-admin/student-account/delete',
    method: 'post',
    data
  })
}

export function createTeacherAccount(data) {
  return request({
    url: '/vue-element-admin/teacher-account/create',
    method: 'post',
    data
  })
}

export function updateTeacherAccount(data) {
  return request({
    url: '/vue-element-admin/teacher-account/update',
    method: 'post',
    data
  })
}

export function deleteTeacherAccount(data) {
  return request({
    url: '/vue-element-admin/teacher-account/delete',
    method: 'post',
    data
  })
}

