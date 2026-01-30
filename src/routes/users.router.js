const { Router } = require('express');
const userService = require('../services/user.service');

const router = Router();

router.get('/', async (req, res, next) => {
  try {
    const users = await userService.findAll();
    res.json({ status: 'ok', payload: users });
  } catch (err) {
    next(err);
  }
});

router.get('/:uid', async (req, res, next) => {
  try {
    const user = await userService.findById(req.params.uid);
    if (!user) return res.status(404).json({ status: 'error', message: 'Usuario no encontrado' });
    res.json({ status: 'ok', payload: user });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
