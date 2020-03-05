import request from 'supertest';
import bcrypt from 'bcryptjs';
import app from '../../src/app';
import truncate from '../util/truncate';
import factory from '../factories';

describe('User', () => {
  beforeEach(async () => {
    await truncate();
  });
  afterAll(async () => {
    await truncate();
  });

  it('Should encrypt user password when new user created', async () => {
    const user = await factory.create('User', { password: '123456' });

    const compareHash = await bcrypt.compare('123456', user.password_hash);

    expect(compareHash).toBe(true);
  });

  it('Should not be able to register with fields error', async () => {
    const response = await request(app)
      .post('/register')
      .send({ name: 'Teste', email: 'teste@test.com' });

    expect(response.status).toBe(400);
  });

  it('Should be able to register', async () => {
    const user = await factory.attrs('User');
    const response = await request(app)
      .post('/register')
      .send(user);

    expect(response.body).toHaveProperty('id');
  });

  it('Should not be able to register with duplicate email', async () => {
    const user = await factory.attrs('User');

    await request(app)
      .post('/register')
      .send(user);

    const response = await request(app)
      .post('/register')
      .send(user);

    expect(response.status).toBe(400);
  });
});
