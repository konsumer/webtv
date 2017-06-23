/* global localStorage fetch */

import { createStore } from 'redux'

// TODO: set interval to update channels/categories every 15 minutes or so
// TODO: get an EPG

// re-constitue from localStorage, if avaliable
const initialState = {}
const keys = ['channels', 'categories', 'user']
keys.forEach(key => {
  initialState[key] = (localStorage[key] && JSON.parse(localStorage[key])) || {}
})

initialState.user.username = initialState.user.username || ''
initialState.user.password = initialState.user.password || ''

/**
 * Dispatch dataComplete/dataError to get panel
 * @param  {object} state Current redux state
 * @return {Promise}
 */
export const updateData = (state) => fetch('https://liteiptv-server-ve6uxt1e6hto.runkit.sh/', {
  method: 'POST',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify({username: state.user.username, password: state.user.password})
})
  .then(r => {
    if (r.status !== 200) {
      return r.json()
        .then(e => { throw new Error(e.error) })
    } else {
      return r
    }
  })
  .then(r => r.json())
  .then(data => {
    if (data.user_info.status === 'Expired') {
      throw new Error('Trial expired.')
    }
    return data
  })
  .then(panel => store.dispatch({type: 'dataComplete', data: panel}))
  .catch(err => store.dispatch({type: 'dataError', data: err}))

const app = (state = {selectedStream: null, error: null, showLogin: false, loggingIn: false, user: initialState.user, channels: initialState.channels, categories: initialState.categories}, action) => {
  switch (action.type) {
    case 'loginShow':
      return Object.assign({}, state, {showLogin: true, loggingIn: false})
    case 'loginCancel':
      return Object.assign({}, state, {showLogin: false, loggingIn: false})
    case 'loginUpdate':
      const user = Object.assign({}, state.user)
      user[action.data.name] = action.data.value
      return Object.assign({}, state, {user})
    case 'login':
      updateData(state)
      return Object.assign({}, state, {loggingIn: true})
    case 'dataComplete':
      localStorage.channels = JSON.stringify(action.data.available_channels)
      localStorage.categories = JSON.stringify(action.data.categories)
      localStorage.user = JSON.stringify(action.data.user_info)
      return Object.assign({}, state, {error: null, showLogin: false, loggingIn: false, channels: action.data.available_channels, categories: action.data.categories, user: action.data.user_info})
    case 'dataError':
      return Object.assign({}, state, {showLogin: true, loggingIn: false, error: action.data})
    case 'logout':
      localStorage.removeItem('channels')
      localStorage.removeItem('categories')
      localStorage.removeItem('user')
      return Object.assign({}, state, {channels: {}, categories: {}, user: {}})
    case 'setStream':
      return Object.assign({}, state, {selectedStream: action.data})
    default:
      return state
  }
}

const store = createStore(app, process.env.NODE_ENV !== 'production' && window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

export default store
