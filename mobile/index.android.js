import React from 'react'
import { AppRegistry } from 'react-native'
import { Provider } from 'react-redux'
import App from './src/components/App'
import store from './src/store'

const HummingGuru = () => (
  <Provider store={store}>
    <App />
  </Provider>
)

AppRegistry.registerComponent('HummingGuru', () => HummingGuru)
