import Sequelize from 'sequelize';
import { DataTypeAbstract, DefineAttributeColumnOptions } from "sequelize";
import {IBatch,ICourse,Ilecture,IStudent,ISubject,ITeacher} from './interfaces'
import {db} from "../db/config";

declare global {
    type SequelizeAttributes<T extends { [key: string]: any }> = {
        [P in keyof T]: string | DataTypeAbstract | DefineAttributeColumnOptions;
    };
}

const batchAttr: SequelizeAttributes<IBatch> = {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name:Sequelize.STRING,
};
const Batch = db.define<IBatch,any>('Batch', batchAttr);


const courseAttr: SequelizeAttributes<ICourse> = {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name:Sequelize.STRING,
};
const Course = db.define<ICourse,any>('Course', courseAttr);


const lectureAttr: SequelizeAttributes<Ilecture> = {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: Sequelize.STRING,
};
const Lecture= db.define<Ilecture,any>('lecture', lectureAttr);


const studentAttr: SequelizeAttributes<IStudent> = {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: Sequelize.STRING,
};
const Student= db.define<IStudent,any>('student', studentAttr);


const teacherAttr: SequelizeAttributes<Ilecture> = {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: Sequelize.STRING,
};
const Teacher= db.define<ITeacher,any>('teacher', teacherAttr);


const subjectAttr: SequelizeAttributes<ISubject> = {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: Sequelize.STRING,
};
const Subject= db.define<Ilecture,any>('subject', subjectAttr);

/*Course.hasMany(Subject);
Subject.belongsTo(Course);*/

Course.belongsToMany(Subject,{through: 'course_subject',onDelete : 'cascade'});
Subject.belongsToMany(Course,{through: 'course_subject',onDelete : 'cascade'});


Course.hasMany(Batch);
Batch.belongsTo(Course);

Batch.hasMany(Lecture);
Lecture.belongsTo(Batch);

Subject.hasMany(Teacher);
Teacher.belongsTo(Subject);

Lecture.belongsTo(Subject,{as:'subject'});
Lecture.belongsTo(Teacher,{as:'teacher'});

Student.belongsToMany(Batch,{through:'student_batch',onDelete:'cascade',hooks:true});
Batch.belongsToMany(Student,{through:'student_batch',onDelete:'cascade',hooks:true});
/*

Vendor.belongsToMany(Products,{through: 'Product_Vendor',onDelete : 'cascade'});
Products.belongsToMany(Vendor,{through: 'Product_Vendor',onDelete : 'cascade'});

Cart.belongsTo(Products);
Products.hasMany(Cart);

Cart.belongsToMany(User,{through: 'cart_user',onDelete : 'cascade'});
*/

(async function(){
    try{
        await db.authenticate()
        await db.sync({alter: false})
            .then(() => {
                console.log("Database Synchronised");
            })
            .catch((err) => {
                console.log("Error setting up Database");
                console.error(err);
            });
    }
    catch (e) {
        console.log(e)
    }
})()

const models = {
   Batch, Course, Student,Subject,Teacher,Lecture
}

export { models,db}

