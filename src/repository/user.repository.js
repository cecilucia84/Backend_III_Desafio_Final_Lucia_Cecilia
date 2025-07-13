import UserModel from '../models/User.js';

export class UserRepository {
  async findAll() {
    return await UserModel.find();
  }

  async findByEmail(email) {
    return await UserModel.findOne({ email });
  }

  async findByUserName(username) {
    return await UserModel.findOne({ username });
  }

  async create({ email, password, username }) {
    return await UserModel.create({
      email,
      password,
      username
    });
  }

  async findById(id) {
    return await UserModel.findById(id);
  }

  async update(id, data) {
    return await UserModel.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id) {
    return await UserModel.findByIdAndDelete(id);
  }
}
