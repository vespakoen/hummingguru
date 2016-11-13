import React, {
  Component,
  PropTypes
} from 'react'

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native'

import Icon from 'react-native-vector-icons/MaterialIcons'
import { connect } from 'react-redux'
import { actions } from '../redux/navigation'

const styles = StyleSheet.create({
  tabBar: {
    height: 50,
    backgroundColor: '#ffe000',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 4
  },
  tabBarItem: {
    alignItems: 'center'
  },
  icon: {
    color: '#888',
  },
  iconActive: {
    color: '#000'
  },
  label: {
    color: '#888',
    marginTop: 4,
    fontSize: 12
  },
  labelActive: {
    color: '#000'
  }
})

const pageToTitleMap = {
  recorder: 'Get Help',
  helpOthers: 'Help Others',
  profile: 'Profile',
  requests: 'Requests'
}

class TabBar extends Component {
  renderTabBarItem(page, icon) {
    const { page: activePage, navigateTo } = this.props
    return (
      <TouchableOpacity
        style={[styles.tabBarItem, activePage === page && styles.tabBarItemActive]}
        onPress={() => navigateTo(page)}
      >
        <Icon
          size={24}
          style={[styles.icon, activePage === page && styles.iconActive]}
          name={icon}
        />
        <Text style={[styles.label, activePage === page && styles.labelActive]}>
          {pageToTitleMap[page]}
        </Text>
      </TouchableOpacity>
    )
  }
  render() {
    return (
      <View style={styles.tabBar}>
        { this.renderTabBarItem('helpOthers', 'hearing') }
        { this.renderTabBarItem('recorder', 'mic') }
        { this.renderTabBarItem('requests', 'record-voice-over') }
        { this.renderTabBarItem('profile', 'face') }
      </View>
    )
  }
}

TabBar.propTypes = {
  page: PropTypes.string,
  navigateTo: PropTypes.func
}

export default connect(
  state => state.navigation,
  actions
)(TabBar)
