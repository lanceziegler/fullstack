import React from 'react';
import { useState } from 'react';

//comment
const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '959-343-2342' },
    { name: 'Lance Ziegler', number: '858-449-8753' },
  ]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');

  const addPerson = (e) => {
    e.preventDefault();

    const nameExists = persons.some((person) => person.name === newName);

    if (nameExists) {
      alert(`${newName} is already in the phonebook!`);
    } else {
      const personObject = { name: newName, number: newNumber };
      setPersons(persons.concat(personObject));
    }

    setNewName('');
    setNewNumber('');
  };

  const handlePersonChange = (e) => {
    console.log(e.target.value);
    setNewName(e.target.value);
  };

  const handleNumberChange = (e) => {
    console.log(e.target.value);
    setNewNumber(e.target.value);
  };

  return (
    <div>
      <div>debug: {newName}</div>
      <h2>Phonebook</h2>
      Search: <input></input>
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
      {persons.map((person) => (
        <div key={person.name}>
          {person.name} {person.number}
        </div>
      ))}
    </div>
  );
};

export default App;
