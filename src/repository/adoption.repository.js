import AdoptionModel from '../models/adoption.model.js';

export class AdoptionRepository {
  async findAll() {
    return await AdoptionModel.find().populate('user pet');
  }

  async findById(id) {
    return await AdoptionModel.findById(id).populate('user pet');
  }

  async create({ user, pet }) {
    return await AdoptionModel.create({ user, pet });
  }

  async delete(id) {
    return await AdoptionModel.findByIdAndDelete(id);
  }
}
