var express = require('express');
var router = express.Router();
var moment = require('moment');
var _ = require('underscore');
var color = require('cli-color');
var db = require('../../server/database');
var users = db.users;

/* Do Signup process. */
//router.get('/', function(req, res) {
//      res.send('respond a with a resource');
//});
router.post('/', function(req, res){
      res.send('post request received');
    });

router.get('/:id', function(req,res){
    console.log('i m here');
      users.findOne({'_id':req.params.id}, function(err,user){
             if(err) res.status('404').send('user not found');
             res.status('200').send(user);
          });
    });

module.exports = router;
