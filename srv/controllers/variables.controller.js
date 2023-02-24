const Variable = require('../models/variable.model');

exports.add = function( req, res){
    let variable = new Variable(req.body)
    variable.save(function(err){
        err? res.send(err):res.send(variable)
    })
}

exports.read = function(req,res,next){
    Variable.findById(req.params.id, function (err, variable) {
            if (err) return next(err);
            res.send(variable);
        })
}

exports.update = function (req, res,next) {
    Variable.findByIdAndUpdate(req.params.id, {$set: req.body},{new: true}, function (err, variable) {
        if (err) return next(err);
        res.send(variable);
    });
};

exports.delete = function (req, res,next) {
    Variable.findByIdAndRemove(req.params.id, function (err) {
        if (err) return next(err);
        res.send(req.params.id);
    })
};

exports.index = function (req, res,next) {
    Variable.find({}, function (err, variable) {
        if (err) return next(err);
        res.send(variable);
    })
};