export const setDefault = () => ({
  type: 'APPSTATE_SET_DEFAULT'
})

export const setNumber = number => ({
  type: 'APPSTATE_SET_NUMBER',
  number
})
export const setCallback = number => ({
  type: 'CUSTOM_TYPE',
  number
})

//logout user
export const toggleUserLogginStatus = status => ({
  type: 'APPSTATE_TOGGLE_USER_LOGIN_STATUS',
  status
})
//update list of tests
export const updateListOfTests = list => ({
  type: 'APPSTATE_UPDATE_LIST_OF_TESTS',
  list
})

//update list of tests
export const updateQuestionsCollection = list => ({
  type: 'APPSTATE_UPDATE_QUESTIONS_COLLECTION',
  list
})

//update list of tests
export const setFetchWP = fetchWP => ({
  type: 'APPSTATE_FETCH_WP',
  fetchWP
})

export const setAppMode = mode => ({
  type: 'APPSTATE_SET_APP_MODE',
  mode
})
export const updateAnswers = answers => ({
  type: 'APPSTATE_UPDATE_ANSWERS',
  answers
})
export const setTestResults = results => ({
  type: 'APPSTATE_UPDATE_TEST_RESULTS',
  results
})
export const setCurrentTest = testSlug => ({
  type: 'APPSTATE_SET_CURRENT_TEST',
  testSlug
})
export const setSelectedAnswersDefault = () => ({
  type: 'APPSTATE_SET_ANSWERS_DEFAULT',
})

export const setActivePost = (post) => ({
  type: 'APPSTATE_SET_ACTIVE_POST',
  post
})

export const setModules = (modules) => ({
  type: 'APPSTATE_SET_MODULES',
  modules
})

export const setActiveModule = (module) => ({
  type: 'APPSTATE_SET_ACTIVE_MODULE',
  module
})

export const setActiveSubmodule = (submodule) => ({
  type: 'APPSTATE_SET_ACTIVE_SUBMODULE',
  submodule
})
export const setCertificateDownloaded = (bool) => ({
  type: 'APPSTATE_SET_CERTIFICATE_DOWNLOADED',
  bool
})

