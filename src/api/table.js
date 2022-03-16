import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/vue-sims/table/list',
    method: 'get',
    params
  })
}
