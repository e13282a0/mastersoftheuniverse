import express from 'express';
import bodyParser from "express";
import membership_function_controller from "./controllers/membershipfunction.controller";

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
    app.get('/api/membership_function/index', membership_function_controller.index);
    app.get('/api/membership_function/:id', membership_function_controller.read);
    app.post('/api/membership_function/', membership_function_controller.new);
    app.put('/api/membership_function/:id', membership_function_controller.update);
    app.delete('/api/membership_function/:id', membership_function_controller.delete);
    //
    // app.post('/bar', (req, res) => {
    //   res.json(req.body);
    // });
    //
    // optional support for socket.io
    //
    // let io = socketIO(http);
    // io.on("connection", client => {
    //   client.on("message", function(data) {
    //     // do something
    //   });
    //   client.emit("message", "Welcome");
    // });
}
