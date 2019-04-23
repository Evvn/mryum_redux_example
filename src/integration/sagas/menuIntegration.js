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
      yield put({
        type: actionTypes.SET_ITEM_ID,
        id: action.item,
      })
  } catch (error) {
    console.log(error)
    window.location = '/notfound'
    yield put({
      type: actionTypes.GET_MENU_DATA_FAILURE,
      error,
    })
  }
}

export function* getVenues(action) {
  try {
    const res = yield callBff(`venues`, 'POST', {category: 'brunch'})
      .then(response => response)
      yield put({
        type: actionTypes.GET_VENUES_SUCCESS,
        res,
      })
  } catch (error) {
    console.log(error)
    window.location = '/notfound'
    yield put({
      type: actionTypes.GET_VENUES_FAILURE,
      error,
    })
  }
}

export function* setSectionPositions(action) {
  const sortByValue = (obj) => {
    const newObj = {};
    const sortable = Object.keys(obj).map(key => [key, obj[key]]);
    sortable.sort((a,b) => a[1] - b[1]);
    sortable.forEach(obj => {
      newObj[obj[0]] = obj[1]
    });

    return newObj;
  }
    const getCurrentPositions = state => state.menu.sectionPositions;
    let sectionPositions = yield select(getCurrentPositions);
    sectionPositions = !sectionPositions ? {} : sectionPositions;
    sectionPositions[action.section] = action.position;
    yield put({
      type: actionTypes.SET_SECTION_POSITION_SUCCESS,
      sectionPositions: sortByValue(sectionPositions),
    });
}

export function* actionWatcher() {
  yield [
    takeLatest(actionTypes.GET_MENU_DATA_REQUEST, getMenuData),
    takeLatest(actionTypes.GET_VENUES_REQUEST, getVenues),
    takeLatest(actionTypes.SET_SECTION_POSITION_REQUEST, setSectionPositions),
  ]
}
