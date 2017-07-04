import React from 'react'
import { connect } from 'react-redux'

import Panel from 'muicss/lib/react/panel'

import c from './Content.css'

export const Content = ({streams, setStream}) => (
  <main className={c.Content}>
    {streams && streams.map(stream => (
      <Panel key={stream.num} onClick={setStream(stream)} className={c.videoPanel}>
        <div><img width='100%' src={stream.stream_icon} alt={stream.name} className={c.iconChannel} /></div>
        <h4>{stream.name}</h4>
      </Panel>
    ))}
  </main>
)

export default connect(state => state, dispatch => ({
  setStream: value => () => dispatch({type: 'set', data: {field: 'stream', value}})
}))(Content)
