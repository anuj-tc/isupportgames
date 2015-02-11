/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var Schema = mongoose.Schema;

//user schema

var userSchema = new Schema({
    name:{type: String, required: true},
    email:{type: String, required: true, unique: true},
    password: {type: String, required: true},
    facebook: {},
    google: {},
    twitter: {},
    profile: {},
    status:{type: Number, default: 1},
    create_date: {type: Date, default: Date.now},
    modified_date: {type: Date, default: Date.now}, 
});

userSchema.pre('save', function(next){
            var user = this;
            if(!user.isModified('password')){
                return next();
            }
            bcrypt.genSalt(10,function(err, salt){
                if(err){
                    return next(err);
                  }
                  bcrypt.hash(user.password, salt, function(err, hash){
                    if(err){
                        return next(err);
                    }
                    user.password = hash;
                    next();
                });
            });
    });

userSchema.methods.isObject = function(value){
    if(mongoose.Types.ObjectId.isValid(value))
        return true;
    else
        return false;
}

userSchema.methods.comparePassword = function(newPassword, cb){
  bcrypt.compare(newPassword, this.password, function(err, isMatch){
        if(err) return cb(err);
        cb(null, isMatch);
      });
};


var User = mongoose.model('User', userSchema);
module.exports = User;
