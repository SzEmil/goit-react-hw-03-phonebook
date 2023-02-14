import React from 'react';
import { Component } from 'react';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
const INITIAL_STATE = {
  contacts: [
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ],
  name: '',
  number: '',
  filter: '',
};
export class App extends Component {
  state = {
    ...INITIAL_STATE,
  };
  static defaultProps = {};

  addContact = values => {
    console.log(values);
    const { contacts } = this.state;
    const existingContact = contacts.find(
      contact => contact.name === values.name
    );
    if (existingContact) {
      alert(`${values.name} already in contacts!`);
      return;
    }

    this.setState(prevState => {
      return {
        contacts: [...prevState.contacts, values],
        name: values.name,
        number: values.number,
      };
    });
  };

  showInput = userInput => {
    console.log(userInput);
    this.setState({
      filter: userInput,
    });
  };
  deleteUser = readElement => {
    const { contacts } = this.state;
    let tabs = [...contacts];
    const findID = tabs.find(contact => contact.id === readElement.id);
    const indexOfID = tabs.findIndex(contact => contact === findID);
    tabs.splice(indexOfID, 1);

    this.setState({ contacts: [...tabs] });
  };
  componentDidMount() {
    const listOfContacts = window.localStorage.getItem('ContactLocalList');
    if (!listOfContacts) return;
    try {
      const parsedListOfContacts = JSON.parse(listOfContacts);
      this.setState({ contacts: parsedListOfContacts });
    } catch (error) {
      console.error(error);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts.length !== this.state.contacts.length) {
      const newContactLocalStorage = JSON.stringify(this.state.contacts);
      window.localStorage.setItem('ContactLocalList', newContactLocalStorage);
    }
  }

  render() {
    return (
      <>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={this.addContact} />
        <h2>Contacts</h2>
        <Filter onChange={this.showInput} />
        <ContactList
          contactTab={this.state.contacts}
          search={this.state.filter}
          onClick={this.deleteUser}
        />
      </>
    );
  }
}
