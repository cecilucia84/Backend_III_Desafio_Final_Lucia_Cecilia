import Adoption from '../models/Adoption.js';
import User from '../models/User.js';
import Pet from '../models/Pet.js';

export class AdoptionService {
  async getAll() {
    return await Adoption.find().populate('user').populate('pet');
  }

  async getById(id) {
    return await Adoption.findById(id).populate('user').populate('pet');
  }

  async create(userId, petId) {
    
    const user = await User.findById(userId);
    const pet = await Pet.findById(petId);

    if (!user || !pet) {
      throw new Error("User or Pet not found");
    }

    const adoption = await Adoption.create({ user: userId, pet: petId });

    
    return await Adoption.findById(adoption._id).populate('user').populate('pet');
  }

  async delete(id) {
    return await Adoption.findByIdAndDelete(id);
  }
}
