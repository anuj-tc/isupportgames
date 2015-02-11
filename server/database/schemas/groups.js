var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var groupSchema = new Schema({
name: {type:String, required:true},
email: {type:String},
phone: {type:String},
contact_name: {type: String},
office_address: {type: String},
create_date: {type: Date},
modified_date: {type: Date, default: Date.now},
});


groupSchema.methods.isObject = function(value){
    if(mongoose.Types.ObjectId.isValid(value)){
        return true;
    } 
    else{
        return false;
    } 
};


var Group = mongoose.model('Group', groupSchema);
module.exports = Group;
