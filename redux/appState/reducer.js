const defaultState = {
  testsTime: [],
  passedTest: true,
  isUserLoggedIn: false,
  isUserAdmin: false,
  courseTitle: 'This is default title',
  progress: 10,
  logoUrl: 'https://picsum.photos/290/75',
  userName: 'Sebastian',
  userSurname: 'Kurzynowski',
  listOfTests: [],
  appGlobalMode: 'welcome',
  questionsCollection: [],
  fetchWP: {},
  currentTest: 'pre-test',
  selectedAnswers: [],
  testResults: [],
  activePost: [],
  modules: [],
  activeModule: null,
  activeSubmodule: null,
  isOpenLightbox: true,
  certificateDownloaded: false,
  moduleKeys: [],
  sumQuestions: 0,
  progress: 0,
  visitedModules: [],
  notAllowed: false,
  certificate: '',
  timeStartStop: {},
  timeout: 1000,
  testCounter: 0
}

export default function appState (state = defaultState, action) {
  const newState = Object.assign({}, state)
  switch (action.type) {

    case 'APPSTATE_SET_DEFAULT':
      return defaultState

    case 'APPSTATE_SET_NUMBER':
      newState.number = action.number
      return newState

    case 'CUSTOM_TYPE':
      newState.number = action.number
      return newState

    //logout user
    case 'APPSTATE_TOGGLE_USER_LOGIN_STATUS' :
      newState.isUserLoggedIn = action.status
      return newState

    //update list of tests
    case 'APPSTATE_UPDATE_LIST_OF_TESTS' :
      newState.listOfTests = action.list
      return newState

    //update list of tests
    case 'APPSTATE_UPDATE_QUESTIONS_COLLECTION' :
      newState.questionsCollection = action.list
      return newState

    //set fetch WP
    case 'APPSTATE_FETCH_WP':
      newState.fetchWP = action.fetchWP
      return newState

    case 'APPSTATE_SET_APP_MODE':
      newState.appGlobalMode = action.mode
      if (action.mode === 'test') {
        newState.timeStartStop.start = +new Date()
      }
      if (action.mode === 'result') {
        newState.timeStartStop.stop = +new Date()
      }

      return newState

    case 'APPSTATE_UPDATE_ANSWERS':
      newState.selectedAnswers = action.answers
      return newState

    case 'APPSTATE_UPDATE_TEST_RESULTS':
      newState.testResults = action.results
      return newState

    case 'APPSTATE_SET_CURRENT_TEST':
      newState.currentTest = action.testSlug
      return newState

    case 'APPSTATE_SET_ANSWERS_DEFAULT':
      newState.selectedAnswers = []
      return newState

    case 'APPSTATE_SET_ACTIVE_POST':
      newState.activePost = action.post
      newState.appGlobalMode = 'post'
      return newState

    case 'APPSTATE_SET_MODULES':
      newState.modules = action.modules
      return newState

    case 'APPSTATE_SET_ACTIVE_MODULE':
      newState.activeModule = action.module
      return newState

    case 'APPSTATE_SET_ACTIVE_SUBMODULE':
      newState.activeSubmodule = action.submodule
      const index = state.visitedModules.indexOf(action.submodule)
      if (0 > index) {
        newState.visitedModules = state.visitedModules.concat(action.submodule)
      }

      return newState

    case 'APPSTATE_RESET_VISITED_MODULES':
      newState.visitedModules = []

      return newState

    case 'APPSTATE_SET_TESTS_TIME':
      newState.testsTime = action.testsTime
      return newState

    case 'APPSTATE_SET_CERTIFICATE_DOWNLOADED':
      newState.certificateDownloaded = action.bool
      return newState

    case 'APPSTATE_SET_CERTIFICATE':
      newState.certificate = action.certificate
      return newState

    case 'APPSTATE_SET_MODULE_KEYS':
      newState.moduleKeys = action.keys
      return newState

    case 'APPSTATE_SET_SUM_QUESTIONS':
      newState.sumQuestions = action.sum
      return newState

    case 'APPSTATE_SET_PROGRESS':
      newState.progress = action.value
      return newState

    case 'APPSTATE_SET_NOT_ALLOWED':
      newState.notAllowed = action.notAllowed
      return newState

    case 'APPSTATE_SET_TIMEOUT':
      newState.timeout = action.timeout

      return newState

    case 'APPSTATE_SET_USER_PASSED_EXAM':
      newState.passedTest = action.passedTest
      return newState

    case 'APPSTATE_SET_TEST_COUNTER':
      if (state.currentTest !== 'pre-test') {
        newState.testCounter++
      }
      return newState

    case 'APPSTATE_SET_INIT_TEST_COUNTER':
      newState.testCounter = action.initValue

      return newState

    default:
      return state
  }
}
