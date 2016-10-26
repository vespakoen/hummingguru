import React, {
  Component,
  PropTypes
} from 'react'

import {
  View,
  Text
} from 'react-native'

import {
  Drawer,
  COLOR,
  TYPO
} from 'react-native-material-design'

import { connect } from 'react-redux'
import { actions } from '../redux/navigation'

class MenuDrawer extends Component {
  render() {
    const page = this.props.page
    return (
      <Drawer theme="light">
        <Drawer.Header>
          <View>
            <Text style={[COLOR.paperGrey50, TYPO.paperFontSubhead]}>Koen</Text>
          </View>
        </Drawer.Header>
        <Drawer.Section
          items={[
            {
              icon: 'hearing',
              value: 'Help Others',
              active: page === 'helpOthers',
              onPress: () => this.props.navigateTo('helpOthers'),
              onLongPress: () => this.props.navigateTo('helpOthers')
            },
            {
              icon: 'mic',
              value: 'Get Help',
              label: '12',
              active: page === 'recorder',
              onPress: () => this.props.navigateTo('recorder'),
              onLongPress: () => this.props.navigateTo('recorder')
            },
            {
              icon: 'record-voice-over',
              value: 'My Humms',
              active: page === 'requests',
              label: '8',
              onPress: () => this.props.navigateTo('requests'),
              onLongPress: () => this.props.navigateTo('requests')
            },
            {
              icon: 'face',
              value: 'My Profile',
              active: page === 'profile',
              onPress: () => this.props.navigateTo('profile'),
              onLongPress: () => this.props.navigateTo('profile')
            }
          ]}
        />
      </Drawer>
    )
  }
}

MenuDrawer.propTypes = {
  page: PropTypes.string,
  navigateTo: PropTypes.func
}

export default connect(state => state.navigation, actions)(MenuDrawer)
