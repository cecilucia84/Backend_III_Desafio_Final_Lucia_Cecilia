import { Router } from 'express';
import {
  getPets,
  getPetById,
  createPet,
  updatePet,
  deletePet
} from '../controllers/pets.controller.js';

const router = Router();

router.get('/', getPets);
router.get('/:id', getPetById);
router.post('/', createPet);
router.put('/:id', updatePet);
router.delete('/:id', deletePet);

export default router;
