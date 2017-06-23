import React from 'react'
import { connect } from 'react-redux'

const style = {
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100vh',
    width: '100vw',
    background: 'rgba(0, 0, 0, 0.8)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  dialog: {
    background: '#fff',
    padding: 10
  },
  buttons: {
    textAlign: 'right',
    width: '30vw'
  },
  error: {
    color: 'red'
  }
}

export const LoginDialog = ({onLogin, onCancel, showLogin, loggingIn, set, user, error}) => (showLogin ? (<div style={style.overlay}>
  <fieldset style={style.dialog}>
    {error && <div style={style.error}>{error.message}</div>}
    <label htmlFor='username'>username</label>
    <input value={user.username} type='text' id='username' onChange={set('username')} />
    <label htmlFor='password'>password</label>
    <input value={user.password} type='password' id='password' onChange={set('password')} />
    <div style={style.buttons}>
      <button style={{marginRight: 5}} className='button button-outline' onClick={onCancel}>cancel</button>
      <button disabled={loggingIn} className='button' onClick={onLogin}>login</button>
    </div>
  </fieldset>
</div>) : <div />)

const mapStateToProps = state => state

const mapDispatchToProps = (dispatch) => ({
  onLogin: (user, password) => dispatch({type: 'login'}),
  onCancel: () => dispatch({type: 'loginCancel'}),
  set: (name) => (e) => dispatch({type: 'loginUpdate', data: {name, value: e.target.value}})
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginDialog)
