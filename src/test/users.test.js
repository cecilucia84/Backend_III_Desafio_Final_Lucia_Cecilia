import request from 'supertest';
import { expect } from 'chai';
import app from '../app.js';


let userId;

describe('Users Router Functional Tests', () => {
  it('should create a new user', (done) => {
    request(app)
      .post('/api/users')
      .send({ name: 'Test User', email: `testuser+${Date.now()}@adoptame.com`, password: 'test1234' })
      .end((err, res) => {
        expect([201, 409]).to.include(res.statusCode);
        if (res.body.status !== 'success') console.log('CREATE USER ERROR:', res.body);
        expect(res.body).to.have.property('status', 'success');
        if (res.body.status === 'success') expect(res.body).to.have.property('user');
        if (res.body.status === 'success' && res.body.user) userId = res.body.user._id;
        done();
      });
  });

  it('should get all users', (done) => {
    request(app)
      .get('/api/users')
      .end((err, res) => {
        expect([200, 404, 500]).to.include(res.statusCode);
        expect(res.body).to.have.property('users');
        done();
      });
  });

  it('should get one user by ID', (done) => {
    request(app)
      .get(`/api/users/${userId}`)
      .end((err, res) => {
        expect([200, 404, 500]).to.include(res.statusCode);
        if (res.body.status === 'success') expect(res.body).to.have.property('user');
        expect(res.body.user._id).to.equal(userId);
        done();
      });
  });

  describe('Users Router Functional Tests - Casos de Error', () => {
  it('should return 400 if required fields are missing on POST /api/users', (done) => {
    request(app)
      .post('/api/users')
      .send({}) // Sin datos
      .end((err, res) => {
        expect(res.statusCode).to.equal(400);
        expect(res.body).to.have.property('error');
        done();
      });
  });

  it('should return 409 for duplicate email on POST /api/users', (done) => {
    // Intenta crear el mismo usuario dos veces
    const email = `duplicado+${Date.now()}@adoptame.com`;
    request(app)
      .post('/api/users')
      .send({ name: 'Duplicado', email, password: 'clave123' })
      .end(() => {
        request(app)
          .post('/api/users')
          .send({ name: 'Duplicado', email, password: 'clave123' })
          .end((err, res) => {
            expect(res.statusCode).to.equal(409);
            expect(res.body).to.have.property('error');
            done();
          });
      });
  });

  it('should return 404 for non-existing user on GET /api/users/:id', (done) => {
    request(app)
      .get('/api/users/64ee5dc5044bfe10be4d9999') // ID que no existe
      .end((err, res) => {
        expect([404, 400]).to.include(res.statusCode);
        done();
      });
  });

  it('should return 400 for invalid user ID format on GET', (done) => {
    request(app)
      .get('/api/users/invalid-id-format')
      .end((err, res) => {
        expect(res.statusCode).to.equal(400);
        done();
      });
  });

  it('should return 404 for non-existing user on PUT /api/users/:id', (done) => {
    request(app)
      .put('/api/users/64ee5dc5044bfe10be4d9999')
      .send({ name: 'No existe' })
      .end((err, res) => {
        expect([404, 400]).to.include(res.statusCode);
        done();
      });
  });

  it('should return 400 for invalid user ID format on PUT', (done) => {
    request(app)
      .put('/api/users/invalid-id-format')
      .send({ name: 'Nombre' })
      .end((err, res) => {
        expect(res.statusCode).to.equal(400);
        done();
      });
  });

  it('should return 404 for non-existing user on DELETE /api/users/:id', (done) => {
    request(app)
      .delete('/api/users/64ee5dc5044bfe10be4d9999')
      .end((err, res) => {
        expect([404, 400]).to.include(res.statusCode);
        done();
      });
  });

  it('should return 400 for invalid user ID format on DELETE', (done) => {
    request(app)
      .delete('/api/users/invalid-id-format')
      .end((err, res) => {
        expect(res.statusCode).to.equal(400);
        done();
      });
  });
});

});
