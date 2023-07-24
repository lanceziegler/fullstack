import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import personService from '../services/persons';

const App = () => {
  // const [persons, setPersons] = useState([
  //   { name: 'Arto Hellas', number: '959-343-2342' },
  //   { name: 'Lance Ziegler', number: '858-449-8753' },
  // ]);
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // axios.get('http://localhost:3001/persons').then((response) => {
    //   console.log('promise fulfilled');
    //   setPersons(response.data);
    // });
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);
  console.log('render', persons.length, 'notes');

  const addPerson = (e) => {
    e.preventDefault();

    const nameExists = persons.some((person) => person.name === newName);
    const personObject = { name: newName, number: newNumber };
    if (nameExists) {
      alert(`${newName} is already in the phonebook!`);
    } else {
      setPersons(persons.concat(personObject));
    }

    personService.create(personObject).then((returnedPerson) => {
      setPersons(persons.concat(returnedPerson));
      setNewName('');
      setNewNumber('');
    });
    // setNewName('');
    // setNewNumber('');
  };

  const handlePersonChange = (e) => {
    console.log(e.target.value);
    setNewName(e.target.value);
  };

  const handleNumberChange = (e) => {
    console.log(e.target.value);
    setNewNumber(e.target.value);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div>debug: {newName}</div>
      <h2>Phonebook</h2>
      Search: <input value={searchTerm} onChange={handleSearch}></input>
      <h2>Add New Contact</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handlePersonChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type='submit'>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {filteredPersons.map((person) => (
        <div key={person.name}>
          {person.name} {person.number}
        </div>
      ))}
    </div>
  );
};

export default App;
