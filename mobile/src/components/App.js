import React, { PropTypes } from 'react'

import {
  StyleSheet,
  StatusBar,
  View
} from 'react-native'

import { Toolbar } from 'react-native-material-design'
import { connect } from 'react-redux'
import Menu from './Menu'
import Login from './Login'
import Recorder from './Recorder'
import HelpOthers from './HelpOthers'
import Profile from './Profile'
import Requests from './Requests'
import { actions } from '../redux/navigation'

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  scene: {
    marginTop: 56 + 18,
    flex: 1,
    backgroundColor: '#d8d8d8'
  },
  toolbar: {
    paddingTop: 18,
    height: 56 + 18,
    backgroundColor: '#ffe000'
  }
})

const pageToComponentMap = {
  login: Login,
  recorder: Recorder,
  helpOthers: HelpOthers,
  profile: Profile,
  requests: Requests
}

const App = ({ page, openDrawer }) => {
  if (page === 'login') {
    return <Login />
  }
  const Scene = pageToComponentMap[page]
  return (
    <Menu>
      <StatusBar
        barStyle="default"
      />
      <View style={styles.scene}>
        <Scene />
      </View>
      <Toolbar
        style={styles.toolbar}
        onIconPress={openDrawer}
        theme="light"
        title="Humming Guru"
        icon="menu"
      />
    </Menu>
  )
}

App.propTypes = {
  page: PropTypes.string,
  openDrawer: PropTypes.func
}

export default connect(
  state => state.navigation,
  actions
)(App)
