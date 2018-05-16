import express, {Request, Response} from 'express'
import {ISubject, ITeacher} from "../model/interfaces";
import {TeacherService} from "../dao/teacherDao";
import {SubjectService} from "../dao/subjectDao";
import createError from '../util/functions';

let route: express.Router = express.Router({mergeParams: true});

route.get('/', (req, res) => {

    TeacherService.getTeachers().then((teachers: ITeacher[] | null) => {
        res.status(200).send(teachers);
    })
});

route.get('/:id', (req, res) => {

    TeacherService.getTeacherById(req.params.id).then((teacher: ITeacher | null) => {
        res.status(200).send(teacher);
    })
});

route.delete('/:id', (req: Request, res: Response) => {
    let id = req.params.id;
    try {

        TeacherService.deleteTeacher(id).then((result: number) => {
            if (result === 0) throw Error('No Teacher found for id ' + id);
            res.status(200).json({
                success: true,
                id: result
            });
        }).catch(err => {
            res.status(400).json(createError(err.toString()));
        })
    } catch (err) {
        res.status(400).json(createError(err.toString()));
    }
})


route.put('/:id', (req: Request, res: Response) => {

    let id = req.params.id;
    let name = req.body.name;
    try {
        TeacherService.updateTeacher(id, name).then((result: [number, ITeacher[]]) => {
            if (result[0] == 0) throw Error('No Teacher found for id ' + id);
            res.status(200).json({
                success: true,
                id: result
            });
        }).catch(err => {
            res.status(400).json(createError(err.toString()));
        })
    } catch (err) {
        res.status(400).json(createError(err.toString()));
    }
})

route.post('/:sid', (req, res) => {
    let newTeacher: ITeacher = {
        id: 0,
        name: req.body.name
    }
    console.log(req.body.name);
    TeacherService.addTeacher(newTeacher, req.params.sid).then((teacher: ITeacher | null) => {
        res.status(200).send(teacher);
    })
});
export default route