import AdoptionModel from '../models/adoption.model.js';

export default class AdoptionRepository {
  async getAllAdoptions() {
    return await AdoptionModel.find().populate('user pet');
  }

  async getAdoptionById(id) {
    return await AdoptionModel.findById(id).populate('user pet');
  }

  async createAdoption(data) {
    return await AdoptionModel.create(data);
  }

  async deleteAdoption(id) {
    return await AdoptionModel.findByIdAndDelete(id);
  }
}
