import ReqAdoption from '../models/reqAdoption';
import { IUserModel } from '../models/User';
import { getPetById } from './petService';

export const addDemand = async (id: string, sender: IUserModel) => {
  const mypet = await getPetById(id);
  const sentReqAdoption = await (
    await ReqAdoption.create({
      sender: sender._id,
      pet: mypet,
    })
  ).populate([
    {
      path: 'sender',
      select: 'firstname lastname',
    },
    {
      path: 'pet',
      populate: 'ownerId',
    },
  ]);

  return sentReqAdoption;
};
export const getSentDemand = async (sender: IUserModel) => {
  const sentReqAdoption = await ReqAdoption.find({ sender }).populate([
    {
      path: 'pet',
      populate: 'ownerId',
    },
    {
      path: 'sender',
    },
  ]);

  return sentReqAdoption;
};
export const getReceivedDemand = async (ownerId: IUserModel) => {
  const receivedReqAdoption = await ReqAdoption.find({ ownerId }).populate([
    {
      path: 'pet',
      populate: 'ownerId',
    },
    {
      path: 'sender',
    },
  ]);

  return receivedReqAdoption;
};
