import express, {Request, Response} from 'express';
import {SubjectService} from "../dao/subjectDao";
import createError from '../util/functions';
import {ISubject} from "../model/interfaces";
import {deleteUserById} from "../dao/studentDao";

let route: express.Router = express.Router();

route.get('/', (req: Request, res: Response) => {
    SubjectService.getAllSubjects().then((subjects: ISubject[] | null) => {
        res.status(200).json(subjects);
    })
})

route.post('/courses/:cid', (req: Request, res: Response) => {
    let cid = req.params.cid;
    let name = req.body.name;
    SubjectService.addNewSubject(cid, name).then((subject: ISubject | null) => {
        res.status(200).json(subject);
    })
})


route.get('/:id', (req: Request, res: Response) => {

    let id = req.params.id;

    SubjectService.getSubjectById(id).then((subjects: ISubject | null) => {
        res.status(200).json(subjects);
    })
})

route.delete('/:id', (req: Request, res: Response) => {
    let id = req.params.id;
    try {

        SubjectService.deleteSubject(id).then((result: number | null) => {
            if (result === 0) throw Error('No Subject found for id ' + id);
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
        SubjectService.updateSubject(id, name).then((result: [number, ISubject[]]) => {
            if (result[0] == 0) throw Error('No Subject found for id ' + id);
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


route.get('/:id/teachers', (req: Request, res: Response) => {

    let id = req.params.id;
    SubjectService.getSubjectTeachers(id).then((teachers: ISubject | null) => {
        res.status(200).json(teachers);
    })
})
export default route;