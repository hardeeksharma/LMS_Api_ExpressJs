import express from "express";
import session from "express-session";
import path from "path"
const app = express();
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

app.use(session({
    secret: 'X8suo(%;~>e~dlhrnKK|Gaqm7D/p?i!%KBeu-u|Nd,^2~S*AyI 6[B8?awlUEBnH',
    cookie: {maxAge: 60000},
    resave: false,
    saveUninitialized: true
}))

app.use('/', express.static(path.join(__dirname, 'public')));

app.listen(7777, () => {
    console.log("Server started @ 5555");
})