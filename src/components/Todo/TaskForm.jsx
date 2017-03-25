import React, { PropTypes } from 'react';

import { Task } from '../../models';

export default class TaskForm extends React.PureComponent {
  static propTypes = {
    task: Task.PropTypes.isRequired,
  }
  static contextTypes = {
    submitTask: PropTypes.func,
    updateTask: PropTypes.func,
  }
  render() {
    const { task } = this.props;
    const { submitTask, updateTask } = this.context;
    return (
      <tr>
        <td>{task.id}</td>
        <td>
          <input type="text" value={task.name} onChange={(e) => updateTask({ id: task.id, name: e.target.value})} />
        </td>
        <td>{task.deadline}</td>
        <td>
          <button onClick={() => submitTask(task.id)}>
            👊
          </button>
        </td>
      </tr>
    );
  }
}
