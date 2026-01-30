const express = require('express');
const usersRouter = require('./routes/users.router');
const petsRouter = require('./routes/pets.router');
const mocksRouter = require('./routes/mocks.router');

const app = express();

app.use(express.json());

app.use('/api/users', usersRouter);
app.use('/api/pets', petsRouter);
app.use('/api/mocks', mocksRouter);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: err.message });
});

module.exports = app;
