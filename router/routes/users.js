var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var db = require('../../server/database');
var user = db.user;

/* GET user listing. */
router.get('/', function(req, res) {
        user.find({'status':1}, function(err,user){
            if(err){
            res.status('500').send(err);
            }
            if(user.length > 0){
            res.status('200').send(user);
            }
            else{
            res.status('404').send('Not found');
            }
            });  
        });

router.get('/:id', function(req, res){
        var userModel = new user;
        if(!userModel.isObject(req.params.id))
        {
          res.status('412').end('Not a valid user id');
        }
        user.findById({'_id':mongoose.Types.ObjectId(req.params.id)}, function(err, user){
            if(err){
            res.status('500').send(err);
            }
            if(user && user.length > 0){
            res.status('200').send(user);
            }
            else{
            res.status('404').send('Not found');
            }
            });  
        });

router.post('/', function(req, res){    
        var userModel = new user(req.body);
        //userModel = req.body;
        userModel.status = 1;
        userModel.create_date = Date.now();
        userModel.modified_date = Date.now(); 
        console.log(userModel.modified_date); 
        user.find({'email': userModel.email}, function(err,user){
            if(err)
            {
            res.status('500').send(err);
            }
            if(user.length == 0)
            {
            userModel.save(function(err){
                if(err)
                {
                console.log(err);
                res.status('500').send(err);
                }
                else
                {
                  res.status('200');
                  res.json({message: userModel.name+ ' successfully created', user: userModel});
                }
                });
            }
            else{
                res.status('412');
                res.json({usermeassage: userModel.email + " already exist"});
            }
        });

});


module.exports = router;
