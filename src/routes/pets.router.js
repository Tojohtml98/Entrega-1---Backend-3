const { Router } = require('express');
const petService = require('../services/pet.service');

const router = Router();

router.get('/', async (req, res, next) => {
  try {
    const pets = await petService.findAll();
    res.json({ status: 'ok', payload: pets });
  } catch (err) {
    next(err);
  }
});

router.get('/:pid', async (req, res, next) => {
  try {
    const pet = await petService.findById(req.params.pid);
    if (!pet) return res.status(404).json({ status: 'error', message: 'Mascota no encontrada' });
    res.json({ status: 'ok', payload: pet });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
