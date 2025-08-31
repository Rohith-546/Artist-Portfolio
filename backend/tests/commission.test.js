const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../src/server');
const Commission = require('../src/models/Commission');
const Settings = require('../src/models/Settings');

describe('Commission API', () => {
  beforeAll(async () => {
    // Connect to test database
    const MONGODB_URI = process.env.MONGODB_TEST_URI || 'mongodb://localhost:27017/artist-portfolio-test';
    await mongoose.connect(MONGODB_URI);
    
    // Create test settings
    await Settings.deleteMany({});
    await Settings.create({
      ratePerPerson: 100,
      sizeMultipliers: { S: 1, M: 1.5, L: 2 },
      contactEmail: 'test@example.com'
    });
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  beforeEach(async () => {
    await Commission.deleteMany({});
  });

  describe('Price Calculation', () => {
    it('should calculate correct price for small size', async () => {
      const response = await request(app)
        .get('/api/commissions/price-calculation')
        .query({ numberOfPersons: 2, size: 'S' });

      expect(response.status).toBe(200);
      expect(response.body.totalPrice).toBe(200); // 2 * 100 * 1
    });

    it('should calculate correct price for medium size', async () => {
      const response = await request(app)
        .get('/api/commissions/price-calculation')
        .query({ numberOfPersons: 2, size: 'M' });

      expect(response.status).toBe(200);
      expect(response.body.totalPrice).toBe(300); // 2 * 100 * 1.5
    });

    it('should calculate correct price for large size', async () => {
      const response = await request(app)
        .get('/api/commissions/price-calculation')
        .query({ numberOfPersons: 3, size: 'L' });

      expect(response.status).toBe(200);
      expect(response.body.totalPrice).toBe(600); // 3 * 100 * 2
    });

    it('should return error for missing parameters', async () => {
      const response = await request(app)
        .get('/api/commissions/price-calculation')
        .query({ numberOfPersons: 2 });

      expect(response.status).toBe(400);
      expect(response.body.message).toContain('size are required');
    });
  });

  describe('Commission Creation', () => {
    const validCommissionData = {
      customerName: 'John Doe',
      email: 'john@example.com',
      phone: '123-456-7890',
      size: 'M',
      medium: 'oil',
      numberOfPersons: 2,
      deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days from now
      description: 'A beautiful portrait of my family'
    };

    it('should create commission with valid data', async () => {
      const response = await request(app)
        .post('/api/commissions')
        .send(validCommissionData);

      expect(response.status).toBe(201);
      expect(response.body.message).toBe('Commission request submitted successfully');
      expect(response.body.commission.totalPrice).toBe(300); // 2 * 100 * 1.5
    });

    it('should reject commission with invalid email', async () => {
      const invalidData = { ...validCommissionData, email: 'invalid-email' };
      
      const response = await request(app)
        .post('/api/commissions')
        .send(invalidData);

      expect(response.status).toBe(400);
      expect(response.body.message).toBe('Validation failed');
    });

    it('should reject commission with past deadline', async () => {
      const invalidData = { 
        ...validCommissionData, 
        deadline: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString() // yesterday
      };
      
      const response = await request(app)
        .post('/api/commissions')
        .send(invalidData);

      expect(response.status).toBe(400);
      expect(response.body.message).toBe('Validation failed');
    });

    it('should reject commission with invalid medium', async () => {
      const invalidData = { ...validCommissionData, medium: 'invalid-medium' };
      
      const response = await request(app)
        .post('/api/commissions')
        .send(invalidData);

      expect(response.status).toBe(400);
      expect(response.body.message).toBe('Validation failed');
    });

    it('should reject commission with too many persons', async () => {
      const invalidData = { ...validCommissionData, numberOfPersons: 15 };
      
      const response = await request(app)
        .post('/api/commissions')
        .send(invalidData);

      expect(response.status).toBe(400);
      expect(response.body.message).toBe('Validation failed');
    });
  });

  describe('Email Functionality', () => {
    it('should handle email sending gracefully on commission creation', async () => {
      // This test ensures the commission is created even if email fails
      const validCommissionData = {
        customerName: 'Jane Doe',
        email: 'jane@example.com',
        size: 'S',
        medium: 'watercolor',
        numberOfPersons: 1,
        deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        description: 'A small watercolor portrait'
      };

      const response = await request(app)
        .post('/api/commissions')
        .send(validCommissionData);

      expect(response.status).toBe(201);
      expect(response.body.message).toBe('Commission request submitted successfully');
      
      // Verify commission was saved in database
      const commission = await Commission.findById(response.body.commission.id);
      expect(commission).toBeTruthy();
      expect(commission.customerName).toBe('Jane Doe');
    });
  });
});

module.exports = {};
