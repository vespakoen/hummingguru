import React, {
  Component,
  PropTypes
} from 'react'

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
    backgroundColor: '#dc772f'
  }
})

const pageToComponentMap = {
  login: Login,
  recorder: Recorder,
  helpOthers: HelpOthers
}

class App extends Component {
  render() {
    const page = this.props.page
    if (page === 'login') {
      return <Login />
    }
    const Scene = pageToComponentMap[page]
    return (
      <Menu>
        <StatusBar
          barStyle="light-content"
        />
        <View style={styles.scene}>
          <Scene />
        </View>
        <Toolbar
          style={styles.toolbar}
          onIconPress={this.props.openDrawer}
          theme="dark"
          title="Humming Guru"
          icon="menu"
        />
      </Menu>
    )
  }
}

App.propTypes = {
  page: PropTypes.string,
  openDrawer: PropTypes.func
}

export default connect(
  state => state.navigation,
  actions
)(App)
