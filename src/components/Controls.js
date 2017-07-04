import React from 'react'
import { connect } from 'react-redux'

// import Tabs from 'muicss/lib/react/tabs'
// import Tab from 'muicss/lib/react/tab'

import c from './Controls.css'

import Categories from './Categories'

export const Controls = ({videoType, onTabActive}) => (
  <nav className={c.Controls}>
    {/* }
    <Tabs>
      <Tab value='live' label='Live' onActive={onTabActive('live')} />
      <Tab value='vod' label='Video On Demand' onActive={onTabActive('vod')} />
    </Tabs>
  */}
    <Categories type={videoType} />
  </nav>
)

export default connect(state => state, dispatch => ({
  onTabActive: value => () => dispatch({type: 'set', data: {field: 'videoType', value}})
}))(Controls)
