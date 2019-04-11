import * as actionTypes from './actions/actionTypes/actionTypes.js'

const initialState = {
  isTest: true,
  isQR: false,
  isBroadsheet: false,
  isLoading: false,
  venueurl: '',
  venue: '',
  sections: [],
  definitions: [],
  lang: 'en', // can use common reducer for this to access it from all pages
  showModal: false,
  showMenuLink: false,
  showBroadsheetLink: false,
  menuUrl: '',
  broadsheetLink: '',
  bffRes: false,
  filter: false,
}

function menuReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.GET_MENU_DATA_REQUEST:
      return {
        ...state,
        isLoading: true,
      }
    case actionTypes.GET_MENU_DATA_SUCCESS:
      return {
        ...state,
        venue: action.venue,
        bffRes: action.res,
        isLoading: false,
      }
    default:
      return state
  }
}

export default menuReducer;
