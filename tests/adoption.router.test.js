const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../src/app');
const User = require('../src/models/User');
const Pet = require('../src/models/Pet');

const TEST_DB_URI = process.env.MONGODB_URI_TEST || 'mongodb://localhost:27017/entrega1_test';

const dbAvailable = () =>
  mongoose
    .connect(TEST_DB_URI, { serverSelectionTimeoutMS: 1000 })
    .then(() => true)
    .catch(() => false);

beforeAll(async () => {
  if (!(await dbAvailable())) {
    console.warn('MongoDB no está disponible; las pruebas de adopción se omiten.');
  }
});

beforeEach(async () => {
  if (mongoose.connection.readyState !== 1) {
    return;
  }
  await User.deleteMany({});
  await Pet.deleteMany({});
});

afterAll(async () => {
  if (mongoose.connection.readyState === 1) {
    await mongoose.connection.close();
  }
});

describe('Adoption router', () => {
  test('POST /api/adoption/:uid/:pid registra una adopción correctamente', async () => {
    if (mongoose.connection.readyState !== 1) {
      return;
    }

    const user = await User.create({
      first_name: 'Test',
      last_name: 'User',
      email: 'test@example.com',
      age: 25,
      password: 'hashed',
    });

    const pet = await Pet.create({
      name: 'Firulais',
      species: 'perro',
      age: 3,
      adopted: false,
    });

    const res = await request(app)
      .post(`/api/adoption/${user._id}/${pet._id}`)
      .expect(200);

    expect(res.body.status).toBe('ok');
    expect(res.body.message).toBe('Adopción registrada');
    expect(res.body.payload.userId).toBe(user._id.toString());
    expect(res.body.payload.petId).toBe(pet._id.toString());

    const updatedPet = await Pet.findById(pet._id).lean();
    const updatedUser = await User.findById(user._id).lean();

    expect(updatedPet.adopted).toBe(true);
    expect(updatedUser.pets.map(p => p.toString())).toContain(pet._id.toString());
  });

  test('POST /api/adoption/:uid/:pid devuelve 404 si el usuario no existe', async () => {
    if (mongoose.connection.readyState !== 1) {
      return;
    }

    const pet = await Pet.create({
      name: 'Mishi',
      species: 'gato',
      age: 2,
      adopted: false,
    });

    const fakeUserId = new mongoose.Types.ObjectId();

    const res = await request(app)
      .post(`/api/adoption/${fakeUserId}/${pet._id}`)
      .expect(404);

    expect(res.body.status).toBe('error');
    expect(res.body.message).toBe('Usuario no encontrado');
  });

  test('POST /api/adoption/:uid/:pid devuelve 404 si la mascota no existe', async () => {
    if (mongoose.connection.readyState !== 1) {
      return;
    }

    const user = await User.create({
      first_name: 'Test',
      last_name: 'User',
      email: 'test2@example.com',
      age: 30,
      password: 'hashed',
    });

    const fakePetId = new mongoose.Types.ObjectId();

    const res = await request(app)
      .post(`/api/adoption/${user._id}/${fakePetId}`)
      .expect(404);

    expect(res.body.status).toBe('error');
    expect(res.body.message).toBe('Mascota no encontrada');
  });

  test('POST /api/adoption/:uid/:pid devuelve 400 si la mascota ya está adoptada', async () => {
    if (mongoose.connection.readyState !== 1) {
      return;
    }

    const user = await User.create({
      first_name: 'Test',
      last_name: 'User',
      email: 'test3@example.com',
      age: 28,
      password: 'hashed',
    });

    const pet = await Pet.create({
      name: 'Lola',
      species: 'perro',
      age: 4,
      adopted: true,
    });

    const res = await request(app)
      .post(`/api/adoption/${user._id}/${pet._id}`)
      .expect(400);

    expect(res.body.status).toBe('error');
    expect(res.body.message).toBe('La mascota ya está adoptada');
  });

  test('GET /api/adoption/:uid devuelve usuario con sus mascotas', async () => {
    if (mongoose.connection.readyState !== 1) {
      return;
    }

    const pet1 = await Pet.create({
      name: 'Rocky',
      species: 'perro',
      age: 1,
      adopted: true,
    });
    const pet2 = await Pet.create({
      name: 'Nina',
      species: 'gato',
      age: 2,
      adopted: true,
    });

    const user = await User.create({
      first_name: 'Adoptante',
      last_name: 'Test',
      email: 'adopt@example.com',
      age: 35,
      password: 'hashed',
      pets: [pet1._id, pet2._id],
    });

    const res = await request(app)
      .get(`/api/adoption/${user._id}`)
      .expect(200);

    expect(res.body.status).toBe('ok');
    expect(res.body.payload.id).toBe(user._id.toString());
    expect(Array.isArray(res.body.payload.pets)).toBe(true);
    expect(res.body.payload.pets.length).toBe(2);
  });

  test('GET /api/adoption/:uid devuelve 404 si el usuario no existe', async () => {
    if (mongoose.connection.readyState !== 1) {
      return;
    }

    const fakeUserId = new mongoose.Types.ObjectId();

    const res = await request(app)
      .get(`/api/adoption/${fakeUserId}`)
      .expect(404);

    expect(res.body.status).toBe('error');
    expect(res.body.message).toBe('Usuario no encontrado');
  });
});

