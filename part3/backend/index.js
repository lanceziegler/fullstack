const express = require('express');
const app = express();

app.use(express.json());

let notes = [
  {
    id: 1,
    content: 'This better work',
    important: true,
  },
  {
    id: 2,
    content: 'Please work',
    important: false,
  },
  {
    id: 3,
    content: 'Work work work',
    important: true,
  },
  {
    id: 4,
    content: 'You are a dumbass',
    important: true,
  },
];

app.get('/', (request, response) => {
  response.send('<h1>Hello World</h1>');
});

app.get('/api/notes', (request, response) => {
  response.json(notes);
});

app.get('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id);
  const note = notes.find((note) => note.id === id);
  if (note) {
    response.json(note);
  } else {
    response.status(404).end();
  }
});

app.post('/api/notes', (request, response) => {
  const note = request.body;
  console.log(note);
  response.json(note);
});

app.delete('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id);
  notes = notes.filter((note) => note.id !== id);

  response.status(204).end();
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
