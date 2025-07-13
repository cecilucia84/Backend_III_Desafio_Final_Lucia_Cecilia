
import { expect } from 'chai';
import sinon from 'sinon';
import PetModel from '../../models/Pet.js';
import { PetService } from '../../services/pet.service.js';

describe('Pruebas del servicio PetService', () => {
  let petService;

  beforeEach(() => {
    petService = new PetService();
  });

  afterEach(() => {
    sinon.restore();
  });

  it('debería obtener todas las mascotas', async () => {
    const fakePets = [{ name: 'Firulais' }, { name: 'Luna' }];
    sinon.stub(PetModel, 'find').resolves(fakePets);

    const result = await petService.getAll();

    expect(result).to.be.an('array');
    expect(result).to.have.lengthOf(2);
    expect(result[0]).to.have.property('name', 'Firulais');
  });

  it('debería crear una mascota', async () => {
    const newPet = { name: 'Luna', type: 'cat', specie: 'feline', age: 2 };
    sinon.stub(PetModel, 'create').resolves(newPet);

    const result = await petService.create({ ...newPet });

    expect(result).to.have.property('name', 'Luna');
    expect(result).to.have.property('type', 'cat');
  });
});
