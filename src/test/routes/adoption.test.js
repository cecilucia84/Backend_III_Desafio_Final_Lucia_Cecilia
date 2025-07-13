import { faker } from '@faker-js/faker';
import request from 'supertest';
import { expect } from 'chai';
import app from '../../app.js';

let userToken;
let petId;
let adoptionId;
let userId;

describe('Pruebas funcionales del router de adopciones', () => {
  before(async () => {
    const username = faker.internet.userName();
    const email = faker.internet.email();

    const resUser = await request(app)
      .post('/api/users')
      .send({ username, email, password: '123456' });
    expect(resUser.status).to.equal(201);
    userId = resUser.body._id;

    const resLogin = await request(app)
      .post('/api/users/login')
      .send({ email, password: '123456' });
    expect(resLogin.status).to.equal(200);
    userToken = resLogin.body.token;

    const resPet = await request(app)
      .post('/api/pets')
      .set('Authorization', `Bearer ${userToken}`)
      .send({
        name: faker.animal.dog(),
        type: 'dog',
        specie: 'canine',
        age: 2
      });
    expect(resPet.status).to.equal(201);
    petId = resPet.body.pet._id;
  });

  it('debería crear una nueva adopción', async () => {
    const res = await request(app)
      .post('/api/adoptions')
      .set('Authorization', `Bearer ${userToken}`)
      .send({ user: userId, pet: petId });

    expect(res.status).to.equal(201);
    expect(res.body).to.have.property('adoption');
    expect(res.body.adoption).to.have.property('_id');
    adoptionId = res.body.adoption._id;
  });
});
