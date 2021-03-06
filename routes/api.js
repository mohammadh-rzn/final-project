const express = require('express');
const router = express.Router();
const User = require('../models/user');
const user = require('../models/user');
router.get('/signUp', function(req, res){
    console.log('hello');
    res.render('pages/signUp');
})
//adding user
router.post('/addUser', function(req, res){
    const NEW_USER = new User ({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        userName: req.body.userName,
        password: req.body.password,
        sex: req.body.sex,
        mobile: req.body.mobile
    })
    NEW_USER.save(function(err, data){
        if(err) {
            console.log(err);
            return res.send("username exists");
        } 
        return res.send(data);
    })
});
//checking if user have access
const checkSession = function(req, res, next) {
    if (!req.session.user) return res.redirect('/api/login')

    next();
};
let promise = new Promise(function(resolve, reject){
    User.findOne({}, function(err, user){
        if(err) reject(err);
        if(user) resolve(user);
    })
})
promise.then(function(data){
    console.log(data)
}).catch(function(err){
    console.log(err);
})
let a = async function(){
    try{
        let data = await new Promise(function(resolve, reject){
            User.findOne({}, function(err, data){
                if(err) reject(err);
                resolve(data);
            })
        })
        console.log(data);
    }
    catch(err){
        console.log(err);
    }

}
a();
//login route
router.get('/login', function(req, res){
    res.render('pages/login');
})

//checking  if login was succesfull
router.post('/loginCheck', function(req, res){
    User.find({password: req.body.password, userName: req.body.username}, function(err, user){
        if(user.length === 0){
            console.log(user);
            res.send("incorrect");
        }
        else{
            console.log(user[0]);
            req.session.user = user[0];
            req.session.user.editingArticle = false;
            req.session.user.creatingArticle = false;
            res.send('correct');
        }    
    })
})
//dashboard route
router.get('/dashboard', checkSession, function(req, res){
    res.render('pages/dashboard', {user: req.session.user});
})
//loging out route
router.get('/logout', function(req, res){
    req.session.destroy();
    res.redirect('http://localhost:3000/')
})

//loading add an article page
router.get('/addArticlePage', function(req, res){
    res.redirect('http://localhost:3000/articles/addArticlePage');
})

//defining public folders
router.use(express.static('public'));
router.use(express.static('uploads'));
module.exports = router;