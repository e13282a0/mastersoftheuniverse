const mongoose = require('mongoose');
const {VARIABLE_SOURCES} = require("../../constants");
const Schema = mongoose.Schema;


let VariableSchema = new Schema({
    name: String,
    variable: String,
    source:VARIABLE_SOURCES,
    min:Number,
    max:Number,
    functions:[Object],
});


// Export the model
module.exports = mongoose.model('Variable', VariableSchema);