import express from "express";
import session from "express-session";
import path from "path"

import {models, db} from "./model/model";
import {Request, Response} from 'express'
import studentRoute from "./route/student";
import cbRoute from "./route/course";
import subjectRoute from "./route/subject";
import teacherRoute from "./route/teacher";

const cors = require('cors')

const app = express();
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

app.use(cors());
app.use(session({
    secret: 'X8suo(%;~>e~dlhrnKK|Gaqm7D/p?i!%KBeu-u|Nd,^2~S*AyI 6[B8?awlUEBnH',
    cookie: {maxAge: 60000},
    resave: false,
    saveUninitialized: true
}))


app.use('/', express.static(path.join(__dirname, '../public')));

app.get("/", (req: Request, res: Response) => {
    res.sendFile('index.html');
});

app.use('/courses', cbRoute);
app.use('/students', studentRoute);
app.use('/subjects', subjectRoute);
app.use('/teachers', teacherRoute);

app.listen(process.env.PORT || 7777, () => {
    /*db.sync({force: true}).then(() => {
        console.log("db synced");
    });*/
    console.log("Server started");
})