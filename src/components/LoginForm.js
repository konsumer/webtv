import React from 'react'
import { connect } from 'react-redux'

import Form from 'muicss/lib/react/form'
import Button from 'muicss/lib/react/button'
import Input from 'muicss/lib/react/input'

import c from './LoginForm.css'

export const LoginForm = ({formUser, formPassword, formError, formInProgress, onLogin, onChange}) => (
  <Form className={c.LoginForm}>
    <legend>login</legend>
    {formError && <div className={c.error}>{formError}</div>}
    <Input type='text' hint='username' value={formUser} onChange={onChange('formUser')} autoFocus floatingLabel required />
    <Input type='password' hint='password' value={formPassword} onChange={onChange('formPassword')} floatingLabel required />
    <div className={c.buttons}>
      <Button color='primary' onClick={onLogin} disabled={formInProgress || formUser === '' || formPassword === ''}>login</Button>
    </div>
  </Form>
)

export default connect(state => state, dispatch => ({
  onLogin: e => {
    e.preventDefault()
    dispatch({type: 'login'})
  },
  onChange: field => e => dispatch({type: 'set', data: { field, value: e.target.value }})
}))(LoginForm)
