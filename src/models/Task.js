import { PropTypes } from 'react';
import { Record } from 'immutable';
import { recordOf } from 'react-immutable-proptypes';

const TaskRecord = new Record({
  id: undefined,
  name: '',
  deadline: undefined,
  checked: false,
});

export default class Task extends TaskRecord {
  static PropTypes = recordOf({
    id: PropTypes.number,
    name: PropTypes.string,
    deadline: PropTypes.string,
    checked: PropTypes.bool,
  })
  setName(name) {
    return this.set('name', name);
  }
  setDeadline(deadline) {
    return this.set('deadline', deadline);
  }
  check() {
    return this.set('checked', true);
  }
  revert() {
    return this.set('checked', false);
  }
  isLate() {
    return this.deadline < Date.now();
  }
  submit() {
    // FIXME http request
    return this.toJS();
  }
}
