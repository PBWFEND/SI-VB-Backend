// routes/laboratoriumRoutes.js
const express = require('express');
const controller = require('../controllers/laboratoriumController');
const {
  validateCreate, validateUpdate, validatePatch, validateId, validateQuery
} = require('../validators/laboratoriumValidator');

const router = express.Router();

// Collection
router.get('/',    validateQuery,  controller.getAll);
router.post('/',   validateCreate, controller.create);

// Detail / sub-resource
router.get('/:id',    validateId,                        controller.getById);
router.put('/:id',    validateId, validateUpdate,        controller.update);
router.patch('/:id',  validateId, validatePatch,         controller.patch);
router.delete('/:id', validateId,                        controller.remove);

module.exports = router;