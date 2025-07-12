import PetModel from '../models/pet.model.js';

export default class PetRepository {
  async getAllPets() {
    return await PetModel.find();
  }

  async getPetById(id) {
    return await PetModel.findById(id);
  }

  async createPet(data) {
    return await PetModel.create(data);
  }

  async deletePet(id) {
    return await PetModel.findByIdAndDelete(id);
  }
}
