"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const courseDao_1 = require("../dao/courseDao");
const studentDao_1 = require("../dao/studentDao");
const functions_1 = __importDefault(require("../util/functions"));
let route = express_1.default.Router();
/////////////////////////
///students/
////////////////////////
route.get('/', (req, res) => {
    studentDao_1.getStudents().then((students) => {
        res.status(200).json(students);
    });
});
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
route.post('/', (req, res) => {
    let name = req.body.name;
    studentDao_1.addOnlyStudent(name).then((student) => {
        res.status(200).json(student);
    });
});
/////////////////////////
///students/:id
////////////////////////
route.get('/:id', (req, res) => {
    let id = req.params.id;
    studentDao_1.getStudentById(id).then((student) => {
        res.status(200).json(student);
    });
});
route.delete('/:id', (req, res) => {
    let id = req.params.id;
    try {
        studentDao_1.deleteUserById(id).then((result) => {
            if (result === 0)
                throw Error('No Student found for id ' + id);
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
    studentDao_1.updateStudent(id, name).then((result) => {
        console.log(result);
        if (result == 0)
            throw Error("Update failed No Student found for id" + id);
        res.status(200).json(result);
    }).catch(err => {
        res.status(400).json(functions_1.default(err.toString()));
    });
});
/////////////////////////
//students/:id/batches
////////////////////////
route.get("/:id/batches", (req, res) => {
    let id = req.params.id;
    studentDao_1.getStudentBatches(id).then((student) => {
        res.status(200).json(student);
    });
});
route.post("/:id/courses/:cid/batches/:bid", (req, res) => {
    let id = req.params.id;
    let bid = req.params.bid;
    let cid = req.params.cid;
    courseDao_1.getBatcheById(cid, bid).then((batch) => {
        studentDao_1.getStudentById(id).then((student) => {
            studentDao_1.addStudentToBatch(student, batch).then((result) => {
                console.log(result);
                res.json(result);
            });
        });
    });
});
exports.default = route;
