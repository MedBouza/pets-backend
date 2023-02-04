import { Router } from 'express';
import {
  CreatePet,
  DeletePet,
  ReadAll,
  ReadPet,
  UpdatePet,
} from '../controllers/PetsController';
import { requireUser } from '../middleware/requireUser';
import upload from '../middleware/upload';
const petRouter = Router();
const PET_PREFIX = '/pets';

petRouter.post(
  `${PET_PREFIX}/create`,
  requireUser,
  upload.array('petPictures', 5),
  CreatePet,
);
petRouter.get(`${PET_PREFIX}/read/:petId`, ReadPet);
petRouter.get(PET_PREFIX, ReadAll);
petRouter.delete(`${PET_PREFIX}/delete/:PetId`, requireUser, DeletePet);
petRouter.patch(`${PET_PREFIX}/update/:PetId`, requireUser, UpdatePet);

export default petRouter;
