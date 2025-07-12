import Adoption from '../models/Adoption.js';

export const getAllAdoptions = async () => {
  return await Adoption.find().populate('userId');
};

export const getAdoption = async (id) => {
  return await Adoption.findById(id).populate('userId');
};

export const createAdoption = async (data) => {
  return await Adoption.create(data);
};

export const deleteAdoption = async (id) => {
  return await Adoption.findByIdAndDelete(id);
};
