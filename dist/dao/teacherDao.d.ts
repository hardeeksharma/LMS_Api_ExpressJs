import { ITeacher } from '../model/interfaces';
export declare class TeacherService {
    static getTeachers(): Promise<ITeacher[] | null>;
    static getTeacherById(id: number): Promise<ITeacher | null>;
    static deleteTeacher(id: number): Promise<number>;
    static updateTeacher(id: number, name: string): Promise<[number, ITeacher[]]>;
    static addTeacher(newTeacher: ITeacher, subjectId: number): Promise<ITeacher | null>;
}
