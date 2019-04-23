import * as actionTypes from './actionTypes/actionTypes.js';

export function getVenueNames() {
  return {
    type: actionTypes.GET_VENUE_NAMES_REQUEST,
  }
}
