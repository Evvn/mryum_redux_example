import * as actionTypes from '../../components/Menu/actions/actionTypes/actionTypes.js'
import { takeLatest } from 'redux-saga/effects'

export function* getMenuData(action) {
  yield console.log(action.venueName);
}

export function* actionWatcher() {
  yield [
    takeLatest(actionTypes.GET_MENU_DATA_REQUEST, getMenuData),
  ]
}
