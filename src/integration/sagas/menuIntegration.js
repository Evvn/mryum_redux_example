import * as actionTypes from '../../components/Menu/actions/actionTypes/actionTypes.js';
import { takeLatest, put } from 'redux-saga/effects';
import callBff from '../callBff.js'

export function* getMenuData(action) {
  try {
    // const getVenueName = state => state.router.route;
    // const venueName = yield select(getVenueName);

    const res = yield callBff('/menu', 'GET')
      .then(response => response)
      yield put({
        type: actionTypes.GET_MENU_DATA_SUCCESS,
        res,
      })
  } catch (error) {
    yield put({
      type: actionTypes.GET_MENU_DATA_FAILURE,
      error,
    })
  }
}

export function* actionWatcher() {
  yield [
    takeLatest(actionTypes.GET_MENU_DATA_REQUEST, getMenuData),
  ]
}
