import { IBatch, ICourse } from "../model/interfaces";
export declare function getCourses(): Promise<ICourse[] | null>;
export declare function getAllBatches(): Promise<IBatch[] | null>;
export declare function getBatches(id: number): Promise<IBatch[] | null>;
export declare function getBatcheById(id: number, bid: number): Promise<IBatch | null>;
export declare function getCoursesById(id: number): Promise<ICourse | null>;
export declare function addCourses(newCourse: ICourse): Promise<ICourse | null>;
export declare function addBatch(batchId: number, newBatch: IBatch): Promise<IBatch | null>;
export declare function updateCourses(id: number, name: string): Promise<[number, ICourse[]]>;
export declare function deleteCourses(id: number): Promise<number>;
