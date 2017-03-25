import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import storeCreator from './stores/TodoApp';
import { TodoContainer } from './components/Todo/index.jsx';

ReactDOM.render(
  <Provider store={storeCreator()}>
    <TodoContainer />
  </Provider>,
  document.getElementById('app')
);
