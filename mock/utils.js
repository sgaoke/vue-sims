/**
 * @param {string} url
 * @returns {Object}
 */
function param2Obj(url) {
  const search = decodeURIComponent(url.split('?')[1]).replace(/\+/g, ' ')
  if (!search) {
    return {}
  }
  const obj = {}
  const searchArr = search.split('&')
  searchArr.forEach(v => {
    const index = v.indexOf('=')
    if (index !== -1) {
      const name = v.substring(0, index)
      const val = v.substring(index + 1, v.length)
      obj[name] = val
    }
  })
  return obj
}

/**
 * This is just a simple version of deep copy
 * Has a lot of edge cases bug
 * If you want to use a perfect deep copy, use lodash's _.cloneDeep
 * @param {Object} source
 * @returns {Object}
 */
function deepClone(source) {
  if (!source && typeof source !== 'object') {
    throw new Error('error arguments', 'deepClone')
  }
  const targetObj = source.constructor === Array ? [] : {}
  Object.keys(source).forEach(keys => {
    if (source[keys] && typeof source[keys] === 'object') {
      targetObj[keys] = deepClone(source[keys])
    } else {
      targetObj[keys] = source[keys]
    }
  })
  return targetObj
}

// 设置缓存
function sessionSet(name, data) {
  sessionStorage.removeItem(name)
  sessionStorage.setItem(name, JSON.stringify(data))
}
// 获取缓存
function sessionGet(name) {
  // console.log(name)
  let returnName = ''
  try {
    returnName = JSON.parse(sessionStorage.getItem(name))// 捕获JSON.parse异常
  } catch (e) {
    returnName = ''
  }
  return returnName
}
// 清除缓存
function sessionRemove(name) {
  sessionStorage.removeItem(name)
}

module.exports = {
  param2Obj,
  deepClone,
  sessionSet,
  sessionGet,
  sessionRemove
}
