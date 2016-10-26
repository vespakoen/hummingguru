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

class Profile extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>I'm the Profile component</Text>
      </View>
    )
  }
}

Profile.propTypes = {}

export default Profile
