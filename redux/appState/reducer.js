const defaultState = {
  isUserLoggedIn: false,
  isUserAdmin: false,
  courseTitle: 'This is default title',
  progress: 10,
  logoUrl: "https://picsum.photos/290/75",
  userName: "Sebastian",
  userSurname: "Kurzynowski",
  listOfTests: [{title: "Pierwszy test", ID: 1, }],
  appGlobalMode: 'add_question',
  questionsCollection: [],
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

    default:
      return state
  }
}