import React, { useState, useEffect } from 'react';

import AddContactForm from './AddContactForm/AddContactForm';
import Section from './Section/Section';
import ContactsList from './ContactsList/ContactsList';
import ContactsFilter from './ContactsFilter/ContactsFilter';

let previousFilterQuery = '';

function App() {
  const [contacts, setContacts] = useState(null);
  const [filteredContacts, setFilteredCotnacts] = useState(null);

  useEffect(() => {
    setContacts(JSON.parse(localStorage.getItem('contacts')) || []);
  }, []);

  useEffect(() => {
    if (!contacts) return;

    localStorage.setItem('contacts', JSON.stringify(contacts));

    filterContactsBySearch(previousFilterQuery);
  }, [contacts]);

  function onSubmit(contact) {
    const foundContact = contacts.find(contactFromState => {
      const currentContact = contactFromState.name.toLowerCase();
      return currentContact === contact.name.toLowerCase();
    });

    if (foundContact) return alert(`${contact.name} is already in contacts`);

    setContacts([...contacts, contact]);
  }

  function filterContactsBySearch(filterQuery) {
    const newFilteredContacts = contacts.filter(contact => {
      const contactName = contact.name.toLowerCase();
      return contactName.includes(filterQuery.toLowerCase());
    });

    setFilteredCotnacts(newFilteredContacts);
    previousFilterQuery = filterQuery;
  }

  function contactsToPass() {
    if (filteredContacts) return filteredContacts;

    return contacts ? contacts : [];
  }

  function onContactDelete(contactName) {
    const newContacts = contacts.filter(contact => {
      if (contactName === contact.name) return false;

      return true;
    });

    setContacts(newContacts);
  }

  return (
    <>
      <Section title="Phonebook">
        <AddContactForm onSubmit={onSubmit} />
      </Section>
      <Section title="Contacts">
        <ContactsFilter filterContactsBySearch={filterContactsBySearch} />
        <ContactsList
          contacts={contactsToPass()}
          onDeleteClick={onContactDelete}
        />
      </Section>
    </>
  );
}

export default App;
