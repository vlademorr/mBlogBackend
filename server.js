const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const MongoStore = require("connect-mongo")(session);
const routes = require('./routes');
const cookieParser = require('cookie-parser');
const cors = require("cors");
require('./passport-strategy/local-strategy');

const app = express();

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
    );
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, HEAD');
    next();
});
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(
    cors({
        credentials: true,
        origin: "http://localhost:3000"
    })
);
app.use(session({
    resave: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
    cookie: {expires: 24 * 60 * 60 * 1000},
    secret: "health to death people",
    name: "__session"
}))
app.use(passport.initialize())
app.use(passport.session())

routes(app);
mongoose.connect('mongodb://localhost:27017', {dbName: 'mariannaBlog'})
.then(() => {
        app.listen(4000, () => {
            console.log('server started')
        });
    })
    .catch((err) => {
        return console.log(err);
    });