import React, { PropTypes } from 'react';

import { Task } from '../../models';

export default class TaskForm extends React.PureComponent {
  static propTypes = {
    task: Task.PropTypes.isRequired,
  }
  static contextTypes = {
    toggleInputMode: PropTypes.func,
    updateTask: PropTypes.func,
  }
  render() {
    const { task } = this.props;
    const { toggleInputMode, updateTask } = this.context;
    return (
      <tr>
        <td>{task.id}</td>
        <td>
          <input type="text" value={this.name} onChange={(e) => updateTask({ id: task.id, name: e.target.value})} />
        </td>
        <td>{task.deadline}</td>
        <td>
          <button onClick={() => toggleInputMode(task.id)}>
            done!
          </button>
        </td>
      </tr>
    );
  }
}
