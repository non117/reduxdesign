import { createStore, combineReducers } from 'redux';
import { TodoState } from '../models';
import todoReducer from '../ducks/Todo.js';

export default () => {
  const initialState = { $$todoState: new TodoState() };
  const combinedReducer = combineReducers({
    $$todoState: todoReducer,
  });
  return createStore(combinedReducer, initialState);
}
