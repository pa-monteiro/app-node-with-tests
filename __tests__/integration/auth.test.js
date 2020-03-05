import request from 'supertest';
import app from '../../src/app';
import truncate from '../util/truncate';
import factory from '../factories';

describe('Auth', () => {
  beforeEach(async () => {
    await truncate();
  });
  afterAll(async () => {
    await truncate();
  });
  it('should an user has login in application', async () => {
    const user = await factory.create('User', { password: '123456' });

    const response = await request(app)
      .post('/login')
      .send({ email: user.email, password: user.password });

    expect(response.body).toHaveProperty('token');
  });
  it('should an user not found', async () => {
    const response = await request(app)
      .post('/login')
      .send({ email: 'usernotfound@test.com', password: '456789' });
    expect(response.status).toBe(400);
  });

  it('should an user with fields error', async () => {
    const response = await request(app)
      .post('/login')
      .send({
        name: 'Felisberto',
        password: 'testes',
      });
    expect(response.status).toBe(400);
  });
});
