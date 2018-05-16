/// <reference types="sequelize" />
import Sequelize from 'sequelize';
import { DataTypeAbstract, DefineAttributeColumnOptions } from "sequelize";
import { IBatch, ICourse, Ilecture, IStudent, ITeacher } from './interfaces';
import { db } from "../db/config";
declare global  {
    type SequelizeAttributes<T extends {
        [key: string]: any;
    }> = {
        [P in keyof T]: string | DataTypeAbstract | DefineAttributeColumnOptions;
    };
}
declare const models: {
    Batch: Sequelize.Model<IBatch, any>;
    Course: Sequelize.Model<ICourse, any>;
    Student: Sequelize.Model<IStudent, any>;
    Subject: Sequelize.Model<Ilecture, any>;
    Teacher: Sequelize.Model<ITeacher, any>;
    Lecture: Sequelize.Model<Ilecture, any>;
};
export { models, db };
