import * as actionTypes from '../actions/actionTypes/actionTypes.js';

const initialState = {
  venueNames: false,
}

function persistentCommonReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.GET_VENUE_NAMES_REQUEST:
      return {
        ...state,
        // isLoading: true,
      }
    case actionTypes.GET_VENUE_NAMES_SUCCESS:
      return {
        ...state,
        venueNames: action.res
      }
    default:
      return state
  }
}

export default persistentCommonReducer;
