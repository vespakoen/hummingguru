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

const Login = ({ user, login }) => (
  <View style={styles.container}>
    { user ? (
      <HelpOthers />
    ) : (
      <TouchableOpacity
        onPress={login}
        style={styles.login}
      >
        <Text style={styles.loginText}>Login with Facebook</Text>
      </TouchableOpacity>
    ) }
  </View>
)

Login.propTypes = {
  login: PropTypes.func,
  isLoggedIn: PropTypes.bool,
  isFetchingProfile: PropTypes.bool
}

export default connect(
  state => state.login,
  actions
)(Login)
