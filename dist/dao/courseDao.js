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
function getCourses() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield model_1.models.Course.findAll({
            include: [{
                    model: model_1.models.Batch,
                    attributes: ['id', 'name'],
                }]
        });
    });
}
exports.getCourses = getCourses;
function getAllBatches() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield model_1.models.Batch.findAll({
            include: [{
                    model: model_1.models.Course,
                    attributes: ['id', 'name'],
                }]
        });
    });
}
exports.getAllBatches = getAllBatches;
function getBatches(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield model_1.models.Batch.findAll({
            include: [{
                    model: model_1.models.Course,
                    where: {
                        id: id
                    },
                    attributes: ['id', 'name'],
                }]
        });
    });
}
exports.getBatches = getBatches;
function getBatcheById(id, bid) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield model_1.models.Batch.findOne({
            where: {
                id: bid
            },
            include: [{
                    model: model_1.models.Course,
                    where: {
                        id: id
                    },
                    attributes: ['id', 'name'],
                }]
        });
    });
}
exports.getBatcheById = getBatcheById;
function getCoursesById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(id);
        return yield model_1.models.Course.findById(id);
    });
}
exports.getCoursesById = getCoursesById;
function addCourses(newCourse) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield model_1.models.Course.create({
            name: newCourse.name
        });
    });
}
exports.addCourses = addCourses;
function addBatch(batchId, newBatch) {
    return new Promise((resolve, reject) => {
        model_1.models.Batch.create({
            name: newBatch.name
        }).then((batch) => {
            getCoursesById(batchId).then((course) => {
                course.addBatch(batch);
                resolve(batch);
            });
        });
    });
}
exports.addBatch = addBatch;
function updateCourses(id, name) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield model_1.models.Course.update({
            name: name
        }, {
            where: {
                id: id
            }
        });
    });
}
exports.updateCourses = updateCourses;
function deleteCourses(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield model_1.models.Course.destroy({
            where: {
                id: id
            }
        });
    });
}
exports.deleteCourses = deleteCourses;
