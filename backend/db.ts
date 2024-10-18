
import express from 'express';
import { Sequelize, Model, DataTypes } from 'sequelize'

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite'
});

class School extends Model { }
School.init({
    name: DataTypes.STRING,
    userId: DataTypes.NUMBER,
}, { sequelize, modelName: 'school' });

class User extends Model { }
User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
}, { sequelize, modelName: 'user' })

export default sequelize