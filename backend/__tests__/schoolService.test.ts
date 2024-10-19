import { schoolService } from '../services/schoolService';
import { sequelize, School } from '../db';

describe('School Service', () => {
    beforeEach(async () => {
        await sequelize.drop();
        await sequelize.sync()
    });

    describe('schoolService.findAll', () => {
        it('should return an empty array when no schools exist', async () => {
            const result = await schoolService.findAll();
            expect(result).toEqual([]);
        });

        it('should return all existing schools', async () => {

            await schoolService.create({ name: 'School A', decile: 5 });
            await schoolService.create({ name: 'School B', decile: 8 });

            const result = await schoolService.findAll();
            expect(result).toEqual([
                expect.objectContaining({ id: 1, name: 'School A', decile: 5 }),
                expect.objectContaining({ id: 2, name: 'School B', decile: 8 }),
            ]);
        });
    });

    describe('schoolServce.find', () => {
        it('should return undefined for a non-existing school', async () => {
            const result = await schoolService.find(999);
            expect(result).toBeNull();
        });

        it('should return the school for an existing id', async () => {
            await schoolService.create({ name: 'School A', decile: 1 });

            const result = await schoolService.find(1);
            expect(result).toEqual(expect.objectContaining({ id: 1, name: 'School A', decile: 1 }),);
        });
    });

    describe('create', () => {
        it('should create a new school and return it', async () => {
            const newSchool = await schoolService.create({ name: 'School A', decile: 1 });
            expect(newSchool).toEqual(expect.objectContaining({ name: 'School A', decile: 1 }));
            const schools = await schoolService.findAll();
            expect(schools).toContainEqual(expect.objectContaining({ name: 'School A', decile: 1 }));
        });

        it('should throw an error when name is empty', async () => {
            await expect(schoolService.create({ name: '', decile: 1 })).rejects.toThrow(
                'School Name is required and must be a non-empty string'
            );
        });

        it('should throw an error when name is a non-string', async () => {
            await expect(schoolService.create({ name: '', decile: 1 })).rejects.toThrow(
                'School Name is required and must be a non-empty string'
            );
        });

        it('should throw an error when a school with the same name already exists', async () => {
            await schoolService.create({ name: 'School A', decile: 1 });
            await expect(schoolService.create({ name: 'School A', decile: 5 })).rejects.toThrow(
                'A school with this name already exists'
            );
        });
    });
});