import { School } from '../db'
import { format } from 'date-fns';

interface SchoolAttributes {
  id?: number;
  name: string;
  decile: number;
  createdAt?: string
  updatedAt?: string
}

export const schoolService = {
  findAll: async (): Promise<SchoolAttributes[]> => {
    const schools = await School.findAll();

    return schools.map(school => ({
      id: school.id,
      name: school.name,
      decile: school.decile,
      createdAt: school.createdAt ? format(new Date(school.createdAt), 'dd/MM/yy HH:mm') : undefined,
      updatedAt: school.updatedAt ? format(new Date(school.updatedAt), 'dd/MM/yy HH:mm') : undefined,
    }));
  },

  find: async (id: string): Promise<SchoolAttributes | undefined> => {
    return await School.findByPk(id);
  },

  create: async (payload: { name: string, decile: number }): Promise<SchoolAttributes> => {
    console.log(payload)
    const name: string = payload.name
    const decile: number = payload.decile
    if (!name || typeof name !== 'string' || name.trim() === '') {
      throw new Error('School Name is required and must be a non-empty string');
    }

    const existingSchool = await School.count({ where: { name: name } });
    if (existingSchool > 0) {
      throw new Error('A school with this name already exists');
    }

    const newSchool = await School.create({
      name: name.trim(),
      decile: decile,
    })

    return newSchool
  },

  update: async (id: string, payload: { name: string, decile: number }): Promise<SchoolAttributes> => {
    if (!payload.name || typeof payload.name !== 'string' || payload.name.trim() === '') {
      throw new Error('Name must be a non-empty string');
    }

    const school = await School.findByPk(id);
    if (school) {
      try {
        const updatedSchool = await school.set(
          {
            name: payload.name,
            decile: payload.decile,
          },
        )

        await school.save()

        return updatedSchool

      } catch (error) {
        console.error('Error updating school:', error);
        throw error;
      }
    } else {
      throw new Error('School not found');
    }
  },

  remove: async (id: string): Promise<void> => {
    const school = await School.findByPk(id);
    if (!school) {
      throw new Error('School not found');
    }
    await school.destroy();
  },
};
