import { School } from '../db'

interface SchoolAttributes {
  id?: number;
  name: string;
  decile: number;
}

export const schoolService = {
  findAll: async (): Promise<SchoolAttributes[]> => {
    return School.findAll();
  },

  find: async (id: number): Promise<SchoolAttributes | undefined> => {
    return School.findByPk(id);
  },

  create: async (data: { name: string, decile: number }): Promise<SchoolAttributes> => {
    const name: string = data['name']
    const decile: number = data['decile']
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
  }
}
