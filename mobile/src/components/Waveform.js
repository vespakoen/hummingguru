import React, {
  PropTypes
} from 'react'
import {
  WebView,
  StyleSheet
} from 'react-native'

const html = url => `
<style type="text/css">
* {
  pointer-events: none;
}
html, body {
  margin: 0;
  padding: 0;
  background: #d8d8d8;
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
  right: 10px;
  bottom: 0;
  left: 10px;
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
      waveColor: 'white',
      progressColor: 'white'
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
  waveform: {
    height: 100,
    borderWidth: 0
  }
})

const Waveform = ({ recordingId }) => (
  <WebView
    bounces={false}
    scrollEnabled={false}
    source={{ html: html(`https://humming.guru/humm/${recordingId}.mp3`) }}
    style={styles.waveform}
  />
)

Waveform.propTypes = {
  recordingId: PropTypes.string
}

export default Waveform
