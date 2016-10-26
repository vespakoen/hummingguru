import React, {
  Component,
  PropTypes
} from 'react'

import {
  StyleSheet,
  Text,
  View
} from 'react-native'

import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/MaterialIcons'
import Waveform from './Waveform'
import RoundButton from './RoundButton'
import { actions } from '../redux/helpOthers'

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  note: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 30,
    paddingRight: 30
  },
  noteText: {
    fontSize: 24,
    lineHeight: 36,
    color: '#888',
    textAlign: 'center'
  },
  controls: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  roundButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#fff'
  }
})

class HelpOthers extends Component {
  componentDidMount() {
    this.props.getNextHumm()
  }

  render() {
    const humm = this.props.humm
    if (!humm) {
      return (
        <View style={styles.container}>
          <View style={styles.note}>
            <Text style={styles.noteText}>
              You heard all the humms!
              Check back later...
            </Text>
          </View>
        </View>
      )
    }
    return (
      <View style={styles.container}>
        <Waveform recordingId={humm.recordingId} />
        <View style={styles.note}>
          <Text style={styles.noteText}>{ humm.note }</Text>
        </View>
        <View style={styles.controls}>
          <RoundButton onPress={() => {}}>
            <Icon name="check" size={50} color="green" />
          </RoundButton>
          <RoundButton onPress={this.props.getNextHumm}>
            <Icon name="close" size={50} color="#F44336" />
          </RoundButton>
        </View>
      </View>
    )
  }
}

HelpOthers.propTypes = {
  getNextHumm: PropTypes.func,
  humm: PropTypes.object
}

export default connect(
  state => state.helpOthers,
  actions
)(HelpOthers)
