const mongoose = require('mongoose');

const Schema = mongoose.Schema;


let VariableSchema = new Schema({
    name: String,
    variable: String,
    source:String,
    min:Number,
    max:Number,
    functions:[Object],
});


// Export the model
module.exports = mongoose.model('Variable', VariableSchema);