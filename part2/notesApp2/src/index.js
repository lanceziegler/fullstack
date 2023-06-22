import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import axios from 'axios';

axios.get('http://localhost:3001/notes').then((res) => {
  const notes = res.data;
  console.log(notes);
  ReactDOM.render(<App notes={notes} />, document.getElementById('root'));
});
// ReactDOM.createRoot(document.getElementById('root')).render(<App />);

// const notes = [
//   {
//     id: 1,
//     content: 'HTML is easy',
//     important: true,
//   },
//   {
//     id: 2,
//     content: 'Browser can execute only JavaScript',
//     important: false,
//   },
//   {
//     id: 3,
//     content: 'GET and POST are the most important methods of HTTP protocol',
//     important: true,
//   },
// ];
