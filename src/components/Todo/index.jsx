import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import AddButton from './AddButton.jsx';
import TaskFrom from './TaskForm.jsx';
import TaskItem from './TaskItem.jsx';
import * as duck from '../../ducks/Todo';

export class TodoApp extends React.PureComponent {
  static propTypes = {
    state: PropTypes.object.isRequired,
    createTask: PropTypes.func.isRequired,
    updateTask: PropTypes.func.isRequired,
    checkTask: PropTypes.func.isRequired,
    submitTask: PropTypes.func.isRequired,
    changeInputTarget: PropTypes.func.isRequired,
  }
  static childContextTypes = {
    createTask: PropTypes.func,
    updateTask: PropTypes.func,
    checkTask: PropTypes.func,
    submitTask: PropTypes.func,
    changeInputTarget: PropTypes.func,
  }
  getChildContext() {
    const { state, ...actions } = this.props;
    return { ...actions };
  }
  renderTasks() {
    const { state } = this.props;
    return state.tasks.valueSeq().map(
      task => {
        if (task.id === state.inputTarget) {
          return <TaskFrom key={task.id} task={task} />
        }
        return <TaskItem key={task.id} task={task} />
      }
    );
  }
  render() {
    return(
      <div>
        <AddButton />
        <table>
          <thead>
            <tr>
              <th>id</th>
              <th>name</th>
              <th>deadline</th>
              <th />
            </tr>
          </thead>
          <tbody>
            { this.renderTasks() }
          </tbody>
        </table>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { state: state.$$todoState };
}

function mapDispatchProps(dispatch) {
  return {
    ...bindActionCreators(duck.actions, dispatch),
  };
}

export const TodoContainer = connect(mapStateToProps, mapDispatchProps)(TodoApp);
