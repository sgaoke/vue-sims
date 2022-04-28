import { login, signup, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import storage from '@/utils/setStorage'
import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    tokens: storage.sessionGet('tokens') || {
      admin: {
        token: 'admin-token'
      },
      teacher: {
        token: 'teacher-token'
      },
      'SS2201': {
        token: 'SS2201-teacher-token'
      },
      'SS1001': {
        token: 'SS1001-teacher-token'
      },
      student: {
        token: 'student-token'
      },
      '202201001': {
        token: '202201001-student-token'
      },
      '202201002': {
        token: '202201002-student-token'
      }
    },
    name: '',
    avatar: '',
    roles: [],
    usernames: storage.sessionGet('usernames') || ['admin', 'teacher', 'student', 'SS2201', 'SS1001', '202201001', '202201002'],
    userinfos: storage.sessionGet('userinfos') || {
      'admin-token': {
        roles: ['admin'],
        introduction: 'I am a super administrator',
        email: '1234567890@163.com',
        avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
        name: 'Admin'
      },
      'teacher-token': {
        roles: ['teacher'],
        introduction: 'I am a teacher',
        email: '1234567890@163.com',
        avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
        name: 'Teacher'
      },
      'SS1001-teacher-token': {
        roles: ['student'],
        introduction: 'I am a student',
        email: '1234567890@163.com',
        avatar: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Ftupian.qqw21.com%2Farticle%2FUploadPic%2F2020-3%2F202032722184461081.jpg&refer=http%3A%2F%2Ftupian.qqw21.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1653660719&t=b86fb843c25efce2537e6f7272925f94',
        name: 'SS1001'
      },
      'SS2201-teacher-token': {
        roles: ['student'],
        introduction: 'I am a student',
        email: '1234567890@163.com',
        avatar: 'https://img2.baidu.com/it/u=1492443641,1981609788&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
        name: 'SS2201'
      },
      'student-token': {
        roles: ['student'],
        introduction: 'I am a student',
        email: '1234567890@163.com',
        avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
        name: 'Student'
      },
      '202201001-student-token': {
        roles: ['student'],
        introduction: 'I am a student',
        email: '1234567890@163.com',
        avatar: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fblog%2F202107%2F29%2F20210729140045_080b9.jpeg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1653660895&t=44570939facafd43af2651fd81b5e6d3',
        name: '202201001'
      },
      '202201002-student-token': {
        roles: ['student'],
        introduction: 'I am a student',
        email: '1234567890@163.com',
        avatar: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F201910%2F01%2F20191001174459_gtifl.thumb.400_0.jpeg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1653660596&t=9fc4503fe0880f7e218adf7fd06a4ac0',
        name: '202201002'
      }
    }
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_TOKENS: (state, tokens) => {
    state.tokens = tokens
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
  SET_USERNAMES: (state, usernames) => {
    state.usernames = usernames
  },
  SET_USERINFOS: (state, userinfos) => {
    state.userinfos = userinfos
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    console.log('-------------userInfo')
    console.log(username, password)
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password }).then(response => {
        const { data } = response
        commit('SET_TOKEN', data.token)
        setToken(data.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  // user login
  signup({ commit }, userInfo) {
    const { username, usertype, email, password } = userInfo
    console.log('-------------userInfo')
    console.log(username, email, password)
    return new Promise((resolve, reject) => {
      signup({ username: username.trim(), usertype: usertype, email: email, password: password }).then(response => {
        const { data } = response
        console.log(data)
        // commit('SET_TOKEN', data.token)
        commit('SET_TOKENS', data.tokens)
        commit('SET_USERNAMES', data.usernames)
        commit('SET_USERINFOS', data.users)
        // setToken(data.token)
        storage.sessionSet('tokens', data.tokens)
        storage.sessionSet('usernames', data.usernames)
        storage.sessionSet('userinfos', data.users)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      console.log(state.token)
      getInfo(state.token).then(response => {
        const { data } = response

        if (!data) {
          return reject('Verification failed, please Login again.')
        }

        const { roles, name, avatar } = data

        // roles must be a non-empty array
        if (!roles || roles.length <= 0) {
          reject('getInfo: roles must be a non-null array!')
        }

        commit('SET_ROLES', roles)
        commit('SET_NAME', name)
        commit('SET_AVATAR', avatar)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        removeToken() // must remove  token  first
        resetRouter()
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

