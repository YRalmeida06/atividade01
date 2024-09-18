const request = require('supertest');
const app = require('../index'); // Certifique-se de exportar o app do index.js
const sequelize = require('../config/database');
const User = require('../models/user');

beforeAll(async () => {
  await sequelize.sync({ force: true });
});

afterAll(async () => {
  await sequelize.close();
});

describe('Auth Routes', () => {
  it('should register a new user', async () => {
    const res = await request(app)
      .post('/auth/register')
      .send({ username: 'testuser', password: 'testpass' });
    expect(res.statusCode).toEqual(201);
  });

  it('should login an existing user', async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({ username: 'testuser', password: 'testpass' });
    expect(res.statusCode).toEqual(200);
  });

  it('should list all users', async () => {
    const res = await request(app).get('/auth/list');
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toBeGreaterThan(0);
  });
});
