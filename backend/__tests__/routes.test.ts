import request from 'supertest';
import { sequelize, School } from '../db';
import app from '../app';

describe('School Routes', () => {
    beforeEach(async () => {
        await sequelize.drop();
        await sequelize.sync()
        await School.bulkCreate([
            { name: 'School A', decile: 5 },
            { name: 'School B', decile: 8 },
        ]);
    });

    it('should create a new school', async () => {
        const response = await request(app)
            .post('/api/school/')
            .send({ name: 'School C', decile: 7 });

        expect(response.status).toBe(201);
        expect(response.body).toEqual(
            expect.objectContaining({
                id: expect.any(Number), // Assuming id is auto-generated
                name: 'School C',
                decile: 7,
            })
        );
    });

    it('should get all schools', async () => {
        const response = await request(app).get('/api/school/'); // Adjust the path as necessary

        expect(response.status).toBe(200);
        expect(response.body).toEqual([
            expect.objectContaining({ id: 1, name: 'School A', decile: 5 }),
            expect.objectContaining({ id: 2, name: 'School B', decile: 8 }),
        ]);
    });

    it('should get a single school by id', async () => {
        const response = await request(app).get('/api/school/1'); // Adjust the path as necessary

        expect(response.status).toBe(200);
        expect(response.body).toEqual(expect.objectContaining({
            id: 1,
            name: 'School A',
            decile: 5,
        }));
    });

    it('should return 404 if school not found', async () => {
        const response = await request(app).get('/api/school/999'); // Assuming this ID doesn't exist

        expect(response.status).toBe(404);
        expect(response.body).toEqual({ error: 'School not found' });
    });

    it('should update a school', async () => {
        const response = await request(app)
            .put('/api/school/1') // Adjust the path as necessary
            .send({ name: 'Updated School A', decile: 6 });

        expect(response.status).toBe(200);
        expect(response.body).toEqual(
            expect.objectContaining({
                id: 1,
                name: 'Updated School A',
                decile: 6,
            })
        );
    });

    it('should return 404 when updating a non-existent school', async () => {
        const response = await request(app)
            .put('/api/school/999') // Assuming this ID doesn't exist
            .send({ name: 'Nonexistent School', decile: 7 });

        expect(response.status).toBe(404);
        expect(response.body).toEqual({ error: 'School not found' });
    });

    it('should delete a school successfully', async () => {
        const response = await request(app).delete('/api/school/1'); // Adjust the path as necessary

        expect(response.status).toBe(200);
        expect(response.body).toEqual({ message: 'School deleted successfully' });

        // Verify that the school has been deleted
        const school = await School.findByPk(1);
        expect(school).toBeNull();
    });

    it('should return 404 when deleting a non-existent school', async () => {
        const response = await request(app).delete('/api/school/999'); // Assuming this ID doesn't exist

        expect(response.status).toBe(404);
        expect(response.body).toEqual({ error: 'School not found' });
    });
});