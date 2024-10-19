import request from 'supertest';
import app from '../app';

describe('Server', () => {
    it('should return 404 for undefined routes', async () => {
        const response = await request(app).get('/undefined-route');
        expect(response.status).toBe(404);
    });
});