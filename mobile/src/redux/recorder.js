import { AudioRecorder } from 'react-native-audio'
import FileUploader from 'react-native-file-uploader'
import fs from 'react-native-fs'
import * as api from '../api'
import { navigateTo } from './navigation'
import config from '../../config'

const initialState = {
  isRecording: false,
  isRecordingPaused: false,
  isPlaying: false,
  isPlaybackPaused: false,
  isRecordingAccepted: false,
  progress: 0,
  recordingId: null,
  note: null
}

const tmpFile = `${fs.DocumentDirectoryPath}/humm.aac`
console.log(tmpFile)
export function listenToProgress() {
  return (dispatch) => {
    AudioRecorder.onProgress = (data) => {
      dispatch({
        type: 'PROGRESS',
        payload: data.currentTime
      })
    }
  }
}

export function listenToFinish() {
  return (dispatch) => {
    AudioRecorder.onFinished = () => {
      const settings = {
        uri: tmpFile,
        uploadUrl: `${config.API_URL}/upload`,
        method: 'POST',
        fileName: 'humm.aac',
        fieldName: 'file',
        contentType: 'application/octet-stream',
        data: {}
      }
      dispatch({
        type: 'UPLOAD'
      })
      FileUploader.upload(settings, (err, res) => {
        if (err) {
          dispatch({
            type: 'UPLOAD_ERROR',
            payload: err
          })
          return
        }
        fs.unlink(tmpFile)
          .catch(unlinkErr => console.error(`unlink error: ${unlinkErr.message}`))
          .then(() => dispatch({
            type: 'UPLOAD_SUCCESS',
            payload: res.data
          }))
      }, (sent, expectedToSend) => {
        dispatch({
          type: 'UPLOAD_PROGRESS',
          payload: sent / expectedToSend
        })
      })
    }
  }
}

export function stopRecording() {
  AudioRecorder.stopRecording()
  return {
    type: 'STOP_RECORDING'
  }
}

export function startRecording() {
  return (dispatch, getState) => {
    const state = getState()
    if (state.recorder.isRecording) {
      dispatch(stopRecording())
    }
    AudioRecorder.prepareRecordingAtPath(tmpFile, {
      SampleRate: 22050,
      Channels: 1,
      AudioQuality: 'Low',
      AudioEncoding: 'aac',
      AudioEncodingBitRate: 32000
    })
    AudioRecorder.startRecording()
    dispatch({
      type: 'START_RECORDING'
    })
  }
}

export function pauseRecording() {
  AudioRecorder.pauseRecording()
  return {
    type: 'PAUSE_RECORDING'
  }
}

export function startPlaying() {
  AudioRecorder.playRecording()
  return {
    type: 'START_PLAYING'
  }
}

export function pausePlaying() {
  AudioRecorder.pausePlaying()
  return {
    type: 'PAUSE_PLAYING'
  }
}

export function stopPlaying() {
  AudioRecorder.stopPlaying()
  return {
    type: 'STOP_PLAYING'
  }
}

export function acceptRecording() {
  return {
    type: 'ACCEPT_RECORDING'
  }
}

export function declineRecording() {
  return {
    type: 'DECLINE_RECORDING'
  }
}

export function setNote(note) {
  return {
    type: 'SET_NOTE',
    payload: note
  }
}

export function createHumm() {
  return (dispatch, getState) => {
    const state = getState()
    dispatch({
      type: 'CREATE_HUMM'
    })
    const humm = {
      userId: state.login.user.id,
      recordingId: state.recorder.recordingId,
      note: state.recorder.note
    }
    api.createHumm(humm)
      .then(() => {
        dispatch({
          type: 'CREATE_HUMM_SUCCESS'
        })
        dispatch(navigateTo('requests'))
      })
      .catch(err => {
        dispatch({
          type: 'CREATE_HUMM_ERROR',
          payload: err.message
        })
      })
  }
}

export const actions = {
  startRecording,
  pauseRecording,
  stopRecording,
  startPlaying,
  pausePlaying,
  stopPlaying,
  listenToProgress,
  listenToFinish,
  acceptRecording,
  declineRecording,
  setNote,
  createHumm
}

const reducers = {
  START_RECORDING: (state) => ({
    ...state,
    isRecording: true,
    isRecordingPaused: false
  }),
  PAUSE_RECORDING: (state) => ({
    ...state,
    isRecordingPaused: true
  }),
  STOP_RECORDING: (state) => ({
    ...state,
    progress: 0,
    isRecording: false,
    isRecordingPaused: false
  }),
  START_PLAYING: (state) => ({
    ...state,
    isPlaying: true,
    isPlaybackPaused: false
  }),
  PAUSE_PLAYING: (state) => ({
    ...state,
    isPlaybackPaused: true
  }),
  STOP_PLAYING: (state) => ({
    ...state,
    isPlaying: false,
    isPlaybackPaused: false
  }),
  PROGRESS: (state, action) => ({
    ...state,
    progress: action.payload
  }),
  UPLOAD: (state) => ({
    ...state,
    isUploading: true
  }),
  UPLOAD_SUCCESS: (state, action) => ({
    ...state,
    recordingId: action.payload,
    uploadProgress: 0,
    isUploading: false
  }),
  UPLOAD_ERROR: (state, action) => ({
    ...state,
    error: action.payload,
    uploadProgress: 0,
    isUploading: false
  }),
  UPLOAD_PROGRESS: (state, action) => ({
    ...state,
    uploadProgress: action.payload
  }),
  ACCEPT_RECORDING: (state) => ({
    ...state,
    isRecordingAccepted: true
  }),
  DECLINE_RECORDING: (state) => ({
    ...state,
    isRecordingAccepted: false,
    recordingId: null
  }),
  SET_NOTE: (state, action) => ({
    ...state,
    note: action.payload
  }),
  CREATE_HUMM_SUCCESS: (state) => ({
    ...state,
    recordingId: null,
    note: null,
    isRecordingAccepted: false
  })
}

export default (state = initialState, action) => {
  if (reducers[action.type]) {
    return reducers[action.type](state, action)
  }
  return state
}
