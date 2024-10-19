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
            const result = await schoolService.find('999');
            expect(result).toBeNull();
        });

        it('should return the school for an existing id', async () => {
            await schoolService.create({ name: 'School A', decile: 1 });

            const result = await schoolService.find('1');
            expect(result).toEqual(expect.objectContaining({ id: 1, name: 'School A', decile: 1 }),);
        });
    });

    describe('schoolService.create', () => {
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
    describe('schoolService.update', () => {
        beforeEach(async () => {
            await School.bulkCreate([
                { name: 'School A', decile: 5 },
                { name: 'School B', decile: 8 },
            ]);
        });
        it('should update a school successfully', async () => {
            const updatedSchool = await schoolService.update('1', { name: 'Updated School A', decile: 6 });
            expect(updatedSchool).toEqual(
                expect.objectContaining({
                    id: 1,
                    name: 'Updated School A',
                    decile: 6,
                })
            );
        });

        it('should throw an error if the school is not found', async () => {
            await expect(schoolService.update('999', { name: 'Nonexistent School', decile: 7 })).rejects.toThrow('School not found');
        });

        it('should throw an error if the name is not a non-empty string', async () => {
            await expect(schoolService.update('1', { name: '', decile: 6 })).rejects.toThrow('Name must be a non-empty string');
            await expect(schoolService.update('1', { name: 123 as any, decile: 6 })).rejects.toThrow('Name must be a non-empty string');
        });

        it('should throw an error if name is not provided', async () => {
            await expect(schoolService.update('1', { name: undefined as any, decile: 6 })).rejects.toThrow('Name must be a non-empty string');
        });

        it('should update the decile if provided', async () => {
            const updatedSchool = await schoolService.update('1', { name: 'School A', decile: 9 });
            expect(updatedSchool).toEqual(
                expect.objectContaining({
                    id: 1,
                    name: 'School A',
                    decile: 9,
                })
            );
        });
    });
    describe('schoolService.remove', () => {
        beforeEach(async () => {
            await School.bulkCreate([
                { name: 'School A', decile: 5 },
                { name: 'School B', decile: 8 },
            ]);
        });
        it('should remove a school successfully', async () => {
            await schoolService.remove('1');

            const school = await School.findByPk('1');
            expect(school).toBeNull();
        });

        it('should throw an error if the school does not exist', async () => {
            await expect(schoolService.remove('999')).rejects.toThrow('School not found');
        });

        it('should remove the correct school', async () => {
            await schoolService.remove('1');

            const schoolA = await School.findByPk('1');
            const schoolB = await School.findByPk('2');

            expect(schoolA).toBeNull();
            expect(schoolB).not.toBeNull();
        });
    });
});