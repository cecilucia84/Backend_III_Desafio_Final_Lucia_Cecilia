import { faker } from '@faker-js/faker';
import request from 'supertest';
import { expect } from 'chai';
import app from '../../app.js';

let userToken;
let petId;

describe('Pruebas funcionales del router de mascotas', () => {
  before(async () => {
    const username = faker.internet.userName();
    const email = faker.internet.email();

    await request(app)
      .post('/api/users')
      .send({
        username,
        email,
        password: '123456',
      });

    const resLogin = await request(app)
      .post('/api/users/login')
      .send({ email, password: '123456' });

    userToken = resLogin.body.token;
  });

  it('debería crear una nueva mascota', async () => {
    const res = await request(app)
      .post('/api/pets')
      .set('Authorization', `Bearer ${userToken}`)
      .send({
        name: faker.animal.cat(),
        type: 'cat',
        specie: 'feline',
        age: 1
      });

    expect(res.status).to.equal(201);
    expect(res.body).to.have.property('pet');
    expect(res.body.pet).to.have.property('_id');
    petId = res.body.pet._id;
  });

  it('debería fallar al crear mascota sin nombre', async () => {
    const res = await request(app)
      .post('/api/pets')
      .set('Authorization', `Bearer ${userToken}`)
      .send({ type: 'cat', specie: 'feline', age: 1 });

    expect(res.status).to.equal(400);
  });

  it('debería obtener todas las mascotas', async () => {
    const res = await request(app).get('/api/pets');
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('pets').that.is.an('array');
  });

  it('debería obtener una mascota por ID', async () => {
    const res = await request(app).get(`/api/pets/${petId}`);
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('pet');
    expect(res.body.pet).to.have.property('_id');
  });

  it('debería actualizar una mascota', async () => {
    const res = await request(app)
      .put(`/api/pets/${petId}`)
      .set('Authorization', `Bearer ${userToken}`)
      .send({ age: 3 });

    expect(res.status).to.equal(200);
  });

  it('debería eliminar una mascota', async () => {
    const res = await request(app)
      .delete(`/api/pets/${petId}`)
      .set('Authorization', `Bearer ${userToken}`);

    expect(res.status).to.equal(200);
  });

  it('debería fallar al obtener mascota con ID inválido', async () => {
    const res = await request(app).get(`/api/pets/invalidid`);
    expect(res.status).to.equal(400);
  });

  it('debería fallar al actualizar mascota con ID inválido', async () => {
    const res = await request(app)
      .put(`/api/pets/invalidid`)
      .set('Authorization', `Bearer ${userToken}`)
      .send({ age: 4 });

    expect(res.status).to.equal(400);
  });

  it('debería fallar al eliminar mascota con ID inválido', async () => {
    const res = await request(app)
      .delete(`/api/pets/invalidid`)
      .set('Authorization', `Bearer ${userToken}`);

    expect(res.status).to.equal(400);
  });
});
