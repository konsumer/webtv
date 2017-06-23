import React from 'react'
import { connect } from 'react-redux'

import Player from './Player'
import StreamSelect from './StreamSelect'

const style = {
  Content: {
    padding: 10
  },
  noLogin: {
    textAlign: 'center'
  }
}

// TODO: make StreamSelect scroll, but stay on page

export const Content = ({channels, login}) => (<section style={style.Content}>{channels && channels.length ? (<div><Player /><StreamSelect /></div>) : <div style={style.noLogin}>You will need to <button onClick={login}>login</button> to do anything cool.</div>}</section>)

const mapStateToProps = state => state

const mapDispatchToProps = (dispatch) => ({
  login: () => dispatch({type: 'loginShow'})
})

export default connect(mapStateToProps, mapDispatchToProps)(Content)
