import express, {Request, Response} from 'express'
import {
    addBatch,
    addCourses,
    getBatcheById,
    getBatches,
    getCourses,
    getCoursesById,
    updateCourses,
    getAllBatches,
    deleteCourses
} from "../dao/courseDao";
import {IBatch, ICourse} from "../model/interfaces";
import createError from "../util/functions";

let route: express.Router = express.Router();

route.get('/batches', (req, res) => {
    getAllBatches().then((batches: IBatch[] | null) => {
        res.status(200).send(batches);
    })
});


route.get('/', (req, res) => {

    getCourses().then((courses: ICourse[] | null) => {
        res.status(200).send(courses);
    })
});

route.post('/', (req, res) => {
    let newCourse: ICourse = {
        id: 0,
        name: req.body.name
    }
    addCourses(newCourse).then((course: ICourse | null) => {
        res.status(200).send(course);
    })
});

route.get('/:id', (req, res) => {

    getCoursesById(req.params.id).then((courses: ICourse | null) => {
        res.status(200).send(courses);
    })
});

route.get('/:id/batches', (req, res) => {

    getBatches(req.params.id).then((batch: IBatch[] | null) => {
        res.status(200).send(batch);
    })
});

route.post('/:id/batches', (req, res) => {
    let newBatch: IBatch = {
        id: 0,
        name: req.body.name
    }
    addBatch(req.params.id, newBatch).then((batch: IBatch | null) => {
        res.status(200).send(batch);
    })
});

route.get('/:id/batches/:bid', (req, res) => {

    getBatcheById(req.params.id, req.params.bid).then((batch: IBatch | null) => {
        res.status(200).send(batch);
    })
});

route.delete('/:id', (req: Request, res: Response) => {
    let deleteCourse: ICourse = {
        id: req.params.id,
        name: ''
    }
    deleteCourses(deleteCourse.id).then((course: number) => {
        if (course == 0)
            throw Error("delete failed No Courses found for id " + deleteCourse.id);
        res.status(200).json({
            status: true,
            id: course
        });
    }).catch(err => {
        res.status(400).json(createError(err.toString()));
    })
});
/*
route.get('/:id/batches/:bid/lectures', (req, res) => {

    getLectures(req.params.id,req.params.bid).then((batch:IBatch|null)=>{
        res.status(200).send(batch);
    })
});
*/


export default route