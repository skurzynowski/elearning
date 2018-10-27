export const setDefault = () => ({
  type: 'APPSTATE_SET_DEFAULT'
})

export const setNumber = (number) => ({
  type: 'APPSTATE_SET_NUMBER',
  number
})
export const setCallback = (number) => ({
  type: 'CUSTOM_TYPE',
  number
})

//logout user
export const toggleUserLogginStatus = (status) => ({
  type: 'APPSTATE_TOGGLE_USER_LOGIN_STATUS',
  status
})



