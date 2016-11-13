import React, { PropTypes } from 'react'

import {
  StyleSheet,
  StatusBar,
  Text,
  View
} from 'react-native'

import { connect } from 'react-redux'
import Login from './Login'
import Recorder from './Recorder'
import HelpOthers from './HelpOthers'
import Profile from './Profile'
import Requests from './Requests'
import TabBar from './TabBar'
import { actions } from '../redux/navigation'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ddd'
  },
  header: {
    height: 70,
    paddingTop: 18,
    backgroundColor: '#ffe000',
    alignItems: 'center',
    justifyContent: 'center'
  },
  headerTitle: {
    color: '#000',
    fontSize: 20
  }
})

const pageToComponentMap = {
  login: Login,
  recorder: Recorder,
  helpOthers: HelpOthers,
  profile: Profile,
  requests: Requests
}

const pageToTitleMap = {
  recorder: 'Get Help',
  helpOthers: 'Help Others',
  profile: 'Profile',
  requests: 'Requests'
}

const App = ({ page }) => {
  if (page === 'login') {
    return <Login />
  }
  const Scene = pageToComponentMap[page]
  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="default"
      />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>
          {pageToTitleMap[page]}
        </Text>
      </View>
      <Scene />
      <TabBar />
    </View>
  )
}

App.propTypes = {
  page: PropTypes.string
}

export default connect(
  state => state.navigation,
  actions
)(App)
