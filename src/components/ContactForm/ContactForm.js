import React from 'react';
import { Component } from 'react';
import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import css from './ContactForm.module.css';
export class ContactForm extends Component {
  addNewContact = event => {
    event.preventDefault();
    const form = event.currentTarget;
    const inputValue = form.name.value;
    const inputValuePhone = form.number.value;
    let dataObj = {
      id: nanoid(),
      name: inputValue,
      number: inputValuePhone,
    };
    this.props.onSubmit(dataObj);

    form.reset();
  };
  render() {
    return (
      <>
        <form onSubmit={this.addNewContact} className={clsx(css.contactForm)}>
          <label className={clsx(css.labelForm)}>
            Name
            <input
              className={clsx(css.inputContact)}
              type="text"
              name="name"
              pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
              title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
              required
            />
          </label>
          <label className={clsx(css.labelForm)}>
            Number
            <input
              className={clsx(css.inputContact)}
              type="tel"
              name="number"
              pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
              title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
              required
            />
          </label>
          <button className={clsx(css.buttonForm)}>Add contact</button>
        </form>
      </>
    );
  }
}
ContactForm.propTypes = {
  dataObj: PropTypes.objectOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      number: PropTypes.string,
    })
  ),
};
