import request from 'supertest';
import { expect } from 'chai';
import app from '../app.js';


let petId;

describe('Pets Router Functional Tests', () => {
  it('should create a new pet', (done) => {
    request(app)
      .post('/api/pets')
      .send({ name: 'Firulais', type: 'Perro', age: 3 })
      .end((err, res) => {
        expect(res.statusCode).to.equal(201);
        expect(res.body).to.have.property('status', 'success');
        expect(res.body).to.have.property('pet');
        petId = res.body.pet._id;
        done();
      });
  });

  it('should get all pets', (done) => {
    request(app)
      .get('/api/pets')
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.have.property('pets');
        done();
      });
  });

  it('should get one pet by ID', (done) => {
    request(app)
      .get(`/api/pets/${petId}`)
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.have.property('pet');
        expect(res.body.pet._id).to.equal(petId);
        done();
      });
  });

  it('should update a pet', (done) => {
    request(app)
      .put(`/api/pets/${petId}`)
      .send({ name: 'Firulais 2' })
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.have.property('pet');
        expect(res.body.pet.name).to.equal('Firulais 2');
        done();
      });
  });

  it('should delete a pet', (done) => {
    request(app)
      .delete(`/api/pets/${petId}`)
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.have.property('message');
        done();
      });
  });
});

describe('Pets Router Functional Tests - Casos de Error', () => {
  it('should return 400 if required fields are missing on POST /api/pets', (done) => {
    request(app)
      .post('/api/pets')
      .send({}) // Sin datos
      .end((err, res) => {
        expect(res.statusCode).to.equal(400);
        expect(res.body).to.have.property('error');
        done();
      });
  });

  it('should return 404 for non-existing pet on GET /api/pets/:id', (done) => {
    request(app)
      .get('/api/pets/64ee5dc5044bfe10be4d9999') // ID que no existe
      .end((err, res) => {
        expect([404, 400]).to.include(res.statusCode);
        done();
      });
  });

  it('should return 400 for invalid pet ID format on GET', (done) => {
    request(app)
      .get('/api/pets/invalid-id-format')
      .end((err, res) => {
        expect(res.statusCode).to.equal(400);
        done();
      });
  });

  it('should return 404 for non-existing pet on PUT /api/pets/:id', (done) => {
    request(app)
      .put('/api/pets/64ee5dc5044bfe10be4d9999') // ID que no existe
      .send({ name: 'No existe' })
      .end((err, res) => {
        expect([404, 400]).to.include(res.statusCode);
        done();
      });
  });

  it('should return 400 for invalid pet ID format on PUT', (done) => {
    request(app)
      .put('/api/pets/invalid-id-format')
      .send({ name: 'Nombre' })
      .end((err, res) => {
        expect(res.statusCode).to.equal(400);
        done();
      });
  });

  it('should return 404 for non-existing pet on DELETE /api/pets/:id', (done) => {
    request(app)
      .delete('/api/pets/64ee5dc5044bfe10be4d9999') // ID que no existe
      .end((err, res) => {
        expect([404, 400]).to.include(res.statusCode);
        done();
      });
  });

  it('should return 400 for invalid pet ID format on DELETE', (done) => {
    request(app)
      .delete('/api/pets/invalid-id-format')
      .end((err, res) => {
        expect(res.statusCode).to.equal(400);
        done();
      });
  });
});
