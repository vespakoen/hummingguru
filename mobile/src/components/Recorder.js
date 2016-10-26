import React, { Component, PropTypes } from 'react'

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput
} from 'react-native'

import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/MaterialIcons'
import Waveform from './Waveform'
import RoundButton from './RoundButton'
import { actions } from '../redux/recorder'

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  controls: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  counter: {
    fontSize: 30,
    color: '#fff'
  },
  submit: {
    fontSize: 20,
    color: '#fff'
  },
  intro: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 30,
    paddingRight: 30
  },
  introText: {
    fontSize: 24,
    lineHeight: 36,
    color: '#888',
    textAlign: 'center'
  },
  note: {
    backgroundColor: '#fff',
    fontSize: 20,
    height: 80,
    marginLeft: 20,
    marginRight: 20,
    padding: 15,
    color: '#000'
  }
})

class Recorder extends Component {
  constructor(props) {
    super(props)
    this.toggleRecord = this.toggleRecord.bind(this)
  }

  componentDidMount() {
    this.props.listenToProgress()
    this.props.listenToFinish()
  }

  toggleRecord() {
    if (this.props.isRecording) {
      this.props.stopRecording()
      clearTimeout(this.autoStopper)
    } else {
      this.props.startRecording()
      this.autoStopper = setTimeout(this.props.stopRecording, 10000)
    }
  }

  renderRoundButton({ children, onPress, buttonStyle }) {
    return (
      <TouchableOpacity onPress={onPress} >
        <View style={[styles.roundButton, buttonStyle || {}]} >
          { children }
        </View>
      </TouchableOpacity>
    )
  }

  renderRecordStep() {
    const progressSeconds = Math.round(this.props.progress)
    const recordButtonContent = this.props.isRecording ? (
      <Text style={styles.counter}>
        {10 - progressSeconds}
      </Text>
    ) : (
      <Icon
        name="mic"
        size={50}
        color="#000"
      />
    )
    return (
      <View style={styles.container}>
        { this.props.isRecording ? (
          <View style={styles.intro}>
            <Text style={styles.introText}>
              Hummmmmmmm...
            </Text>
          </View>
        ) : (
          <View style={styles.intro}>
            <Text style={styles.introText}>
              Tap the button below and start humming...
            </Text>
          </View>
        ) }
        <View style={styles.controls}>
          <RoundButton
            buttonStyle={{ backgroundColor: this.props.isRecording ? '#F44336' : '#fff' }}
            onPress={this.toggleRecord}
          >
            {recordButtonContent}
          </RoundButton>
        </View>
      </View>
    )
  }

  renderUploadStep() {
    return (
      <View style={styles.container}>
        <View style={styles.intro}>
          <Text style={styles.introText}>
            Processing audio, hang in there...
          </Text>
        </View>
      </View>
    )
  }

  renderPreviewStep() {
    return (
      <View style={styles.container}>
        <Waveform recordingId={this.props.recordingId} />
        <View style={styles.intro}>
          <Text style={styles.introText}>
            Tap the waves above, does it sound good?
          </Text>
        </View>
        <View style={styles.controls}>
          <RoundButton
            onPress={this.props.acceptRecording}
          >
            <Icon
              name="check"
              size={50}
              color="green"
            />
          </RoundButton>
          <RoundButton
            onPress={this.props.declineRecording}
          >
            <Icon
              name="close"
              size={50}
              color="#F44336"
            />
          </RoundButton>
        </View>
      </View>
    )
  }

  renderAddNoteStep() {
    return (
      <View style={styles.container}>
        <View style={styles.intro}>
          <Text style={styles.introText}>
            Add a helpfull note, or send some love to the other gurus...
          </Text>
        </View>
        <TextInput
          style={styles.note}
          onChangeText={this.props.setNote}
          value={this.props.note}
          multiline
        />
        <View style={styles.controls}>
          <RoundButton
            buttonStyle={{ backgroundColor: '#4CAF50' }}
            onPress={this.props.createHumm}
          >
            <Text style={styles.submit}>
              SUBMIT
            </Text>
          </RoundButton>
        </View>
      </View>
    )
  }

  render() {
    const { recordingId, isUploading, isRecordingAccepted } = this.props
    if (isRecordingAccepted) {
      return this.renderAddNoteStep()
    }
    if (isUploading) {
      return this.renderUploadStep()
    }
    if (recordingId) {
      return this.renderPreviewStep()
    }
    return this.renderRecordStep()
  }
}

Recorder.propTypes = {
  isUploading: PropTypes.bool,
  isRecording: PropTypes.bool,
  recordingId: PropTypes.string,
  progress: PropTypes.number,
  startRecording: PropTypes.func,
  stopRecording: PropTypes.func,
  listenToProgress: PropTypes.func,
  listenToFinish: PropTypes.func,
  acceptRecording: PropTypes.func,
  declineRecording: PropTypes.func,
  isRecordingAccepted: PropTypes.bool,
  setNote: PropTypes.func,
  note: PropTypes.string,
  createHumm: PropTypes.func
}

export default connect(
  state => state.recorder,
  actions
)(Recorder)
