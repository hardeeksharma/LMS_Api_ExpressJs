"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const courseDao_1 = require("../dao/courseDao");
const functions_1 = __importDefault(require("../util/functions"));
let route = express_1.default.Router();
route.get('/batches', (req, res) => {
    courseDao_1.getAllBatches().then((batches) => {
        res.status(200).send(batches);
    });
});
route.get('/', (req, res) => {
    courseDao_1.getCourses().then((courses) => {
        res.status(200).send(courses);
    });
});
route.post('/', (req, res) => {
    let newCourse = {
        id: 0,
        name: req.body.name
    };
    courseDao_1.addCourses(newCourse).then((course) => {
        res.status(200).send(course);
    });
});
route.get('/:id', (req, res) => {
    courseDao_1.getCoursesById(req.params.id).then((courses) => {
        res.status(200).send(courses);
    });
});
route.get('/:id/batches', (req, res) => {
    courseDao_1.getBatches(req.params.id).then((batch) => {
        res.status(200).send(batch);
    });
});
route.post('/:id/batches', (req, res) => {
    let newBatch = {
        id: 0,
        name: req.body.name
    };
    courseDao_1.addBatch(req.params.id, newBatch).then((batch) => {
        res.status(200).send(batch);
    });
});
route.get('/:id/batches/:bid', (req, res) => {
    courseDao_1.getBatcheById(req.params.id, req.params.bid).then((batch) => {
        res.status(200).send(batch);
    });
});
route.delete('/:id', (req, res) => {
    let deleteCourse = {
        id: req.params.id,
        name: ''
    };
    courseDao_1.deleteCourses(deleteCourse.id).then((course) => {
        if (course == 0)
            throw Error("delete failed No Courses found for id " + deleteCourse.id);
        res.status(200).json({
            status: true,
            id: course
        });
    }).catch(err => {
        res.status(400).json(functions_1.default(err.toString()));
    });
});
/*
route.get('/:id/batches/:bid/lectures', (req, res) => {

    getLectures(req.params.id,req.params.bid).then((batch:IBatch|null)=>{
        res.status(200).send(batch);
    })
});
*/
exports.default = route;
