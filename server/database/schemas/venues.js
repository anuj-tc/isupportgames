var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var venueSchema = new Schema({
name: {type: String, required: true},
label: String,
email: String,
city:  {type: Schema.ObjectId, ref: 'City', required: true},
group:  {type: Schema.ObjectId, ref: 'Group'},
address: {type: String, required: true},
geo:[],
type: [],
status: {type: Boolean, default: true},
create_date: {type: Date, default: Date.now},
modified_date: {type: Date, default: Date.now},
});

venueSchema.index({geo: '2dshere', status: 1});


venueSchema.methods.isObject = function(value){
    if(mongoose.Types.ObjectId.isValid(value)){
        return true;
    }
    else{
        return false;
    }
};

var Venue = mongoose.model('Venue', venueSchema);
module.exports = Venue;
