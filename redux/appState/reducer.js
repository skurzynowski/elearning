const defaultState = {
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

    case 'APPSTATE_SET_CERTIFICATE_DOWNLOADED':
      newState.certificateDownloaded = action.bool
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

    default:
      return state
  }
}