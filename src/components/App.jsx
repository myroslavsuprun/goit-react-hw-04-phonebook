import React, { useState, useEffect } from 'react';

import AddContactForm from './AddContactForm/AddContactForm';
import Section from './Section/Section';
import ContactsList from './ContactsList/ContactsList';
import ContactsFilter from './ContactsFilter/ContactsFilter';
import { useCallback } from 'react';

const CONTACTS_STATUS_TYPE = Object.freeze({
  contacts: 'contacts',
  filtered: 'filtered',
});

function App() {
  const [contacts, setContacts] = useState(
    JSON.parse(localStorage.getItem('contacts')) || []
  );
  const [filteredContacts, setFilteredCotnacts] = useState([]);
  const [contactsStatus, setContactsStatus] = useState(
    CONTACTS_STATUS_TYPE.contacts
  );
  const [previousSearchQuery, setPreviousSearchQuery] = useState('');

  const filterContactsBySearchMemo = useCallback(filterContactsBySearch, [
    contacts,
    previousSearchQuery,
  ]);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));

    if (contactsStatus === CONTACTS_STATUS_TYPE.filtered) {
      filterContactsBySearchMemo();
    }
  }, [contacts, contactsStatus, filterContactsBySearchMemo]);

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

  function filterContactsBySearch(searchQuery = previousSearchQuery) {
    const newFilteredContacts = contacts.filter(contact => {
      const contactName = contact.name.toLowerCase();
      return contactName.includes(searchQuery.toLowerCase());
    });

    setPreviousSearchQuery(searchQuery);

    if (searchQuery === '') {
      setContactsStatus(CONTACTS_STATUS_TYPE.contacts);
      return;
    }

    setContactsStatus(CONTACTS_STATUS_TYPE.filtered);
    setFilteredCotnacts(newFilteredContacts);
  }

  function onContactDelete(contactName) {
    const newContacts = contacts.filter(contact => {
      if (contactName === contact.name) return false;

      return true;
    });

    setContacts(newContacts);
  }

  function contactsToPass() {
    if (contactsStatus === CONTACTS_STATUS_TYPE.filtered) {
      return filteredContacts;
    }

    return contacts;
  }

  return (
    <>
      <Section title="Phonebook">
        <AddContactForm onSubmit={onContactAddition} />
      </Section>
      <Section title="Contacts">
        <ContactsFilter filterContactsBySearch={filterContactsBySearch} />
        <ContactsList
          onDeleteClick={onContactDelete}
          contacts={contactsToPass()}
        />
      </Section>
    </>
  );
}

export default App;
