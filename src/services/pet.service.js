import Pet from '../models/Pet.js';

export const getAllPets = async () => {
  return await Pet.find();
};

export const getPet = async (id) => {
  return await Pet.findById(id);
};

export const createPet = async (data) => {
  return await Pet.create(data);
};

export const updatePet = async (id, data) => {
  return await Pet.findByIdAndUpdate(id, data, { new: true });
};

export const deletePet = async (id) => {
  return await Pet.findByIdAndDelete(id);
};
