import React from 'react';
import { Component } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import css from './Filter.module.css';
export class Filter extends Component {
  changeInput = event => {
    const input = event.currentTarget.value;

    this.props.onChange(input);
  };
  render() {
    return (
      <>
        <div className={clsx(css.filter)}>
          <label>Search contacts</label>
          <input
            className={clsx(css.filterInput)}
            onChange={this.changeInput}
            type="text"
            name="name"
            required
          />
        </div>
      </>
    );
  }
}

Filter.propTypes = {
  input: PropTypes.string,
};
