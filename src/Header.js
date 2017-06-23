import React from 'react'
import { connect } from 'react-redux'

const style = {
  header: {
    display: 'flex',
    padding: 10,
    background: '#f4f5f6',
    alignItems: 'center',
    boxShadow: '0px 3px 5px rgba(100, 100, 100, 0.49)'
  },
  buttonHolder: {
    flex: 1,
    textAlign: 'right'
  },
  h1: {
    margin: 0
  }
}

export const Header = ({user, login, logout}) => (<header style={style.header}>
  <h1 style={style.h1}>LiteIPTV Client</h1>
  <div style={style.buttonHolder}>
    {user && user.username && <button onClick={logout}>logout</button> }
  </div>
</header>)

const mapStateToProps = state => state

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch({type: 'logout'})
})

export default connect(mapStateToProps, mapDispatchToProps)(Header)
