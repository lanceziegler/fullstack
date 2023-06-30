import axios from 'axios';
const baseUrl = 'http://localhost:3001/notes';

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = (newObject) => {
  const request = axios.post(baseUrl, newObject);
  return request.then((response) => response.data);
};

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject);
  return request.then((response) => response.data);
};

// In ES6, you can just do:
/*
export default {
getAll,create,update,
}; 
*/

// The below makes it so you can customize the exported func names
export default {
  getAll: getAll,
  create: create,
  update: update,
};
