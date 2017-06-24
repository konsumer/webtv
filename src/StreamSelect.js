import React from 'react'
import { connect } from 'react-redux'
import ReactImageFallback from 'react-image-fallback'

const style = {
  icon: {
    width: 100,
    height: 100
  },
  channel: {
    width: 200,
    padding: 5,
    display: 'flex',
    flexDirection: 'column',
    cursor: 'pointer',
    alignItems: 'center'
  },
  channelList: {
    display: 'flex',
    flexWrap: 'wrap'
  }
}

const StreamSelect = ({channels, categories, setStream}) => (<div>
  {Object.keys(categories).map((type, t) => (
    <div key={t}>
      <h2>{type}</h2>
      {categories[type].map((cat, c) => (
        <div key={c}>
          <h4>{cat.category_name}</h4>
          <div style={style.channelList}>
            {
              channels && Object.keys(channels)
                .filter(channel => channels[channel].stream_type === type && channels[channel].category_name === cat.category_name)
                .map((channel, i) => (
                  <div key={i} style={style.channel} onClick={() => setStream(channels[channel])}>
                    <ReactImageFallback style={style.icon} src={channels[channel].stream_icon} fallbackImage='unavailable_channel.png' initialImage='loader.gif' />
                    <div>{channels[channel].name}</div>
                  </div>
                ))
            }
          </div>
        </div>
      ))}

    </div>
  ))}
</div>)

const mapStateToProps = state => state
const mapDispatchToProps = dispatch => ({
  setStream: stream => dispatch({type: 'setStream', data: stream})
})
export default connect(mapStateToProps, mapDispatchToProps)(StreamSelect)
