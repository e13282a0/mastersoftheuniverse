const mongoose = require('mongoose');
const {FUZZY_MEMBERSHIP_FUNCTION_TYPE, VARIABLE_SOURCES} = require("../../constants");
const Schema = mongoose.Schema;


let VariableSchema = new Schema({
    name: String,
    variable: String,
    source:VARIABLE_SOURCES,
    min:Number,
    max:Number,
    functions:[
        {
            name:String,
            type: FUZZY_MEMBERSHIP_FUNCTION_TYPE,
            values:[Number]
        }
    ],
});


// Export the model
module.exports = mongoose.model('Variable', VariableSchema);