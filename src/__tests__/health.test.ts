import request from 'supertest';
import express from 'express';
import healthController from '../controllers/healthController';
import { describe, it, expect } from 'vitest';

describe('GET /api/health', () => {
  it('returns 200 and a status object', async () => {
    const app = express();
    app.get('/api/health', healthController);
    const res = await request(app).get('/api/health').expect(200);
    expect(res.body).toHaveProperty('status', 'ok');
    expect(typeof res.body.uptime).toBe('number');
  });
});
