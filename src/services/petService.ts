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
export const getPetByName = async (actual_page: number) => {
  const page = actual_page || 1;
  const PAGE_SIZE = 12;
  const match = { $match: { name: '' } };
  const sort = { $sort: { createdAt: -1 } };
  const offset = (page - 1) * PAGE_SIZE;
  const skip = { $skip: offset };
  const limit = { $limit: PAGE_SIZE };
  const results = await Pets.aggregate([skip, limit]);

  const count = await Pets.countDocuments();
  const totalPages = Math.ceil(count / PAGE_SIZE);
  const hasNextPage = page < totalPages;
  const hasPrevPage = page > 1;
  return {
    results,
    pageInfo: {
      currentPage: page,
      totalPages,
      hasNextPage,
      hasPrevPage,
      totalItems: count,
    },
  };
};
export const updatePetById = async (id: string, petData: IPets) =>
  await Pets.findByIdAndUpdate(id, petData, { new: true });
export const deletePetById = async (id: string) =>
  await Pets.findOneAndDelete({ _id: id });
