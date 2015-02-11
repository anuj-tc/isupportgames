var mongoose = require('mongoose');
var userModel = require('./schemas/users'); 
var cityModel = require('./schemas/cities'); 
var venueModel = require('./schemas/venues'); 
mongoose.set('debug',true);
//connections
var development = "mongodb://localhost/test";
var production = "mongodb://localhost/live";

var useDb;

if (process.env.NODE_ENV === 'production') {
    useDb = production;
}
else
{
    useDb = development;
}
mongoose.connect(useDb);
var db = mongoose.connection;

db.on('error',console.error.bind(console, 'connection error:'));
db.on('open',function (){
    console.log('Database connection successfully opend at '+ useDb);
});

exports.user = userModel;
exports.city = cityModel;
exports.venue = venueModel;
