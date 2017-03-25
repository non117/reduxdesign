import { createAction, handleActions } from 'redux-actions';
import { takeEvery } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import { TodoState } from '../models';

const CREATE_TASK = 'CREATE_TASK';
const UPDATE_TASK = 'UPDATE_TASK';
const CHECK_TASK = 'CHECK_TASK';
const SUBMIT_TASK = 'SUBMIT_TASK';
const CHANGE_INPUT = 'CHANGE_INPUT';
const SUBMIT_TASK_SUCCEEDED = 'SUBMIT_TASK_SUCCEEDED';
const SUBMIT_TASK_FAILED = 'SUBMIT_TASK_FAILED';

export default handleActions({
  [CREATE_TASK]: ($$state, action) => $$state.create(action.payload),
  [UPDATE_TASK]: ($$state, action) => $$state.update(action.payload),
  [CHECK_TASK]: ($$state, action) => $$state.check(action.payload),
  [SUBMIT_TASK]: ($$state, action) => $$state.submit(action.payload),
  [CHANGE_INPUT]: ($$state, action) => $$state.changeInputTarget(action.payload),
  [SUBMIT_TASK_SUCCEEDED]: ($$state, action) => $$state.applyTaskResponse(action.payload),
}, new TodoState());

export const actions = {
  createTask: createAction(CREATE_TASK),
  updateTask: createAction(UPDATE_TASK),
  checkTask: createAction(CHECK_TASK),
  submitTask: createAction(SUBMIT_TASK),
  changeInputTarget: createAction(CHANGE_INPUT),
};

function* submitTask(action) {
  try {
    const task = action.payload;
    const response = yield call(() => task.submit());
    yield put(createAction(SUBMIT_TASK_SUCCEEDED)(response));
  } catch(e) {
    yield put(createAction(SUBMIT_TASK_FAILED)(e.message));
  }
}

export function* todoSaga() {
  yield* takeEvery(SUBMIT_TASK, submitTask);
}
