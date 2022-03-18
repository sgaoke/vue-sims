import request from '@/utils/request'

export function fetchGradeList(query) {
  return request({
    url: '/vue-element-admin/grade/list',
    method: 'get',
    params: query
  })
}

export function fetchTimeTableList(query) {
  return request({
    url: '/vue-element-admin/timetable/list',
    method: 'get',
    params: query
  })
}

export function fetchAwardList(query) {
  return request({
    url: '/vue-element-admin/award/list',
    method: 'get',
    params: query
  })
}

export function fetchPunishList(query) {
  return request({
    url: '/vue-element-admin/punish/list',
    method: 'get',
    params: query
  })
}
