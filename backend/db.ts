
import { Sequelize, Model, DataTypes } from 'sequelize'

if (!process.env.DB_PATH) {
    throw new Error("DB_PATH is missing");
}

export const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: process.env.DB_PATH
});

export class School extends Model {
    public id: number;
    public name: string;
    public decile!: number;
}
School.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: DataTypes.STRING,
    decile: DataTypes.NUMBER,
}, { sequelize, modelName: 'School', timestamps: true });