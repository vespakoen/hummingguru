import React, {
  Component,
  PropTypes
} from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  WebView
} from 'react-native'
import Waveform from 'react-native-waveform'
import { connect } from 'react-redux'
import { actions } from '../redux/helpOthers'

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})

class HelpOthers extends Component {
  componentDidMount() {
    this.props.getNextHumm()
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>{JSON.stringify(this.props.humm)}</Text>
      </View>
    )
  }
}

HelpOthers.propTypes = {
  getNextHumm: PropTypes.func
}

export default connect(
  state => state.helpOthers,
  actions
)(HelpOthers)
