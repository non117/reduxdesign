import { createStore, combineReducers, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { TodoState } from '../models';
import todoReducer, { todoSaga } from '../ducks/Todo.js';

export default () => {
  const initialState = { $$todoState: new TodoState() };
  const combinedReducer = combineReducers({
    $$todoState: todoReducer,
  });
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(combinedReducer, initialState, applyMiddleware(sagaMiddleware));
  sagaMiddleware.run(todoSaga);
  return store;
}
