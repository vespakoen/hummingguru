import React, {
  Component,
  PropTypes
} from 'react'

import DrawerLayout from 'react-native-drawer-layout'
import { connect } from 'react-redux'
import { actions } from '../redux/navigation'
import MenuDrawer from './MenuDrawer'

class Menu extends Component {
  render() {
    return (
      <DrawerLayout
        ref={this.props.setDrawerLayoutRef}
        drawerWidth={270}
        drawerPosition={DrawerLayout.positions.Left}
        renderNavigationView={() => (<MenuDrawer />)}
        onDrawerClose={this.props.closeDrawer}
      >
        { this.props.children }
      </DrawerLayout>
    )
  }
}

Menu.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element),
  closeDrawer: PropTypes.func,
  setDrawerLayoutRef: PropTypes.func
}

export default connect(
  state => state.navigation,
  actions
)(Menu)
