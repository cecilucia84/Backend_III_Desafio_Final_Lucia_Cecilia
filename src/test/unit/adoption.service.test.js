
import { expect } from 'chai';
import sinon from 'sinon';
import mongoose from 'mongoose';
import Adoption from '../../models/Adoption.js';
import User from '../../models/User.js';
import Pet from '../../models/Pet.js';
import { AdoptionService } from '../../services/adoption.service.js';

describe('AdoptionService - Unit Tests', () => {
  let adoptionService;

  beforeEach(() => {
    adoptionService = new AdoptionService();
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should return all adoptions', async () => {
    const mockAdoptions = [{ id: '1' }, { id: '2' }];
    sinon.stub(Adoption, 'find').returns({ populate: () => ({ populate: async () => mockAdoptions }) });

    const result = await adoptionService.getAll();
    expect(result).to.eql(mockAdoptions);
  });

  it('should return adoption by ID', async () => {
    const mockAdoption = { id: '1' };
    sinon.stub(Adoption, 'findById').returns({ populate: () => ({ populate: async () => mockAdoption }) });

    const result = await adoptionService.getById('1');
    expect(result).to.eql(mockAdoption);
  });

  it('should create a new adoption', async () => {
    const userId = new mongoose.Types.ObjectId();
    const petId = new mongoose.Types.ObjectId();
    const createdAdoption = { _id: 'newId' };

    sinon.stub(User, 'findById').resolves({});
    sinon.stub(Pet, 'findById').resolves({});
    sinon.stub(Adoption, 'create').resolves(createdAdoption);
    sinon.stub(Adoption, 'findById').returns({ populate: () => ({ populate: async () => createdAdoption }) });

    const result = await adoptionService.create(userId, petId);
    expect(result).to.eql(createdAdoption);
  });

  it('should delete an adoption', async () => {
    const deleted = { _id: '1', user: {}, pet: {} };
    sinon.stub(Adoption, 'findByIdAndDelete').resolves(deleted);

    const result = await adoptionService.delete('1');
    expect(result).to.eql(deleted);
  });
});
