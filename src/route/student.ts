import express, {Request, Response} from 'express';
import {
    addBatch,
    addCourses,
    getBatcheById,
    getBatches,
    getCourses,
    getCoursesById,
} from "../dao/courseDao";

import {
    getStudents, addStudent, getStudentById, deleteUserById, updateStudent,
    getStudentBatches, addStudentToBatch, addOnlyStudent
} from '../dao/studentDao';
import {IBatch, IStudent} from "../model/interfaces";

import createError from '../util/functions';

let route: express.Router = express.Router();


/////////////////////////
///students/
////////////////////////
route.get('/', (req: Request, res: Response) => {
    getStudents().then((students: IStudent[] | null) => {
        res.status(200).json(students);
    })
})

// add new student to course and batch
/*route.post('/', (req: Request, res: Response) => {
    let cid = req.body.cid;
    let bid = req.body.bid;
    let name = req.body.name;
    getBatcheById(cid, bid).then((batch: IBatch | null) => {
        addStudent(name, batch).then((student: IStudent | null) => {
            res.status(200).json(student);
        })
    })

})*/

route.post('/', (req: Request, res: Response) => {
    let name = req.body.name;
        addOnlyStudent(name).then((student: IStudent | null) => {
            res.status(200).json(student);
        })

})

/////////////////////////
///students/:id
////////////////////////
route.get('/:id', (req: Request, res: Response) => {
    let id = req.params.id;
    getStudentById(id).then((student: IStudent | null) => {
        res.status(200).json(student);
    })
})


route.delete('/:id', (req: Request, res: Response) => {
    let id = req.params.id;
    try {
        deleteUserById(id).then((result: number | null) => {
            if (result === 0) throw Error('No Student found for id ' + id);
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

    updateStudent(id, name).then((result) => {
        console.log(result)
        if (result == 0)
            throw Error("Update failed No Student found for id" + id);
        res.status(200).json(result);
    }).catch(err => {
        res.status(400).json(createError(err.toString()));
    })

})

/////////////////////////
//students/:id/batches
////////////////////////

route.get("/:id/batches", (req: Request, res: Response) => {
    let id = req.params.id;
    getStudentBatches(id).then((student: IStudent[] | null) => {
        res.status(200).json(student);
    })
})


route.post("/:id/courses/:cid/batches/:bid", (req: Request, res: Response) => {
    let id = req.params.id;
    let bid = req.params.bid;
    let cid = req.params.cid;

    getBatcheById(cid, bid).then((batch: IBatch | null) => {
        getStudentById(id).then((student: IStudent | null) => {
            addStudentToBatch(student, batch).then((result: any) => {
                console.log(result)
                res.json(result);
            })
        })
    })

})



export default route