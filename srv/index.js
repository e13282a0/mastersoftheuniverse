import bodyParser from "express";

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

    const membership_function_controller = require('./controllers/membershipfunction.controller');
    app.get('/api/membershipfunctions/', membership_function_controller.index);
    app.get('/api/membershipfunctions/:id', membership_function_controller.read);
    app.post('/api/membershipfunctions/', membership_function_controller.add);
    app.put('/api/membershipfunctions/:id', membership_function_controller.update);
    app.delete('/api/membershipfunctions/:id', membership_function_controller.delete);
}
