import * as actionTypes from '../actions/actionTypes/actionTypes.js'
import { filter } from '../enums/menuEnums.js'

const initialState = {
  isTest: true,
  isQR: false,
  isBroadsheet: false,
  filter,
  venueurl: '',
  sections: [],
  definitions: [],
  lang: 'en', // can use common reducer for this to access it from all pages
  showModal: false,
  showMenuLink: false,
  showBroadsheetLink: false,
  menuUrl: '',
  broadsheetLink: '',
}

function menuReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.UPDATE_LANG:
      return {
        ...state,
        lang: action.lang,
      }
    case actionTypes.UPDATE_FILTER:
      return {
        ...state,
        filter: action.filter,
      }
    default:
      return state
  }
}

export default menuReducer;
