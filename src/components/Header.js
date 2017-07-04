import React from 'react'
import { connect } from 'react-redux'
import Button from 'muicss/lib/react/button'
import Appbar from 'muicss/lib/react/appbar'

import c from './Header.css'

export const Header = ({user, onLogout}) => (
  <Appbar className={c.Header}>
    <h1>LiteIPTV</h1>
    <div className={c.user}>
      {user && user.username}
      {user && <Button onClick={onLogout} color='accent'>logout</Button>}
    </div>
  </Appbar>
)

export default connect(state => state, dispatch => ({
  onLogout: () => dispatch({type: 'logout'})
}))(Header)
