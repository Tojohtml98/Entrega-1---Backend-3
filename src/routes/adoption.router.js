const { Router } = require('express');
const User = require('../models/User');
const Pet = require('../models/Pet');

const router = Router();

router.post('/:uid/:pid', async (req, res, next) => {
  try {
    const { uid, pid } = req.params;

    const user = await User.findById(uid);
    if (!user) {
      return res.status(404).json({ status: 'error', message: 'Usuario no encontrado' });
    }

    const pet = await Pet.findById(pid);
    if (!pet) {
      return res.status(404).json({ status: 'error', message: 'Mascota no encontrada' });
    }

    if (pet.adopted) {
      return res.status(400).json({ status: 'error', message: 'La mascota ya está adoptada' });
    }

    pet.adopted = true;
    await pet.save();

    if (!user.pets.find(p => p.toString() === pet._id.toString())) {
      user.pets.push(pet._id);
      await user.save();
    }

    return res.json({
      status: 'ok',
      message: 'Adopción registrada',
      payload: {
        userId: user._id.toString(),
        petId: pet._id.toString(),
      },
    });
  } catch (err) {
    next(err);
  }
});

router.get('/:uid', async (req, res, next) => {
  try {
    const { uid } = req.params;
    const user = await User.findById(uid).populate('pets').lean();

    if (!user) {
      return res.status(404).json({ status: 'error', message: 'Usuario no encontrado' });
    }

    return res.json({
      status: 'ok',
      payload: user,
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;

