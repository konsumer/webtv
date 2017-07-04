import React from 'react'
import { connect } from 'react-redux'
import ReactPlayer from 'react-player'

import c from './VideoPlayer.css'

export const VideoPlayer = ({stream, user}) => (
  <div className={c.VideoPlayer} >
    {stream && (<ReactPlayer width='100%' controls playing url={`http://ok2.se:8000/${stream.stream_type}/${user.username}/${user.password}/${stream.stream_id}.m3u8`} />)}
    {stream && (<div className={c.info}>{stream.name}</div>)}
  </div>
)

export default connect(state => state, dispatch => ({}))(VideoPlayer)
