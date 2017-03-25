import React, { PropTypes } from 'react';
import { Task } from '../../models';

export default class TaskItem extends React.PureComponent {
  static propTypes = {
    task: Task.PropTypes.isRequired,
  }
  static contextTypes = {
    toggleInputMode: PropTypes.func,
  }
  render() {
    const { task } = this.props;
    const { toggleInputMode } = this.context;
    return (
      <tr onClick={() => toggleInputMode(task.id)}>
        <td>{task.id}</td>
        <td>{task.name}</td>
        <td>{task.deadline}</td>
      </tr>
    );
  }
}
