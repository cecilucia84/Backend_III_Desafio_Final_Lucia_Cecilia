import bcryptjs from 'bcryptjs';
import { UserRepository } from "../repository/user.repository.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const SALT_ROUNDS = 10;

export class UserService {
  constructor() {
    this.userRepo = new UserRepository();
  }

  async getAllUsers() {
    return await this.userRepo.findAll();
  }

  async registerUser({ email, password, username }) {
    const existingEmail = await this.userRepo.findByEmail(email);
    if (existingEmail) {
      throw new Error("Email already in use");
    }

    const existingUsername = await this.userRepo.findByUserName(username);
    if (existingUsername) {
      throw new Error("Username already in use");
    }

    const hashedPassword = await bcryptjs.hash(password, SALT_ROUNDS);
    const newUser = await this.userRepo.create({
      email,
      password: hashedPassword,
      username
    });

    return newUser;
  }

  async loginUser({ email, password }) {
    const user = await this.userRepo.findByEmail(email);
    if (!user) throw new Error("Invalid credentials (email)");

    const isPasswordValid = await bcryptjs.compare(password, user.password);
    if (!isPasswordValid) throw new Error("Invalid credentials (password)");

    const token = jwt.sign(
      {
        id: user._id,
        username: user.username,
        email: user.email
      },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    return {
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email
      }
    };
  }

  async getUserById(id) {
    return await this.userRepo.findById(id);
  }
}
