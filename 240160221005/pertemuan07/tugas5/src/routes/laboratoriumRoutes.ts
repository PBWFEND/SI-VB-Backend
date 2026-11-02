import { Router } from 'express';
import * as controller from '../controllers/laboratoriumController';
import {
  validateCreate,
  validateUpdate,
  validatePatch,
  validateId,
  validateQuery,
} from '../validators/laboratoriumValidator';

const router = Router();

// Collection
router.get('/',    validateQuery,  controller.getAll);
router.post('/',   validateCreate, controller.create);

// Detail & mutation per-id
router.get('/:id',    validateId,                     controller.getById);
router.put('/:id',    validateId, validateUpdate,     controller.update);
router.patch('/:id',  validateId, validatePatch,      controller.patch);
router.delete('/:id', validateId,                     controller.remove);

export default router;