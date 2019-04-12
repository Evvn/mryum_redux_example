import * as actionTypes from '../actions/actionTypes/actionTypes.js'

const initialState = {
  venue: '',
  bffRes: false,
  isLoading: true,
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
