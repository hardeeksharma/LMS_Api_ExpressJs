import { IBatch, IStudent } from "../model/interfaces";
export declare function addStudent(name: string, batch: any): Promise<IBatch | IStudent | null>;
export declare function addOnlyStudent(name: string): Promise<IBatch | IStudent | null>;
export declare function getStudents(): Promise<IStudent[] | null>;
export declare function getStudentById(id: number): Promise<IStudent | null>;
export declare function deleteUserById(id: number): Promise<number | null>;
export declare function updateStudent(id: number, name: string): Promise<any | null>;
export declare function getStudentBatches(id: number): Promise<IStudent[] | null>;
export declare function addStudentToBatch(stu: any, batch: any): Promise<IBatch | IStudent | null>;
