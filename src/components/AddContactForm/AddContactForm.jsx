import React, { useState } from 'react';
import { nanoid } from 'nanoid';

import PropTypes from 'prop-types';

import {
  AddContactWrapper,
  Form,
  FormLabel,
  FormInput,
  FormButtonSubmit,
} from './AddContactFrom.styled';

const INITIAL_STATE = {
  name: '',
  number: '',
};
const nameInputId = nanoid();
const numberInputId = nanoid();

function AddContactForm({ onSubmit }) {
  const [name, setName] = useState(INITIAL_STATE.name);
  const [number, setNumber] = useState(INITIAL_STATE.number);

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit({ name, number });
    reset();
  };

  const handleChange = e => {
    const { name: targetName, value: targetValue } = e.target;

    switch (targetName) {
      case 'name':
        setName(targetValue);
        break;
      case 'number':
        setNumber(targetValue);
        break;
      default:
        return;
    }
  };

  const reset = () => {
    setName(INITIAL_STATE.name);
    setNumber(INITIAL_STATE.number);
  };

  return (
    <AddContactWrapper>
      <Form onSubmit={handleSubmit}>
        <FormLabel htmlFor={nameInputId}>
          Name
          <FormInput
            type="text"
            name="name"
            placeholder="Enter name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            id={nameInputId}
            value={name}
            onChange={handleChange}
          />
        </FormLabel>
        <FormLabel htmlFor={numberInputId}>
          Number
          <FormInput
            type="tel"
            name="number"
            placeholder="Enter phone number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            id={numberInputId}
            value={number}
            onChange={handleChange}
          />
        </FormLabel>
        <FormButtonSubmit>Add {name}</FormButtonSubmit>
      </Form>
    </AddContactWrapper>
  );
}

AddContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default AddContactForm;
