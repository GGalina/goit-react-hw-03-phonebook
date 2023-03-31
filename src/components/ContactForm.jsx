import { Component } from 'react';
import { FormContainer, FormTitle, Input, Button } from './Phonebook.styled';

export class ContactForm extends Component {
    state = {
        name: '',
        number: '',
    };

    handleChange = event => {
        const { name, value } = event.currentTarget;
        this.setState({ [name]: value });
    };

    render() {
        return (
            <FormContainer>
                <form onSubmit={this.props.handleAddItem}>
                    <FormTitle>Name</FormTitle>
                    <Input
                        onChange={this.handleChange}
                        type="text"
                        name="name"
                        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                        required
                    />

                    <FormTitle>Number</FormTitle>
                    <Input
                        onChange={this.handleChange}
                        type="tel"
                        name="number"
                        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                        required
                    />

                    <Button type="submit">Add contact</Button>
                </form>
            </FormContainer>
        );
    }
};