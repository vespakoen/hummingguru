import React, {
  Component,
  PropTypes
} from 'react'

import {
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native'

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

class Login extends Component {
  render() {
    const { isLoggedIn, isFetchingProfile, isFetchingUser, login } = this.props
    if (isLoggedIn) {
      if (isFetchingProfile) {
        return (<Text>Loading Facebook profile...</Text>)
      } else if (isFetchingUser) {
        return (<Text>Loading user information...</Text>)
      }
    } else {
      return (
        <TouchableOpacity
          onPress={login}
          style={styles.login}
        >
          <Text style={styles.loginText}>Login with Facebook</Text>
        </TouchableOpacity>
      )
    }
    return null
  }
}

Login.propTypes = {
  login: PropTypes.func,
  isLoggedIn: PropTypes.bool,
  isFetchingUser: PropTypes.bool,
  isFetchingProfile: PropTypes.bool
}

export default connect(
  state => state.login,
  actions
)(Login)
