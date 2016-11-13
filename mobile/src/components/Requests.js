import React, {
  Component,
  PropTypes
} from 'react'

import {
  View,
  Text,
  StyleSheet
} from 'react-native'

import { connect } from 'react-redux'
import { actions } from '../redux/requests'

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})

class Requests extends Component {
  shouldComponentUpdate(nextProps) {
    return this.props !== nextProps
  }

  render() {
    console.log(this.props)
    return (
      <View style={styles.container}>
        <Text>I'm the Requests component</Text>
      </View>
    )
  }
}

Requests.propTypes = {}

export default connect(
  state => state.requests,
  actions
)(Requests)
