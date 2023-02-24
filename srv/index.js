import bodyParser from "express";
import variables_controller from "./controllers/variables.controller";

// import socketIO from "socket.io";

export default (app, http) => {
    const mongoose = require('mongoose');
    let dev_db_url = 'mongodb://localhost:27017';
    let mongoDB = process.env.MONGODB_URI || dev_db_url;
    mongoose.connect(mongoDB, {
        "auth": { "authSource": "root" },
        "user": "root",
        "pass": "root"
    });
    mongoose.Promise = global.Promise;
    let db = mongoose.connection;
    db.on('error', console.error.bind(console, 'MongoDB connection error:'));

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: false}));

    const variables_controller = require('./controllers/variables.controller');
    app.get('/api/variables/', variables_controller.index);
    app.post('/api/variables/', variables_controller.add);
    app.get('/api/variables/:id', variables_controller.read);
    app.put('/api/variables/:id', variables_controller.update);
    app.delete('/api/variables/:id', variables_controller.delete);
}
