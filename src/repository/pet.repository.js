import PetModel from '../models/pet.model.js';

export class PetRepository {
  async findAll() {
    return await PetModel.find();
  }

  async findById(id) {
    return await PetModel.findById(id);
  }

  async create({ name, type, age }) {
    return await PetModel.create({ name, type, age });
  }

  async update(id, data) {
    return await PetModel.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id) {
    return await PetModel.findByIdAndDelete(id);
  }
}
