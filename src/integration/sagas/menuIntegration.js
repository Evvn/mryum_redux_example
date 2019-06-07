import * as actionTypes from "../../components/Menu/actions/actionTypes/actionTypes.js";
// import * as commonActionTypes from '../../components/Common/actions/actionTypes/actionTypes.js';
import { takeLatest, put } from "redux-saga/effects";
import callBff from "../callBff.js";
import { sortByValue } from "../../utils/objectUtils.js";

const delay = ms => new Promise(res => setTimeout(res, ms));

export function* getMenuData(action) {
  try {
    const res = yield callBff(`menu/${action.venue}`, "GET").then(
      response => response
    );
    yield delay(2000);
    yield put({
      type: actionTypes.GET_MENU_DATA_SUCCESS,
      venue: action.venue,
      res
    });
    yield put({
      type: actionTypes.SET_ITEM_ID,
      id: action.item
    });
  } catch (error) {
    console.log(error);
    // window.location = '/notfound'
    yield put({
      type: actionTypes.GET_MENU_DATA_FAILURE,
      error
    });
  }
}

export function* setSectionPositions(action) {
  const sectionPositions = {};
  yield (sectionPositions[action.section] = action.position);
  yield put({
    type: actionTypes.SET_SECTION_POSITION_SUCCESS,
    sectionPositions: sortByValue(sectionPositions)
  });
}

export function* actionWatcher() {
  yield [
    takeLatest(actionTypes.GET_MENU_DATA_REQUEST, getMenuData),
    takeLatest(actionTypes.SET_SECTION_POSITION_REQUEST, setSectionPositions)
  ];
}
