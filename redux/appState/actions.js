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
//update list of tests
export const updateListOfTests = (list) => ({
  type: 'APPSTATE_UPDATE_LIST_OF_TESTS',
  list
})

//update list of tests
export const updateQuestionsCollection = (list) => ({
  type: 'APPSTATE_UPDATE_QUESTIONS_COLLECTION',
  list
})

//update list of tests
export const setFetchWP = (fetchWP) => ({
  type: 'APPSTATE_FETCH_WP',
  fetchWP
})

export const setAppMode = (mode) => ({
  type: 'APPSTATE_SET_APP_MODE',
  mode
})
export const updateAnswers = (answers) => ({
  type:'APPSTATE_UPDATE_ANSWERS',
  answers
})



