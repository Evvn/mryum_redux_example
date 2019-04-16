import * as actionTypes from '../actions/actionTypes/actionTypes.js';
import { filter } from '../enums/menuEnums.js';

const initialState = {
  venue: '',
  bffRes: false,
  isLoading: true,
  lang: 'en',
  filter
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
