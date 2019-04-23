import * as actionTypes from '../actions/actionTypes/actionTypes.js';

const initialState = {
  isLoading: false,
}

function commonReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.GET_MENU_DATA_REQUEST:
      return {
        ...state,
        isLoading: true,
      }
    case actionTypes.GET_MENU_DATA_SUCCESS:
      return {
        ...state,
        isLoading: false,
      }
    case actionTypes.GET_VENUE_NAMES_REQUEST:
      return {
        ...state,
        isLoading: true,
      }
    case actionTypes.GET_VENUE_NAMES_SUCCESS:
      return {
        ...state,
        venueNames: action.res,
        isLoading: false,
      }
    default:
      return state
  }
}

export default commonReducer;
