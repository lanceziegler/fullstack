const express = require('express');
const app = express();
const morgan = require('morgan');

app.use(express.json());
app.use(morgan('tiny'));

// Not outputting to console
// // Custom token to log request body for POST requests
// morgan.token('post-data', (req) => {
//   if (req.method === 'POST') {
//     return JSON.stringify(req.body);
//   }
//   return '';
// });

// // Using 'combined' format along with the custom token to log both standard and request body information
// app.use(
//   morgan('combined', {
//     skip: (req, res) => res.statusCode < 400,
//     stream: process.stdout,
//   })
// );
// /Not outputting to console

let persons = [
  {
    id: 1,
    name: 'Arto Hellas',
    number: '040-123456',
  },
  {
    id: 2,
    name: 'Ada Lovelace',
    number: '39-44-5323523',
  },
  {
    id: 3,
    name: 'Dan Abramov',
    number: '12-43-234345',
  },
  {
    id: 4,
    name: 'Mary Poppendieck',
    number: '39-23-6423122',
  },
];

//*****************************************! Requests
//*** Get Requests */
app.get('/', (request, response) => {
  response.send('<h1>Phonebook</h1>');
});

app.get('/info', (request, response) => {
  const date = new Date();
  const dateString = date.toString();
  response.send(
    `<p>Phonebook has info for ${persons.length} people</p><p>${dateString}</p>`
  );
});

app.get('/api/persons', (request, response) => {
  response.json(persons);
});

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find((person) => person.id === id);
  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});
//***  Post request */
// used to generate an id based on the highest existing ID
const generateId = () => {
  const maxId = persons.length > 0 ? Math.max(...persons.map((p) => p.id)) : 0;
  return maxId + 1;
};

app.post('/api/persons', (request, response) => {
  const body = request.body;

  // Check if name or number missing, return error
  if (!body.name || !body.number) {
    return response.status(400).json({
      error: 'name or number missing',
    });
  }

  const person = {
    id: generateId(),
    name: body.name,
    number: body.number,
  };

  persons = persons.concat(person);

  response.json(person);
});

//***  Delete request */
app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter((person) => person.id !== id);

  response.status(204).end();
});

//*****************************************! /Requests

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
