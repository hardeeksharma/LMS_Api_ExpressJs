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
const subjectDao_1 = require("./subjectDao");
const model_1 = require("../model/model");
class TeacherService {
    static getTeachers() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield model_1.models.Teacher.findAll({
                include: [{
                        model: model_1.models.Subject
                    }]
            });
        });
    }
    static getTeacherById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield model_1.models.Teacher.findById(id, {
                include: [{
                        model: model_1.models.Subject
                    }]
            });
        });
    }
    static deleteTeacher(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield model_1.models.Teacher.destroy({
                where: {
                    id: id
                }
            });
        });
    }
    static updateTeacher(id, name) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield model_1.models.Teacher.update({ name: name }, {
                where: {
                    id: id
                }
            });
        });
    }
    static addTeacher(newTeacher, subjectId) {
        return new Promise((resolve, reject) => {
            model_1.models.Teacher.create({
                name: newTeacher.name
            }).then((teacher) => {
                subjectDao_1.SubjectService.getSubjectById(subjectId).then((subject) => {
                    //teacher.addSubject(subject)
                    subject.addTeacher(teacher);
                    resolve(teacher);
                });
            });
        });
    }
}
exports.TeacherService = TeacherService;
