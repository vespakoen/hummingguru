import React, { PropTypes } from 'react'
import {
  View,
  TouchableOpacity,
  StyleSheet
} from 'react-native'

const styles = StyleSheet.create({
  roundButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#fff'
  }
})

const RoundButton = ({ onPress, buttonStyle, children }) => (
  <TouchableOpacity onPress={onPress} >
    <View style={[styles.roundButton, buttonStyle || {}]} >
      { children }
    </View>
  </TouchableOpacity>
)

RoundButton.propTypes = {
  onPress: PropTypes.func,
  buttonStyle: PropTypes.object, // eslint-disable-line
  children: PropTypes.element
}

export default RoundButton
