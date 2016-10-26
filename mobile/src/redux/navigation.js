const initialState = {
  page: 'login',
  isDrawerOpened: false
}

let drawerLayoutRef
export function setDrawerLayoutRef(drawerLayout) {
  console.log('setting drawerLayoutRef')
  drawerLayoutRef = drawerLayout
}

export function navigateTo(page) {
  drawerLayoutRef.closeDrawer()
  return {
    type: 'NAVIGATE_TO',
    payload: page
  }
}

export function openDrawer() {
  drawerLayoutRef.openDrawer()
  return {
    type: 'OPEN_DRAWER'
  }
}

export function closeDrawer() {
  return {
    type: 'CLOSE_DRAWER'
  }
}

export const actions = {
  navigateTo,
  openDrawer,
  closeDrawer,
  setDrawerLayoutRef
}

const reducers = {
  NAVIGATE_TO: (state, action) => ({
    ...state,
    page: action.payload
  }),
  OPEN_DRAWER: (state) => ({
    ...state,
    isDrawerOpened: true
  }),
  CLOSE_DRAWER: (state) => ({
    ...state,
    isDrawerOpened: false
  })
}

export default (state = initialState, action) => {
  if (reducers[action.type]) {
    return reducers[action.type](state, action)
  }
  return state
}
