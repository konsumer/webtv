/* global localStorage fetch */
import { createStore } from 'redux'

const API_URL_BASE = process.env.API_URL_BASE || 'https://cors-anywhere.herokuapp.com/http://ok2.se:8000/'

const get = (url = '') => fetch(`${API_URL_BASE}player_api.php${url}`)
  .then(r => {
    if (r.status === 200) return r.json()
    return r.json().then(e => { throw new Error(e.message) })
  })

export const reducer = (state = {user: localStorage.user && JSON.parse(localStorage.user), streams: [], stream: null, categories: [], category: null, videoType: 'live', formInProgress: false, showLogin: false, formError: null, formUser: '', formPassword: ''}, action) => {
  switch (action.type) {
    case 'set':
      if (action.data.field === 'videoType') {
        if (state.user) {
          get(`?username=${state.user.username}&password=${state.user.password}&action=get_${action.data.value}_categories`)
          .then(cats => {
            store.dispatch({type: 'set', data: {field: 'categories', value: cats}})
          })
        }
        return Object.assign({}, state, {videoType: action.data.value, categories: [], streams: []})
      }
      if (action.data.field === 'category' && action.data.value !== null) {
        // find category with that name
        const cat = state.categories.filter(c => c.category_name === action.data.value).pop()
        get(`?username=${state.user.username}&password=${state.user.password}&action=get_${state.videoType}_streams&category_id=${cat.category_id}`)
          .then(streams => {
            store.dispatch({type: 'set', data: {field: 'streams', value: streams}})
          })
      }
      return Object.assign({}, state, {[action.data.field]: action.data.value})

    case 'logout':
      localStorage.removeItem('user')
      return Object.assign({}, state, {user: null})

    case 'login':
      get(`?username=${state.formUser}&password=${state.formPassword}`)
        .then(u => {
          if (!u.user_info || u.user_info.auth !== 1) {
            throw new Error('Bad Username / Password')
          }
          store.dispatch({type: 'login:complete', data: u.user_info})
          store.dispatch({type: 'set', data: {field: 'videoType', value: state.videoType}})
        })
        .catch(e => store.dispatch({type: 'login:error', data: e.message}))
      return Object.assign({}, state, {formInProgress: true})
    case 'login:complete':
      localStorage.user = JSON.stringify(action.data)
      return Object.assign({}, state, {user: action.data, showLogin: false, formError: null, formInProgress: false})
    case 'login:error':
      return Object.assign({}, state, {formError: action.data, formInProgress: false})

    default: return state
  }
}

const store = createStore(reducer, process.env.NODE_ENV === 'development' && window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

// setup initial categories if user is logged in
if (localStorage.user) {
  store.dispatch({type: 'set', data: {field: 'videoType', value: 'live'}})
}

export default store
