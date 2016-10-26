import React, { Component } from 'react'
import { AppRegistry } from 'react-native'
import { Provider } from 'react-redux'
import Login from './src/components/Login'
import store from './src/store'

const HummingGuru = () => (
  <Provider store={store}>
    <Login />
  </Provider>
)

AppRegistry.registerComponent('HummingGuru', () => HummingGuru)
