import {models} from '../model/model';
import {IBatch, IStudent} from "../model/interfaces";
import {accessSync} from "fs";

let Student = models.Student;

export async function addStudent(name: string, batch: any): Promise<IBatch | IStudent | null> {

    return new Promise<IStudent | null>((resolve, reject) => {
        Student.create({name: name}).then((student: any) => {
            //batch.addStudent(student);
            student.addBatch(batch);
            resolve(student);
        })
    })
}

export async function addOnlyStudent(name: string): Promise<IBatch | IStudent | null> {

    return new Promise<IStudent | null>((resolve, reject) => {
        Student.create({name: name}).then((student: IStudent) => {
            resolve(student);
        })
    })
}

export async function getStudents(): Promise<IStudent[] | null> {
    return await models.Student.findAll({
        include: [{
            model: models.Batch,
            attributes: ['id', 'name']
        }]
    })
}

export async function getStudentById(id: number): Promise<IStudent | null> {
    return await models.Student.findById(id);
}

export async function deleteUserById(id: number): Promise<number | null> {

    return await  models.Student.destroy({
        where: {
            id: id
        }
    });
}

export async function updateStudent(id: number, name: string): Promise<any | null> {
    return await Student.update({
        name: name
    }, {
        where: {
            id: id
        }
    });
}

export async function getStudentBatches(id: number): Promise<IStudent[] | null> {
    return await Student.findAll({
        where: {
            id: id
        },
        attributes: ['id', 'name'],
        include: [{
            model: models.Batch,
            attributes: ['id', 'name'],
            through: {attributes: []}
        }]
    })
}

export async function addStudentToBatch(stu: any, batch: any): Promise<IBatch | IStudent | null> {
    return await batch.addStudent(stu);
}