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
}

function menuReducer(state = initialState, action) {
  switch (action.type) {
    default:
      return state
  }
}

export default menuReducer;
