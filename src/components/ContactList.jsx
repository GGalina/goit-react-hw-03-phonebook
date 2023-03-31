import { Component } from 'react';
import { ListItem, DeleteBtn, List } from './Phonebook.styled';

export class ContactList extends Component {
    render() {
        return (
        <List>
            {this.props.contacts.map(({ id, name, number }) => (
            <ListItem key={id}>
                    {name}: {number}
                <DeleteBtn
                    type="button"
                    onClick={() => this.props.onDelete(id)}
                >
                    Delete
                </DeleteBtn>
            </ListItem>
            ))}
        </List>
        );
    }
};