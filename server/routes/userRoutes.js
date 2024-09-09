const express = require('express');
const router = express.Router();
const { userValidationRules, validate } = require('../validators/userValidator');
const { createUser, getUser, updateUser, deleteUser, createUserSql, updateUserSql } = require('../controllers/userController');

// Crear un usuario
router.post('/create', userValidationRules(), validate, createUser);
// router.post('/createSql', userValidationRules(), validate, createUser);

// Obtener un usuario por ID
router.get('/:id', getUser);

// Actualizar un usuario por ID
router.put('/:id', userValidationRules(), validate, updateUser);
router.put('/sql/:id', userValidationRules(), validate, updateUserSql);

// Eliminar un usuario por ID
router.delete('/:id', deleteUser);

module.exports = router;
