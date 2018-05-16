"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const model_1 = require("../model/model");
let Student = model_1.models.Student;
function addStudent(name, batch) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            Student.create({ name: name }).then((student) => {
                //batch.addStudent(student);
                student.addBatch(batch);
                resolve(student);
            });
        });
    });
}
exports.addStudent = addStudent;
function addOnlyStudent(name) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            Student.create({ name: name }).then((student) => {
                resolve(student);
            });
        });
    });
}
exports.addOnlyStudent = addOnlyStudent;
function getStudents() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield model_1.models.Student.findAll({
            include: [{
                    model: model_1.models.Batch,
                    attributes: ['id', 'name']
                }]
        });
    });
}
exports.getStudents = getStudents;
function getStudentById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield model_1.models.Student.findById(id);
    });
}
exports.getStudentById = getStudentById;
function deleteUserById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield model_1.models.Student.destroy({
            where: {
                id: id
            }
        });
    });
}
exports.deleteUserById = deleteUserById;
function updateStudent(id, name) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield Student.update({
            name: name
        }, {
            where: {
                id: id
            }
        });
    });
}
exports.updateStudent = updateStudent;
function getStudentBatches(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield Student.findAll({
            where: {
                id: id
            },
            attributes: ['id', 'name'],
            include: [{
                    model: model_1.models.Batch,
                    attributes: ['id', 'name'],
                    through: { attributes: [] }
                }]
        });
    });
}
exports.getStudentBatches = getStudentBatches;
function addStudentToBatch(stu, batch) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield batch.addStudent(stu);
    });
}
exports.addStudentToBatch = addStudentToBatch;
