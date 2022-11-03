import React, { useState, useEffect } from 'react';

import AddContactForm from './AddContactForm/AddContactForm';
import Section from './Section/Section';
import ContactsList from './ContactsList/ContactsList';
import ContactsFilter from './ContactsFilter/ContactsFilter';

function App() {
  const [contacts, setContacts] = useState(
    JSON.parse(localStorage.getItem('contacts')) || []
  );
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  function onContactAddition(contact) {
    const foundContact = contacts.find(contactFromState => {
      const currentContact = contactFromState.name.toLowerCase();
      return currentContact === contact.name.toLowerCase();
    });

    if (foundContact) {
      return alert(`${contact.name} is already in contacts`);
    }

    setContacts([...contacts, contact]);
  }

  function onFilterChange(newSearchQuery) {
    setSearchQuery(newSearchQuery);
  }

  function onContactDelete(contactName) {
    const newContacts = contacts.filter(contact => {
      if (contactName === contact.name) return false;

      return true;
    });

    setContacts(newContacts);
  }

  function getFilteredContacts() {
    return contacts.filter(contact => {
      const contactName = contact.name.toLowerCase();
      return contactName.includes(searchQuery.toLowerCase());
    });
  }

  const filteredContacts = getFilteredContacts();

  return (
    <>
      <Section title="Phonebook">
        <AddContactForm onSubmit={onContactAddition} />
      </Section>
      <Section title="Contacts">
        <ContactsFilter onFilterChange={onFilterChange} />
        <ContactsList
          onDeleteClick={onContactDelete}
          contacts={filteredContacts}
        />
      </Section>
    </>
  );
}

export default App;
