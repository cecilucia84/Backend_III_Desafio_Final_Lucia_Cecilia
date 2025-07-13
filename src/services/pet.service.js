import Pet from '../models/Pet.js';

export class PetService {
  async getAll() {
    return await Pet.find();
  }

  async getById(id) {
    return await Pet.findById(id);
  }

  async create(data) {
    return await Pet.create(data);
  }

  async update(id, data) {
    return await Pet.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id) {
    return await Pet.findByIdAndDelete(id);
  }
}
