import React, {
  Component,
  PropTypes
} from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native'
import Recorder from './Recorder'
import HelpOthers from './HelpOthers'

import { connect } from 'react-redux'
import { actions } from '../redux/login'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ddd',
  },
  login: {
    backgroundColor: '#2b608a',
    padding: 20
  },
  loginText: {
    fontSize: 20,
    color: '#fff'
  }
})

const Login = ({
  isLoggedIn,
  isFetchingProfile,
  isFetchingUser,
  user,
  login
}) => {
  let view
  if (user) {
    view = (<HelpOthers />)
  } else if (isLoggedIn) {
    if (isFetchingProfile) {
      view = (<Text>Loading Facebook profile...</Text>)
    } else if (isFetchingUser) {
      view = (<Text>Loading user information...</Text>)
    }
  } else {
    view = (
      <TouchableOpacity
        onPress={login}
        style={styles.login}
      >
        <Text style={styles.loginText}>Login with Facebook</Text>
      </TouchableOpacity>
    )
  }
  return (
    <View style={styles.container}>
      { view }
    </View>
  )
}

Login.propTypes = {
  login: PropTypes.func,
  user: PropTypes.object,
  isLoggedIn: PropTypes.bool,
  isFetchingUser: PropTypes.bool,
  isFetchingProfile: PropTypes.bool
}

export default connect(
  state => state.login,
  actions
)(Login)
