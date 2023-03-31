import { Component } from 'react';
import { nanoid } from 'nanoid';
import PropTypes from "prop-types";
import { ContactForm } from './ContactForm';
import { ContactList } from './ContactList';
import { Filter } from './Filter';
import { Container, Title, SubTitle } from './Phonebook.styled';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const contactsStored = JSON.parse(localStorage.getItem('contacts'));
    if (contactsStored) {
      this.setState({ contacts: contactsStored });
    }
  };

  componentDidUpdate(prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  };

  handleAddItem = event => {
    event.preventDefault();
    const newName = event.target[0].value;
    const newNumber = event.target[1].value;
    this.state.contacts.find(
      ({ name }) => name.toLowerCase() === newName.toLowerCase()
    )
      ? alert(`${newName} is already in contacts`)
      : this.setState(prevState => ({
        contacts: [
          {
            name: newName,
            number: newNumber,
            id: nanoid()
          },
          ...prevState.contacts],
        }));
  };

  handleFilter = event => {
    this.setState({ filter: event.currentTarget.value });
  };

  showFiltredContacts = () => {
    const { filter, contacts } = this.state;
    const result = contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase()));
    return result;
  };

  handleDelete = key => {
    this.setState(prevState => {
      return {
        contacts: prevState.contacts.filter(contact => contact.id !== key),
      };
    });
  };

  render() {
    const { filter } = this.state;
    return (
      <Container>
        <Title>Phonebook</Title>
        <ContactForm handleAddItem={this.handleAddItem} />

        <SubTitle>Contacts</SubTitle>
        <Filter onFilter={this.handleFilter} filter={filter} />

        <ContactList
          contacts={this.showFiltredContacts()}
          onDelete={this.handleDelete}
        />
      </Container>
    );
  }
};

App.propTypes = {
  contact: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
  filter: PropTypes.string,
};