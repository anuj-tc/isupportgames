var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var db = require('../../server/database');
var model = db.city;

/* GET users listing. */
router.get('/', function(req, res) {
        model.find({status:true}, function(err,data){
            if(err){
            res.status('500').send(err);
            }
            if(data.length > 0){
              res.status('200').send(data);
            }
            else{
              console.log(data);
              res.status('404').send('Not found');
            }
            });  
        });

router.get('/:id', function(req, res){
        var cityModel = new model();
        if(!cityModel.isObject(req.params.id))
        {
        res.status('412').end('Not a valid city id');
        }
        model.findById({$and: [{'_id':mongoose.Types.ObjectId(req.params.id)}, {status: true}]}, function(err, data){
            if(err){
            res.status('500').send(err);
            }
            if(data && data.length > 0){
            res.status('200').send(data);
            }
            else{
            res.status('404').send('Not found');
            }
            });  
        });

router.get('/lng/:lng/lat/:lat/radius/:radius', function(req, res){
        if(!req.params.lng || !req.params.lat)
        {
        res.status('412').end('Parameters are not passed correctly');
        }
        if(!req.params.radius)
            var radius = 50000;
        else
            var radius = req.params.radius; 
        model.find({$and: [{geo:{$near:{$geometry:{type:"Point", coordinates:[req.params.lng, req.params.lat]}, $maxDistance: radius}}},{status: true}]}
            , function(err, data){
            if(err){
            res.status('500').send(err);
            }
            if(data && data.length > 0){
            res.status('200').send(data);
            }
            else{
            res.status('404').send('Not found');
            }
            });  
        });
module.exports = router;
