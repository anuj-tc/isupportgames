var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var citySchema = new Schema({
name:{type: String, required: true},
label:{type: String, required: true},
group_city:{type: String},
country: {type: String, default: 'India'},
geo: {type: [Number], default: [0,0]},
status:{type: Boolean, default: true},
create_date: {type: Date, default: Date.now},
modified_date: {type: Date, default: Date.now},
});

//create index
citySchema.index({geo: '2dshere', status: 1});

citySchema.methods.isObject = function(value){
    if(mongoose.Types.ObjectId.isValid(value)){
        return true;
    }
    else{
        return false;
    }
};

var City = mongoose.model('City',citySchema);
module.exports = City;
