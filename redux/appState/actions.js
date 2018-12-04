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
export const setCertificate = (certificate) => ({
  type: 'APPSTATE_SET_CERTIFICATE',
  certificate
})
export const setModuleKeys = (keys) => ({
  type: 'APPSTATE_SET_MODULE_KEYS',
  keys
})
export const setSumOfQuestions = (sum) => ({
  type: 'APPSTATE_SET_SUM_QUESTIONS',
  sum

})
export const setProgress = (value) => ({
  type: 'APPSTATE_SET_PROGRESS',
  value
})
export const setNotAllowed = (notAllowed) => ({
  type: 'APPSTATE_SET_NOT_ALLOWED',
  notAllowed
})
export const resetVisitedModules = () => ({
  type: 'APPSTATE_RESET_VISITED_MODULES'
})

export const setTestsTime = (testsTime) => ({
  type: 'APPSTATE_SET_TESTS_TIME',
  testsTime
})

export const setTimeout = (timeout) => ({
  type: 'APPSTATE_SET_TIMEOUT',
  timeout
})

export const setUserPassExam = (passedTest) => ({
  type: 'APPSTATE_SET_USER_PASSED_EXAM',
  passedTest
})

export const setTestCounter = () => ({
  type: 'APPSTATE_SET_TEST_COUNTER'
})

export const setInitTestCounter = (initValue) => ({
  type: 'APPSTATE_SET_INIT_TEST_COUNTER',
  initValue
})
