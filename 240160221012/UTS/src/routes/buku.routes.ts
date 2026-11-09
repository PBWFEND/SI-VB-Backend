import { Router } from 'express';
import { bukuController } from '../controller/buku.controller';

const router = Router();

router.get('/', bukuController.list);
router.get('/:id', bukuController.detail);
router.post('/', bukuController.create);
router.patch('/:id', bukuController.update);
router.delete('/:id', bukuController.remove);

export default router;