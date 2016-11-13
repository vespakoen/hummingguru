import React, {
  Component,
  PropTypes
} from 'react'

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native'

import { connect } from 'react-redux'
import { actions } from '../redux/login'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ddd',
  },
  spacer: {
    flex: 1
  },
  login: {
    backgroundColor: '#2b608a',
    alignItems: 'center',
    padding: 20
  },
  loginText: {
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
  }
})

class Login extends Component {
  renderFetchingProfile() {
    return (
      <View style={styles.intro}>
        <Text style={styles.introText}>
          Loading Facebook profile...
        </Text>
      </View>
    )
  }

  renderFetchingUser() {
    return (
      <View style={styles.intro}>
        <Text style={styles.introText}>
          Loading user information...
        </Text>
      </View>
    )
  }

  renderLoginButtons() {
    const login = this.props.login
    return (
      <View style={styles.spacer}>
        <View style={styles.spacer} />
        <TouchableOpacity
          onPress={login}
          style={styles.login}
        >
          <Text style={styles.loginText}>
            Login with Facebook
          </Text>
        </TouchableOpacity>
      </View>
    )
  }

  renderContent() {
    const { isLoggedIn, isLoggingIn, isFetchingProfile, isFetchingUser } = this.props
    if (isLoggedIn) {
      if (isFetchingProfile) {
        return this.renderFetchingProfile()
      } else if (isFetchingUser) {
        return this.renderFetchingUser()
      }
    } else if (isLoggingIn) {
      return null
    } else {
      return this.renderLoginButtons()
    }
    return null
  }

  render() {
    return (
      <View style={styles.container}>
        { this.renderContent() }
      </View>
    )
  }
}

Login.propTypes = {
  login: PropTypes.func,
  isLoggedIn: PropTypes.bool,
  isLoggingIn: PropTypes.bool,
  isFetchingUser: PropTypes.bool,
  isFetchingProfile: PropTypes.bool
}

export default connect(
  state => state.login,
  actions
)(Login)
