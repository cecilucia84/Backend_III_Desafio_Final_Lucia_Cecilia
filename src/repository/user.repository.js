import UserModel from '../models/user.model.js';

export default class UserRepository {
  async getAllUsers() {
    return await UserModel.find();
  }

  async getUserById(id) {
    return await UserModel.findById(id);
  }

  async getUserByEmail(email) {
    return await UserModel.findOne({ email });
  }

  async createUser(data) {
    return await UserModel.create(data);
  }

  async updateUser(id, data) {
    return await UserModel.findByIdAndUpdate(id, data, { new: true });
  }

  async deleteUser(id) {
    return await UserModel.findByIdAndDelete(id);
  }
}
