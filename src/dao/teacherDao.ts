import {SubjectService} from "./subjectDao";
import {models} from '../model/model'

import {ISubject, ITeacher} from '../model/interfaces'


export class TeacherService {
    public static async getTeachers():Promise<ITeacher[] | null> {
        return await models.Teacher.findAll({
            include:[{
                model:models.Subject
            }]
        })
    }

    public static async getTeacherById(id:number):Promise<ITeacher | null> {
        return await models.Teacher.findById(id,{
            include:[{
                model:models.Subject
            }]
        })
    }

    public static async deleteTeacher(id: number): Promise<number> {
        return await models.Teacher.destroy({
            where: {
                id: id
            }
        })
    }

    public static async updateTeacher(id: number, name: string): Promise<[number,ITeacher[]]> {
        return await models.Teacher.update({name: name}, {
            where: {
                id: id
            }
        })
    }

    public static addTeacher(newTeacher:ITeacher,subjectId:number):Promise<ITeacher | null> {
        return new Promise<ITeacher|null>((resolve,reject)=> {
            models.Teacher.create({
                name: newTeacher.name
            }).then((teacher:any)=>{
                SubjectService.getSubjectById(subjectId).then((subject:any)=>{
                    //teacher.addSubject(subject)
                    subject.addTeacher(teacher);
                    resolve(teacher)
                })
            })
        })
    }
}
