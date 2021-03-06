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
const courseDao_1 = require("./courseDao");
class SubjectService {
    static getAllSubjects() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield model_1.models.Subject.findAll({
                include: [
                    {
                        model: model_1.models.Teacher
                    },
                ]
            });
        });
    }
    static getSubjectById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield model_1.models.Subject.findById(id, {
                attributes: ['id', 'name'],
                include: [
                    {
                        model: model_1.models.Teacher
                    }
                ]
            });
        });
    }
    static deleteSubject(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield model_1.models.Subject.destroy({
                where: {
                    id: id
                }
            });
        });
    }
    static updateSubject(id, name) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield model_1.models.Subject.update({ name: name }, {
                where: {
                    id: id
                }
            });
        });
    }
    static addNewSubject(courseId, name) {
        return new Promise((resolve, reject) => {
            model_1.models.Subject.create({
                name: name
            }).then((subject) => {
                courseDao_1.getCoursesById(courseId).then((course) => {
                    console.log(course);
                    //course.addSubject(subject);
                    subject.addCourse(course);
                    resolve(subject);
                });
            });
        });
    }
    static getSubjectTeachers(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield model_1.models.Subject.findById(id, {
                attributes: [],
                include: [{
                        model: model_1.models.Teacher
                    }]
            });
        });
    }
}
exports.SubjectService = SubjectService;
