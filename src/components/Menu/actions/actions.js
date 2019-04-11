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
