const { Router } = require('express');
const { generateMockUsers, generateMockPets } = require('../utils/mocking');
const userService = require('../services/user.service');
const petService = require('../services/pet.service');
const mongoose = require('mongoose');

const router = Router();

const MOCKING_USERS_COUNT = 50;

// Endpoint migrado del primer desafío: devuelve mascotas mock (sin guardar en BD)
router.get('/mockingpets', (req, res) => {
  const quantity = Math.min(parseInt(req.query.quantity, 10) || 20, 100);
  const pets = generateMockPets(quantity).map((p, i) => ({
    _id: new mongoose.Types.ObjectId(),
    ...p,
    createdAt: new Date(),
    updatedAt: new Date(),
  }));
  res.json({ status: 'ok', payload: pets });
});

// Genera 50 usuarios con formato Mongo (password coder123 encriptada, role user/admin, pets [])
router.get('/mockingusers', async (req, res, next) => {
  try {
    const users = await generateMockUsers(MOCKING_USERS_COUNT);
    res.json({ status: 'ok', payload: users });
  } catch (err) {
    next(err);
  }
});

// Genera e inserta en BD la cantidad de users y pets indicada
router.post('/generateData', async (req, res, next) => {
  try {
    const usersCount = Math.max(0, parseInt(req.body.users, 10) || 0);
    const petsCount = Math.max(0, parseInt(req.body.pets, 10) || 0);

    const inserted = { users: [], pets: [] };

    if (usersCount > 0) {
      const usersToInsert = await generateMockUsers(usersCount);
      const plainUsers = usersToInsert.map(({ _id, createdAt, updatedAt, ...rest }) => rest);
      const created = await userService.createMany(plainUsers);
      inserted.users = created.map(u => u._id);
    }

    if (petsCount > 0) {
      const petsToInsert = generateMockPets(petsCount);
      const created = await petService.createMany(petsToInsert);
      inserted.pets = created.map(p => p._id);
    }

    res.status(201).json({
      status: 'ok',
      message: 'Datos generados e insertados',
      inserted: {
        users: inserted.users.length,
        pets: inserted.pets.length,
      },
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
