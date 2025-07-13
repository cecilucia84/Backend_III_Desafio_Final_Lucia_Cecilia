
import { expect } from 'chai';
import sinon from 'sinon';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { UserService } from '../../services/users.service.js';
import { UserRepository } from '../../repository/user.repository.js';

describe('UserService - Unit Tests', () => {
  let userService;
  let userRepoStub;

  beforeEach(() => {
    userRepoStub = sinon.createStubInstance(UserRepository);
    userService = new UserService();
    userService.userRepo = userRepoStub;
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should return all users', async () => {
    const mockUsers = [{ email: 'a@mail.com' }];
    userRepoStub.findAll.resolves(mockUsers);

    const result = await userService.getAllUsers();
    expect(result).to.eql(mockUsers);
  });

  it('should register new user', async () => {
    const newUser = {
      email: 'test@mail.com',
      password: '123456',
      username: 'tester'
    };

    userRepoStub.findByEmail.resolves(null);
    userRepoStub.findByUserName.resolves(null);
    sinon.stub(bcryptjs, 'hash').resolves('hashedpass');
    userRepoStub.create.resolves({ ...newUser, password: 'hashedpass' });

    const result = await userService.registerUser(newUser);
    expect(result).to.include({ email: newUser.email, username: newUser.username });
  });

  it('should login user', async () => {
    const mockUser = {
      email: 'test@mail.com',
      password: await bcryptjs.hash('123456', 10),
      _id: 'mockid',
      username: 'tester'
    };

    userRepoStub.findByEmail.resolves(mockUser);
    sinon.stub(bcryptjs, 'compare').resolves(true);
    sinon.stub(jwt, 'sign').returns('mocktoken');

    const result = await userService.loginUser({ email: mockUser.email, password: '123456' });
    expect(result).to.have.property('token', 'mocktoken');
  });
});
