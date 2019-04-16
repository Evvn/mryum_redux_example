import * as actionTypes from '../../components/Menu/actions/actionTypes/actionTypes.js';
import { takeLatest, put, select } from 'redux-saga/effects';
import callBff from '../callBff.js'

export function* getMenuData(action) {
  try {
    const res = yield callBff(`menu/${action.venue}`, 'GET')
      .then(response => response)
      yield put({
        type: actionTypes.GET_MENU_DATA_SUCCESS,
        venue: action.venue,
        res,
      })
  } catch (error) {
    console.log(error)
    yield put({
      type: actionTypes.GET_MENU_DATA_FAILURE,
      error,
    })
  }
}

export function* setSectionPositions(action) {
    const getCurrentPositions = state => state.menu.sectionPositions;
    const sectionPositions = yield select(getCurrentPositions);
    sectionPositions[action.section] = action.position.y;
    yield put({
      type: actionTypes.SET_SECTION_POSITION_SUCCESS,
      sectionPositions
    });
}

export function* actionWatcher() {
  yield [
    takeLatest(actionTypes.GET_MENU_DATA_REQUEST, getMenuData),
    takeLatest(actionTypes.SET_SECTION_POSITION_REQUEST, setSectionPositions),
  ]
}
