import request from 'supertest';
import { response } from 'express';
import app from '../../src/app';
import truncate from '../util/truncate';
import factory from '../factories';

describe('Brand', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('Get all the brands', async () => {
    const response = await request(app).get('/api/brands');

    expect(response.status).toBe(200);
  });
  it('should a create a brand', async () => {
    const user = await factory.create('User', { password: '123456' });
    const response = await request(app)
      .post('/api/brands')
      .set('Authorization', `Bearer ${user.generateToken()}`)
      .send({ name: 'brand one' });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
  });

  it('should a validation fails in body', async () => {
    const user = await factory.create('User', { password: '123456' });
    const response = await request(app)
      .post('/api/brands')
      .set('Authorization', `Bearer ${user.generateToken()}`);

    expect(response.status).toBe(400);
  });

  it('should error on duplicate a create a brand', async () => {
    const user = await factory.create('User', { password: '123456' });
    await request(app)
      .post('/api/brands')
      .set('Authorization', `Bearer ${user.generateToken()}`)
      .send({ name: 'brand one' });

    const response = await request(app)
      .post('/api/brands')
      .set('Authorization', `Bearer ${user.generateToken()}`)
      .send({ name: 'brand one' });

    expect(response.status).toBe(400);
  });

  it('should an error validation fails because body in request is error', async () => {
    const user = await factory.create('User', { password: '123456' });

    await request(app)
      .post('/api/brands')
      .set('Authorization', `Bearer ${user.generateToken()}`);

    expect(response.status).toBe(400);
  });
});
