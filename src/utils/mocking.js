const bcrypt = require('bcrypt');
const faker = require('faker');
const mongoose = require('mongoose');

const PASSWORD_PLAIN = 'coder123';
const ROLES = ['user', 'admin'];

const hashPassword = async () => {
  return await bcrypt.hash(PASSWORD_PLAIN, 10);
};

/**
 * Genera usuarios mock según la cantidad indicada.
 * Cada usuario tiene password encriptada (coder123), role user/admin y pets [].
 * El formato de salida simula el de un documento de Mongo (con _id, timestamps).
 */
const generateMockUsers = async (quantity) => {
  const hashedPassword = await hashPassword();
  const users = [];
  const usedEmails = new Set();

  for (let i = 0; i < quantity; i++) {
    let email = faker.internet.email().toLowerCase();
    while (usedEmails.has(email)) {
      email = faker.internet.email().toLowerCase();
    }
    usedEmails.add(email);

    const doc = {
      _id: new mongoose.Types.ObjectId(),
      first_name: faker.name.firstName(),
      last_name: faker.name.lastName(),
      email,
      age: faker.datatype.number({ min: 18, max: 80 }),
      password: hashedPassword,
      role: ROLES[faker.datatype.number({ min: 0, max: 1 })],
      pets: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    users.push(doc);
  }

  return users;
};

/**
 * Genera mascotas mock según la cantidad indicada.
 */
const generateMockPets = (quantity) => {
  const species = ['perro', 'gato', 'conejo', 'hamster', 'ave'];
  const pets = [];

  for (let i = 0; i < quantity; i++) {
    pets.push({
      name: faker.name.firstName(),
      species: species[faker.datatype.number({ min: 0, max: species.length - 1 })],
      age: faker.datatype.number({ min: 0, max: 15 }),
      adopted: faker.datatype.boolean(),
    });
  }

  return pets;
};

module.exports = {
  generateMockUsers,
  generateMockPets,
};
