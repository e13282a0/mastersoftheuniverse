const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let MembershipFunctionSchema = new Schema({
    variable: {type: String, required: true, max: 100},
    source:['mqtt','opcua'],
    boundaries:{
        min:Number,
        max:Number
    },
    functions:[
        {
            type: ['constant','grade','reverse','sigmoid','trapezoid','triangle'],
            values:[Number]
        }
    ],
});


// Export the model
module.exports = mongoose.model('MembershipFunction', MembershipFunctionSchema);