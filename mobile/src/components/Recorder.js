import React, { Component, PropTypes } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  WebView
} from 'react-native'
import Waveform from 'react-native-waveform'
import { connect } from 'react-redux'
import { actions } from '../redux/recorder'

const html = url => `
<style type="text/css">
html, body {
  margin: 0;
  padding: 0;
}
.waveform-wrap {
  position: relative;
  height: 100px;
}
.waveform-play {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 9999;
}
.waveform {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}
</style>
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
<body>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/wavesurfer.js/1.0.52/wavesurfer.min.js"></script>
  <div id="waveform" class="waveform-wrap">
    <div class="waveform-play"></div>
    <div class="waveform"></div>
  </div>
  <script>
    var wave = WaveSurfer.create({
      container: '#waveform',
      waveColor: 'violet',
      progressColor: 'purple'
    });
    wave.load('${url}');
    const playEl = document.querySelector('#waveform .waveform-play')
    playEl.addEventListener('click', function () {
      wave.playPause()
    })
  </script>
</body>
`

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2b608a',
  },
  controls: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  waveform: {
    flex: 1,
    backgroundColor: 'red'
  },
  progressText: {
    paddingTop: 20,
    fontSize: 20,
    color: '#fff'
  },
  button: {
    padding: 10
  },
  disabledButtonText: {
    color: '#eee'
  },
  buttonText: {
    fontSize: 20,
    color: '#fff'
  },
  activeButtonText: {
    fontSize: 20,
    color: '#B81F00'
  }
})

class Recorder extends Component {
  componentDidMount() {
    this.props.listenToProgress()
    this.props.listenToFinish()
  }

  renderButton(title, onPress, active) {
    const style = (active) ? styles.activeButtonText : styles.buttonText
    return (
      <TouchableHighlight style={styles.button} onPress={onPress}>
        <Text style={style}>
          {title}
        </Text>
      </TouchableHighlight>
    )
  }

  render() {
    /* <WebView
      source={{ html: html(`https://humming.guru/humm/${this.props.recordingId}.mp3`) }}
      style={styles.waveform}
    /> */
    /*
    <Waveform
      style={{ height: 100, width: 320 }}
      filename={`https://humming.guru/humm/${this.props.recordingId}.wav`}
    /> */
    // const audioPath = AudioUtils.DocumentDirectoryPath + '/humm.aac'
    const pauser = this.props.isRecording ? this.props.pauseRecording : this.props.pausePlaying
    const stopper = this.props.isRecording ? this.props.stopRecording : this.props.stopPlaying
    const progressSeconds = Math.round(this.props.progress)
    return (
      <View style={styles.container}>
        { this.props.recordingId && (
          <WebView
            source={{ html: html(`https://humming.guru/humm/${this.props.recordingId}.mp3`) }}
            style={styles.waveform}
          />
        ) }
        <View style={styles.controls}>
          { this.renderButton('RECORD', this.props.startRecording, this.props.isRecording) }
          { this.renderButton('STOP', stopper) }
          { this.renderButton('PAUSE', pauser) }
          { this.renderButton('PLAY', this.props.startPlaying, this.props.isPlaying) }
          <Text style={styles.progressText}>
            {progressSeconds}s
          </Text>
        </View>
      </View>
    )
  }
}

Recorder.propTypes = {
  isRecording: PropTypes.bool,
  isRecordingPaused: PropTypes.bool,
  isPlaying: PropTypes.bool,
  isPlaybackPaused: PropTypes.bool,
  recordingId: PropTypes.string,
  progress: PropTypes.number,
  startRecording: PropTypes.func,
  pauseRecording: PropTypes.func,
  stopRecording: PropTypes.func,
  startPlaying: PropTypes.func,
  pausePlaying: PropTypes.func,
  stopPlaying: PropTypes.func,
  listenToProgress: PropTypes.func,
  listenToFinish: PropTypes.func
}

export default connect(
  state => state.recorder,
  actions
)(Recorder)
