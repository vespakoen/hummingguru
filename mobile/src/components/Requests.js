import React, {
  Component,
  PropTypes
} from 'react'
import {
  View,
  Text,
  StyleSheet
} from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})

class Requests extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>I'm the Requests component</Text>
      </View>
    )
  }
}

Requests.propTypes = {}

export default Requests
