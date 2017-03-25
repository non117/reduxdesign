import React, { PropTypes } from 'react';
import { Task } from '../../models';

export default class TaskItem extends React.PureComponent {
  static propTypes = {
    task: Task.PropTypes.isRequired,
  }
  static contextTypes = {
    changeInputTarget: PropTypes.func,
    checkTask: PropTypes.func,
  }
  renderCheckButton() {
    const { task } = this.props;
    const { checkTask } = this.context;
    return <button onClick={() => checkTask(task.id)}>✅</button>
  }

  render() {
    const { task } = this.props;
    const { changeInputTarget, checkTask } = this.context;
    return (
      <tr onClick={() => changeInputTarget(task.id)}>
        <td>{task.id}</td>
        <td>{task.name}</td>
        <td>{task.deadline}</td>
        <td>
          { task.checked ? "✅" : this.renderCheckButton() }
        </td>
      </tr>
    );
  }
}
