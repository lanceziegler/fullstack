import React from 'react';
import { useState, useEffect } from 'react';
import Note from './Note';
import axios from 'axios';
import noteService from '../services/notes';

const App = (props) => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [showAll, setShowAll] = useState(true);

  // useEffect(() => {
  //   console.log('effect');
  //   axios.get('http://localhost:3001/notes').then((response) => {
  //     console.log('promise fulfilled');
  //     setNotes(response.data);
  //   });
  // }, []);
  // console.log('render', notes.length, 'notes');
  //TODO Change?
  useEffect(() => {
    noteService.getAll().then((initialNotes) => {
      setNotes(initialNotes);
    });
  }, []);

  const toggleImportanceOf = (id) => {
    // console.log('importance of ' + id + ' needs to be toggled');
    const url = `http://localhost:3001/notes/${id}`;
    const note = notes.find((n) => n.id === id);
    const changedNote = { ...note, important: !note.important };

    // axios.put(url, changedNote).then((response) => {
    //   setNotes(notes.map((n) => (n.id !== id ? n : response.data)));
    // });
    noteService.update(id, changedNote).then((returnedNote) => {
      setNotes(
        notes
          .map((note) => (note.id !== id ? note : returnedNote))
          .catch((error) => {
            alert(`the note '${note.content}' was already deleted from server`);
            setNotes(notes.filter((n) => n.id !== id));
          })
      );
    });
  };

  const addNote = (event) => {
    event.preventDefault();
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
      // id: notes.length + 1,
    };

    // axios.post('http://localhost:3001/notes', noteObject).then((response) => {
    //   console.log(response);
    //   setNotes(notes.concat(noteObject));
    //   setNewNote('');
    // });
    noteService.create(noteObject).then((returnedNote) => {
      setNotes(notes.concat(returnedNote));
      setNewNote('');
    });
  };

  const handleNoteChange = (event) => {
    console.log(event.target.value);
    setNewNote(event.target.value);
  };

  const notesToShow = showAll
    ? notes
    : notes.filter((note) => note.important === true);

  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {notesToShow.map((note) => (
          <Note
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}
          />
        ))}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange} />
        <button type='submit'>save</button>
      </form>
    </div>
  );
};

export default App;
