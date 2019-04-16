// eslint-disable-next-line
import * as actionTypes from '../actions/actionTypes/actionTypes.js'

const initialState = {
  isTest: true,
  isQR: false,
  isBroadsheet: false,
  venueurl: '',
  sections: [],
  definitions: [],
  showModal: false,
  showMenuLink: false,
  showBroadsheetLink: false,
  menuUrl: '',
  broadsheetLink: '',
  sectionPositions: {},
}

function menuReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.UPDATE_FILTER:
      return {
        ...state,
        filter: action.filter,
      }
    case actionTypes.SET_SECTION_POSITION_SUCCESS:
      return {
        ...state,
        sectionPositions: action.sectionPositions,
      }
    default:
      return state
  }
}

export default menuReducer;
