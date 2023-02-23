const MembershipFunction = require('../models/membershipfunction.model');

exports.add = function( req, res){
    let membershipFunction = new MembershipFunction(req.body)
    membershipFunction.save(function(err){
        err? res.send(err):res.send(membershipFunction)
    })
}

exports.read = function(req,res,next){
    MembershipFunction.findById(req.params.id, function (err, membershipFunction) {
            if (err) return next(err);
            res.send(membershipFunction);
        })
}

exports.update = function (req, res,next) {
    MembershipFunction.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err, membershipFunction) {
        if (err) return next(err);
        res.send(membershipFunction);
    });
};

exports.delete = function (req, res,next) {
    MembershipFunction.findByIdAndRemove(req.params.id, function (err) {
        if (err) return next(err);
        res.send(req.params.id);
    })
};

exports.index = function (req, res,next) {
    MembershipFunction.find({}, function (err, membershipFunction) {
        if (err) return next(err);
        res.send(membershipFunction);
    })
};