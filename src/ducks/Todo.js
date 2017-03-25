import { createAction, handleActions } from 'redux-actions';
import { TodoState } from '../models';

const CREATE_TASK = 'CREATE_TASK';
const UPDATE_TASK = 'UPDATE_TASK';
const CHECK_TASK = 'CHECK_TASK';
const TOGGLE_INPUT = 'TOGGLE_INPUT';

export default handleActions({
  [CREATE_TASK]: ($$state, action) => $$state.create(action.payload),
  [UPDATE_TASK]: ($$state, action) => $$state.update(action.payload),
  [CHECK_TASK]: ($$state, action) => $$state.check(action.payload),
  [TOGGLE_INPUT]: ($$state, action) => $$state.toggleInputMode(action.payload),
}, new TodoState());

export const actions = {
  createTask: createAction(CREATE_TASK),
  updateTask: createAction(UPDATE_TASK),
  checkTask: createAction(CHECK_TASK),
  toggleInputMode: createAction(TOGGLE_INPUT),
};
