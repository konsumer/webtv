import React from 'react'
import { connect } from 'react-redux'
import ReactPlayer from 'react-player'

const style = {
  Player: {}
}

const Player = ({selectedStream, user}) => (<div style={style.Player}>
  {selectedStream && (
    <div>
      <ReactPlayer url={`http://ok2.se:8000/${selectedStream.stream_type}/${user.username}/${user.password}/${selectedStream.stream_id}.m3u8`} />
      <h5>{selectedStream.name} ({selectedStream.stream_type})</h5>
    </div>
  )}
  {!selectedStream && 'Select a stream, below.'}
</div>)

const mapStateToProps = state => state
const mapDispatchToProps = (dispatch) => ({})
export default connect(mapStateToProps, mapDispatchToProps)(Player)
