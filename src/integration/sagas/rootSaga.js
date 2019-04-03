import { all } from 'redux-saga/effects';
// Saga imports here: (Don't modify this comment, it's used by the code generator)
import { actionWatcher as menuIntegration } from './menuIntegration.js';

export default function* rootSaga() {
  yield console.log('init root saga');

  yield all([
    menuIntegration(),
  ]);
};
