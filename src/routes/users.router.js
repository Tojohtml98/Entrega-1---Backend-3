const { Router } = require('express');
const userService = require('../services/user.service');

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: ID del usuario
 *         first_name:
 *           type: string
 *         last_name:
 *           type: string
 *         email:
 *           type: string
 *         age:
 *           type: integer
 *         role:
 *           type: string
 *           enum: [user, admin]
 *         pets:
 *           type: array
 *           items:
 *             type: string
 *       example:
 *         id: "64f0c2b9e4b0f8c1a2b3c4d5"
 *         first_name: "Juan"
 *         last_name: "Pérez"
 *         email: "juan.perez@example.com"
 *         age: 30
 *         role: "user"
 *         pets: []
 */

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Obtener todos los usuarios
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *         description: Lista de usuarios
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: ok
 *                 payload:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/User'
 */
router.get('/', async (req, res, next) => {
  try {
    const users = await userService.findAll();
    res.json({ status: 'ok', payload: users });
  } catch (err) {
    next(err);
  }
});

/**
 * @swagger
 * /api/users/{uid}:
 *   get:
 *     summary: Obtener un usuario por ID
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Usuario encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: ok
 *                 payload:
 *                   $ref: '#/components/schemas/User'
 *       404:
 *         description: Usuario no encontrado
 */
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
