import { Request, Response } from 'express';
import errorHandler from '../helper/errorHandler';

import {
  addPet,
  deletePetById,
  getPetById,
  getPetByName,
  updatePetById,
} from '../services/petService';

export const CreatePet = async (req: Request, res: Response) => {
  const pet = req.body;
  const { loggedInUser } = res.locals;
  const images = req.files as Express.Multer.File[] | undefined;
  const imagesString = images?.map((el) => el.filename);
  try {
    if (!pet) throw new Error('No data found');
    const newPet = await addPet(pet, loggedInUser, imagesString);

    res.status(201).json(newPet);
  } catch (error) {
    errorHandler(error, res);
  }
};
export const ReadPet = async (req: Request, res: Response) => {
  const { petId } = req.params as { petId?: string };

  try {
    if (!petId) throw new Error('id not found');
    const pet = await getPetById(petId);
    res.status(200).json(pet);
  } catch (error) {
    errorHandler(error, res);
  }
};
export const ReadAll = async (req: Request, res: Response) => {
  const { page } = req.query as unknown as { page: number };

  try {
    const Pet = await getPetByName(page);
    res.status(200).json(Pet);
  } catch (error) {
    errorHandler(error, res);
  }
};
export const UpdatePet = async (req: Request, res: Response) => {
  const { PetId } = req.params as { PetId?: string };
  const { loggedInUser } = res.locals;

  try {
    if (!PetId) throw new Error('pet not found');
    const pet = await getPetById(PetId);
    if (!pet) throw new Error('pet not found');
    const ownerId =
      typeof pet.ownerId === 'string' ? pet.ownerId : pet.ownerId._id;
    if (String(loggedInUser._id) !== String(ownerId))
      throw new Error("u haven't accesS to update");

    const Pet = await updatePetById(PetId, req.body);
    res.status(200).json(Pet);
  } catch (error) {
    errorHandler(error, res);
  }
};
export const DeletePet = async (req: Request, res: Response) => {
  const { PetId } = req.params as { PetId?: string };
  const { loggedInUser } = res.locals;

  try {
    if (!PetId) throw new Error('cannot delete');

    const pet = await getPetById(PetId);

    if (!pet) throw new Error('pet not found');
    const ownerId =
      typeof pet.ownerId === 'string' ? pet.ownerId : pet.ownerId._id;
    if (String(ownerId) !== String(loggedInUser._id))
      throw new Error('Not your pet');
    await deletePetById(PetId);
    res.status(200).json({ message: 'deleted' });
  } catch (error) {
    errorHandler(error, res);
  }
};
