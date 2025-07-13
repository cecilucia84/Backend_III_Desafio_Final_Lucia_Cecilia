import { faker } from '@faker-js/faker';
import request from 'supertest';
import { expect } from 'chai';
import app from '../../app.js';

let token;

describe('Pruebas funcionales del router de usuarios', () => {
  it('debería registrar un nuevo usuario', async () => {
    const username = faker.internet.userName();
    const email = faker.internet.email();

    const res = await request(app)
      .post('/api/users')
      .send({
        username,
        email,
        password: '123456',
      });

    expect(res.status).to.equal(201);
  });

  it('debería fallar registro con email inválido', async () => {
    const res = await request(app)
      .post('/api/users')
      .send({ username: 'fail', email: 'invalid', password: '123456' });

    expect(res.status).to.equal(400);
  });

  it('debería hacer login y obtener token', async () => {
    const username = faker.internet.userName();
    const email = faker.internet.email();

    await request(app).post('/api/users').send({
      username,
      email,
      password: '123456',
    });

    const res = await request(app)
      .post('/api/users/login')
      .send({ email, password: '123456' });

    expect(res.status).to.equal(200);
    token = res.body.token;
  });

  it('debería fallar login con contraseña incorrecta', async () => {
    const username = faker.internet.userName();
    const email = faker.internet.email();

    await request(app).post('/api/users').send({
      username,
      email,
      password: '123456',
    });

    const res = await request(app)
      .post('/api/users/login')
      .send({ email, password: 'wrongpass' });

    expect(res.status).to.equal(401);
  });

  it('debería obtener todos los usuarios con token válido', async () => {
    const res = await request(app)
      .get('/api/users')
      .set('Authorization', `Bearer ${token}`);
    expect(res.status).to.equal(200);
  });

  it('debería obtener usuarios sin necesidad de token', async () => {
    const res = await request(app).get('/api/users');
    expect(res.status).to.equal(200);
  });
});
