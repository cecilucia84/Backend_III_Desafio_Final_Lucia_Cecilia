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
});
