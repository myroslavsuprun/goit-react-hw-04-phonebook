import React from 'react';
import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';

import { FormLabel, FormInput } from './ContactsFilter.styled';

const filterInputId = nanoid();

const ContactsFilter = ({ filterContactsBySearch, filter }) => {
  const handleChange = e => {
    let currentValue = e.target.value;
    filterContactsBySearch(currentValue);
  };

  return (
    <FormLabel key={filterInputId}>
      Find contacts by name
      <FormInput
        value={filter}
        type="text"
        name="filter"
        id={filterInputId}
        onChange={handleChange}
      />
    </FormLabel>
  );
};

ContactsFilter.propTypes = {
  filterContactsBySearch: PropTypes.func.isRequired,
  filter: PropTypes.array,
};

export default ContactsFilter;
