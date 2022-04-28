const { sessionGet } = require('./utils')
const tokens = sessionGet('tokens') || {
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
}

const users = sessionGet('userinfos') || {
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

module.exports = [
  // user login
  {
    url: '/vue-sims/user/login',
    type: 'post',
    response: config => {
      console.log(users)
      console.log(tokens)
      const { username } = config.body
      const token = tokens[username]

      // mock error
      if (!token) {
        return {
          code: 60204,
          message: '账号密码不正确。'
        }
      }

      return {
        code: 20000,
        data: token
      }
    }
  },

  {
    url: '/vue-sims/user/signup',
    type: 'post',
    response: config => {
      const { username, usertype, email } = config.body
      if (tokens[username]) {
        return {
          code: 60204,
          message: '注册的用户名已存在。'
        }
      }

      tokens[username] = {
        'token': username + '-' + usertype + '-token'
      }
      const token = tokens[username]
      users[token.token] = {
        roles: [usertype],
        introduction: 'I am a ' + usertype,
        email: email,
        avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
        name: username
      }
      // console.log(users)
      const usernames = []
      for (var key in tokens) {
        usernames.push(key)
      }
      return {
        code: 20000,
        data: { token, tokens, usernames, users }
      }
    }
  },

  // get user info
  {
    url: '/vue-sims/user/info\.*',
    type: 'get',
    response: config => {
      const { token } = config.query
      console.log('---------------->token', token)
      console.log('---------------->info', users)
      const info = users[token]
      console.log('---------------->info', info)

      // mock error
      if (!info) {
        return {
          code: 50008,
          message: '登陆失败，不能够获取到用户信息.'
        }
      }

      return {
        code: 20000,
        data: info
      }
    }
  },

  // user logout
  {
    url: '/vue-sims/user/logout',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  }
]
