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
    return this.updateIn(['tasks', id], task => task.setName(name).setDeadline(deadline));
  }
  create() {
    const id = this.getLatestId() + 1;
    return this.setIn(['tasks', id], new Task({ id })).changeInputTarget(id);
  }
  check(id) {
    return this.updateIn(['tasks', id], task => task.check());
  }
  submit() {
    return this.changeInputTarget(undefined);
  }
  changeInputTarget(id) {
    return this.set('inputTarget', id);
  }
  applyTaskResponse(object) {
    return this.setIn(['tasks', object.id], new Task(object));
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
