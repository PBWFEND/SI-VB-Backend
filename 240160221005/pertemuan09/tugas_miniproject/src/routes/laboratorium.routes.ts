import { Router } from 'express';
import * as controller from '../controller/laboratorium.controller';
import {
  validateCreate,
  validateUpdate,
  validatePatch,
  validateId,
  validateQuery,
} from '../validators/laboratorium.validator';

const router = Router();

router.get('/',    validateQuery,  controller.getAll);
router.post('/',   validateCreate, controller.create);

router.get('/:id',    validateId,                 controller.getById);
router.put('/:id',    validateId, validateUpdate, controller.update);
router.patch('/:id',  validateId, validatePatch,  controller.patch);
router.delete('/:id', validateId,                 controller.remove);

export default router;