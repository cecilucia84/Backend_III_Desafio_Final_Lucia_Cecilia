import request from 'supertest';
import { expect } from 'chai';
import app from '../app.js';



// Variables para guardar los IDs creados durante los tests
let userId, petId, adoptionId;

describe('Adoption Router Functional Tests', () => {

  before(async () => {
    // Crear usuario
    const userRes = await request(app)
      .post('/api/users')
      .send({ name: 'Ceci Tester', email: `testceci+${Date.now()}@adoptame.com`, password: 'test1234' });
    userId = userRes.body?.user?._id || null;
    if (userRes.body.status !== 'success') console.log('USER ERROR:', userRes.body);
    expect(userRes.body.status).to.equal('success');
    expect(userRes.body.user).to.exist;
    userId = userRes.body.user._id;

    // Crear mascota
    const petRes = await request(app)
      .post('/api/pets')
      .send({ name: 'Michi', type: 'gato', age: 2 });
    petId = petRes.body?.pet?._id || null;
    if (petRes.body.status !== 'success') console.log('PET ERROR:', petRes.body);
    expect(petRes.body.status).to.equal('success');
    expect(petRes.body.pet).to.exist;
    petId = petRes.body.pet._id;
  });

  it('should create a new adoption', (done) => {
    request(app)
      .post('/api/adoptions')
      .send({ user: userId, pet: petId })
      .end((err, res) => {
        expect([201, 400]).to.include(res.statusCode);
        expect(res.body).to.have.property('status', 'success');
        expect(res.body.adoption).to.have.property('_id');
        adoptionId = res.body.adoption._id;
        done();
      });
  });

  it('should get all adoptions', (done) => {
    request(app)
      .get('/api/adoptions')
      .end((err, res) => {
        expect([200, 404, 500]).to.include(res.statusCode);
        expect(res.body).to.have.property('adoptions');
        done();
      });
  });

  it('should get one adoption by ID', (done) => {
    request(app)
      .get(`/api/adoptions/${adoptionId}`)
      .end((err, res) => {
        expect([200, 404, 500]).to.include(res.statusCode);
        expect(res.body).to.have.property('adoption');
        done();
      });
  });

  it('should delete the adoption', (done) => {
    request(app)
      .delete(`/api/adoptions/${adoptionId}`)
      .end((err, res) => {
        expect([200, 404, 500]).to.include(res.statusCode);
        expect(res.body).to.have.property('message');
        done();
      });
  });
});


describe('Adoption Router Functional Tests - Casos de Error', () => {

  it('should return 400 if required fields are missing on POST /api/adoptions', (done) => {
    request(app)
      .post('/api/adoptions')
      .send({}) // Sin datos
      .end((err, res) => {
        expect(res.statusCode).to.equal(400);
        expect(res.body).to.have.property('error');
        done();
      });
  });

  it('should return 404 for non-existing adoption on GET /api/adoptions/:id', (done) => {
    request(app)
      .get('/api/adoptions/64ee5dc5044bfe10be4d9999') // ID que no existe
      .end((err, res) => {
        expect([404, 400]).to.include(res.statusCode);
        done();
      });
  });

  it('should return 404 for non-existing adoption on DELETE /api/adoptions/:id', (done) => {
    request(app)
      .delete('/api/adoptions/64ee5dc5044bfe10be4d8888') // ID que no existe
      .end((err, res) => {
        expect([404, 400]).to.include(res.statusCode);
        done();
      });
  });

  it('should return 400 for invalid adoption ID format on GET', (done) => {
    request(app)
      .get('/api/adoptions/invalid-id-format')
      .end((err, res) => {
        expect(res.statusCode).to.equal(400);
        done();
      });
  });

  it('should return 400 for invalid adoption ID format on DELETE', (done) => {
    request(app)
      .delete('/api/adoptions/invalid-id-format')
      .end((err, res) => {
        expect(res.statusCode).to.equal(400);
        done();
      });
  });
});
