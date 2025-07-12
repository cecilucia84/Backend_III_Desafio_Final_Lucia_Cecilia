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
