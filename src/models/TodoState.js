import { PropTypes } from 'react';
import { Record, OrderedMap } from 'immutable';
import { recordOf, mapOf, mapContains } from 'react-immutable-proptypes';
import Task from './Task';

const TodoStateRecord = new Record({
  tasks: new OrderedMap(),
  inputTarget: undefined,
});

export default class TodoState extends TodoStateRecord {
  static PropTypes = recordOf({
    tasks: mapOf(
      Task.PropTypes.isRequired,
      mapContains(PropTypes.number.isRequired)
    ),
    inputTarget: PropTypes.number,
  })
  // actions
  update({id, name, deadline}) {
    const targetTask = this.tasks.get(id).setName(name).setDeadline(deadline);
    return this.set('tasks', this.tasks.set(id, targetTask));
  }
  create() {
    const id = this.getLatestId() + 1;
    const newTask = new Task({ id });
    return this.set('tasks', this.tasks.set(id, newTask)).changeInputTarget(id);
  }
  check(id) {
    const targetTask = this.tasks.get(id).check();
    return this.set('tasks', this.tasks.set(id, targetTask));
  }
  submit() {
    return this.changeInputTarget(undefined);
  }
  changeInputTarget(id) {
    return this.set('inputTarget', id);
  }
  applyTaskResponse(object) {
    const newTask = new Task(object);
    return this.set('tasks', this.tasks.set(object.id, newTask));
  }
  // convenience methods
  getLatestId() {
    if (this.tasks.count() === 0) {
      return 0;
    }
    return this.tasks.keySeq().max();
  }
  getIncompleteTasks() {
    return this.tasks.filter(task => !task.checked).valueSeq();
  }
  getCompleteTasks() {
    return this.tasks.filter(task => task.checked).valueSeq();
  }
}
