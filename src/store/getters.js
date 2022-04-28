const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  tokens: state => state.user.tokens,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  roles: state => state.user.roles,
  usernames: state => state.user.usernames,
  userinfos: state => state.user.userinfos
}
export default getters
