import React, {
  Component,
  PropTypes
} from 'react'

import {
  View,
  Text,
  Image,
  StyleSheet
} from 'react-native'

import { connect } from 'react-redux'
import { actions } from '../redux/login'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderColor: '#fff',
    borderWidth: 5,
    marginTop: 40
  },
  name: {
    marginTop: 40,
    fontSize: 24,
    lineHeight: 36,
    color: '#888'
  }
})

class Profile extends Component {
  shouldComponentUpdate(nextProps) {
    return this.props !== nextProps
  }

  render() {
    const { first_name: firstName, id: facebookId } = this.props.user.facebookProfile

    return (
      <View style={styles.container}>
        <Image style={styles.avatar} source={{ uri: `https://graph.facebook.com/${facebookId}/picture?type=large&width=300&height=300` }} />
        <Text style={styles.name}>{firstName}</Text>
      </View>
    )
  }
}

Profile.propTypes = {

}

export default connect(
  state => state.login,
  actions
)(Profile)
