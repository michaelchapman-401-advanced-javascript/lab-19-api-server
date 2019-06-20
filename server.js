'use strict';

require('dotenv').config();

const express = require('express');
const Q = require('@nmq/q/client');

const app = express();

app.use(express.json());

app.get('/database', (res) => {
  let data = {
    name: 'read',
    message: 'This is a get reaquest to database',
  };

  Q.publish('database', 'read', JSON.stringify(data));
  res.send('get');
});

app.post('/database', (res) => {
  let data = {
    name: 'create',
    message: 'This is a post reaquest to database',
  };

  Q.publish('database', 'create', JSON.stringify(data));
  res.send('post');
});

app.put('/database', (res) => {
  let data = {
    name: 'update',
    message: 'This is a put reaquest to database',
  };

  Q.publish('database', 'update', JSON.stringify(data));
  res.send('put');
});

app.delete('/database', (res) => {
  let data = {
    name: 'delete',
    message: 'This is a delete reaquest to database',
  };

  Q.publish('database', 'delete', JSON.stringify(data));
  res.send('delete');
});

app.use((res) => {
  let data = {
    name: 'error',
    message: 'This is an error from the server',
  };
  Q.publish('database', 'error', JSON.stringify(data));
  res.send('error');
});

module.exports = {
  server: app,
  start: port => {
    let PORT = port || process.env.PORT || 3002;
    app.listen(PORT, () => console.log(`Listening on ${PORT}`));
  },
};
