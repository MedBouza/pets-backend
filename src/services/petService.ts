import Pets, { IPets, IPetsModel } from '../models/Pets';
import { IUserModel } from '../models/User';

export const addPet = async (
  petData: IPetsModel,
  user: IUserModel,
  images?: string[],
) => {
  if (images) Object.assign(petData, { petPictures: images });

  const createdPet = await Pets.create({ ...petData, ownerId: user._id });
  await createdPet.populate('ownerId');
  return createdPet;
};
export const getPetById = async (id: string) =>
  await Pets.findById(id).populate([{ path: 'ownerId', select: 'name email' }]);
export const getPetByName = async (keyword?: string) =>
  await Pets.find(keyword ? { name: keyword } : {}).populate([
    { path: 'ownerId', select: 'name email' },
  ]);
export const updatePetById = async (id: string, petData: IPets) =>
  await Pets.findByIdAndUpdate(id, petData, { new: true });
export const deletePetById = async (id: string) =>
  await Pets.findOneAndDelete({ _id: id });
