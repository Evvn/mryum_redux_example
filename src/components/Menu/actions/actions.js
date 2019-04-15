import * as actionTypes from './actionTypes/actionTypes.js';

// export function setLandingRoute(route) {
//   return {
//     type: actionTypes.CHANGE_LANDING_SUBROUTE,
//     route,
//   };
// }

export function getMenuData(venue) {
  return {
    type: actionTypes.GET_MENU_DATA_REQUEST,
    venue,
  }
}

export function updateFilter(filter) {
  return {
    type: actionTypes.UPDATE_FILTER,
    filter,
  }
}

export function updateLang(lang) {
  return {
    type: actionTypes.UPDATE_LANG,
    lang,
  }
}
