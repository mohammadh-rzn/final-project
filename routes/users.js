const express = require('express');
const router = express.Router();
const User = require('../models/user');
const multer = require('multer');
const fs = require('fs');
router.get('/hello', function (req, res) {
    res.send('hello');
})
const path = require('path');
//adding authenticating admin function
const checkAdmin = function(req, res, next){
    if(req.session.user.role != 'admin')return res.status(404).send('You do not have access to do this');

    next();
}
//adding editing password route
router.put('/editP/:id', function (req, res) {
    User.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    }, function (err, data) {
        if (err) {
            console.log(err)
        } else {
            req.session.user = data;
            res.send(true);
            console.log(data)
        }
    })
})

//adding editing personal info route

router.put('/edit/:id', function (req, res) {
    User.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    }, function (err, data) {
        if (err) {
            console.log(err);
        } else {
            req.session.user = data;
            res.send(true);
            console.log(data);
        }
    })
})


//adding method for uploading avatar

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname + '-' + Date.now() + path.extname(file.originalname))
    }
})

var upload = multer({
    storage: storage
})
//uploading avatar route
router.post('/uploadfile', upload.single('myFile'), (req, res, next) => {
    const file = req.file
    if (!file) {
        const error = new Error('Please upload a file')
        error.httpStatusCode = 400
        return next(error)
    }
    User.findByIdAndUpdate(req.session.user._id, {
        avatar: req.file.filename
    }, {
        new: true
    }, function (err, data) {
        if (err) {
            return console.log(err);
        }
        if (req.session.user.avatar) {
            if(fs.existsSync(`uploads/${req.session.user.avatar}`))
            fs.unlinkSync(`uploads/${req.session.user.avatar}`)
        };
        req.session.user.avatar = req.file.filename;
        res.redirect('http://localhost:3000/api/dashboard')
    })

})

//deleting a user by admin route
router.delete('/delete/:userId', checkAdmin, function(req, res){
    User.findByIdAndDelete(req.params.userId, (err, data)=>{
        if(err){
            console.log(err);
            res.send('something went wrong');
        }
        else {
            if(fs.existsSync(`uploads/${data.avatar}`)){
                fs.unlinkSync(`uploads/${data.avatar}`);
            }
            res.send(true);
        };
    })
})
//password restoration route
router.put('/resetPass/:userId', checkAdmin, function(req, res){
    User.findById(req.params.userId, (err, blogger)=>{
        User.findByIdAndUpdate(req.params.userId,{password: blogger.mobile} , {new: true}, (err, data)=>{
            if(err){
                console.log(err);
                res.send('something went wrong')
            }
            res.send("Password changed succesfully")
        })
    })

})
//route for showing all users
router.get('/allUsers', checkAdmin, function(req, res){
    User.find({userName: {$ne: 'reza'}}, (err, data)=>{
        if(err){
            console.log(err);
        }
        else res.render('pages/users', {user: req.session.user, data:data})
    })
})









router.use(express.static('public'));
router.use(express.static('uploads'));

module.exports = router;