import React, { PropTypes } from 'react';

export default class AddButton extends React.PureComponent {
  static contextTypes = {
    createTask: PropTypes.func.isRequired,
  }
  render() {
    const { createTask } = this.context;
    return (
      <button onClick={() => createTask()}>
        new!
      </button>
    );
  }
}
