"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const teacherDao_1 = require("../dao/teacherDao");
const functions_1 = __importDefault(require("../util/functions"));
let route = express_1.default.Router({ mergeParams: true });
route.get('/', (req, res) => {
    teacherDao_1.TeacherService.getTeachers().then((teachers) => {
        res.status(200).send(teachers);
    });
});
route.get('/:id', (req, res) => {
    teacherDao_1.TeacherService.getTeacherById(req.params.id).then((teacher) => {
        res.status(200).send(teacher);
    });
});
route.delete('/:id', (req, res) => {
    let id = req.params.id;
    try {
        teacherDao_1.TeacherService.deleteTeacher(id).then((result) => {
            if (result === 0)
                throw Error('No Teacher found for id ' + id);
            res.status(200).json({
                success: true,
                id: result
            });
        }).catch(err => {
            res.status(400).json(functions_1.default(err.toString()));
        });
    }
    catch (err) {
        res.status(400).json(functions_1.default(err.toString()));
    }
});
route.put('/:id', (req, res) => {
    let id = req.params.id;
    let name = req.body.name;
    try {
        teacherDao_1.TeacherService.updateTeacher(id, name).then((result) => {
            if (result[0] == 0)
                throw Error('No Teacher found for id ' + id);
            res.status(200).json({
                success: true,
                id: result
            });
        }).catch(err => {
            res.status(400).json(functions_1.default(err.toString()));
        });
    }
    catch (err) {
        res.status(400).json(functions_1.default(err.toString()));
    }
});
route.post('/:sid', (req, res) => {
    let newTeacher = {
        id: 0,
        name: req.body.name
    };
    console.log(req.body.name);
    teacherDao_1.TeacherService.addTeacher(newTeacher, req.params.sid).then((teacher) => {
        res.status(200).send(teacher);
    });
});
exports.default = route;
