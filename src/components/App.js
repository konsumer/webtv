import React from 'react'
import { connect } from 'react-redux'

import c from './App.css'
import Header from './Header'
import Controls from './Controls'
import Content from './Content'
import VideoPlayer from './VideoPlayer'
import LoginForm from './LoginForm'

export const App = ({user}) => (<div className={c.App + ' mui--text-dark'}>
  <Header />
  {user && <VideoPlayer /> }
  {user && <Controls /> }
  {user && <Content /> }
  {!user && <LoginForm /> }
</div>)

export default connect(state => state, dispatch => ({}))(App)
