//requiring models and modules
const express = require('express');
const router = express.Router();
const Article = require('../models/article');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
//checkSession function for authentication
const checkSession = function (req, res, next) {
    if (!req.session.user) return res.redirect('/api/login')

    next();
};
//adding public folders
router.use(express.static('uploads'));
router.use(express.static('public'));
router.use('/get' ,express.static('public'));
router.use('/get', express.static('uploads'));
router.use('/edit' ,express.static('public'))
router.use('/edit', express.static('uploads'));
//adding article to database
router.post('/add', checkSession, function (req, res) {
    const NEW_ARTICLE = new Article({
        title: req.body.title,
        text: req.body.text,
        rawText: req.body.rawText,
        author: req.session.user._id,
        img: req.session.user.articleAvatar
    })
    NEW_ARTICLE.save(function (err, data) {
        if (err) {
            console.log(err);
            return res.send("somthing went wrong");
        }
        res.send(data);
        if(req.session.user){
            req.session.user.editingArticle = false;
            req.session.user.creatingArticle = false;
        }

         
    })
})
router.delete('/allArticles', function(req, res){
    res.redirect('http://localhost:3000/articles/myArticles');
})
//adding article updating method
router.put('/update/:articleId', checkSession, function (req, res) {
    let updated = req.body;
    updated.img = req.session.user.articleAvatar;
    updated.author = req.session.user._id;
    console.log(updated);
    Article.findByIdAndUpdate(req.params.articleId, updated, {new: true}, function(err, data){
        if(err){
            console.log(err),
            res.send("something went wrong")
        }
        else{
            console.log(data)
            res.send(data);
        }
    })
    if(req.session.user){
        req.session.user.editingArticle = false;
        req.session.user.creatingArticle = false;
    }
})

//adding article reading or getting method
router.get('/get/:articleId', function (req, res) {
    Article.findById(req.params.articleId).populate('author').exec(function(err, data){
        if(err){
            console.log(err)
            res.status(500).send('something went wrong');
        }
        else if(req.session.user){
            res.render('pages/articleReadOnly',{data: data, user: req.session.user})
        }
        else res.render('pages/articleReadOnly', {data: data})
    })
    if(req.session.user){
        req.session.user.editingArticle = false;
        req.session.user.creatingArticle = false;
    }

})

//adding editing page
router.get('/edit/:articleId',checkSession, function (req, res) {
    Article.findById(req.params.articleId).populate('author').exec(function(err, data){
        if(err){
            console.log(err)
            res.status(500).send('something went wrong');
        }
        else {
            if(req.session.user.editingArticle === false){
                req.session.user.articleAvatar = data.img;
            }
            req.session.user.editingArticle = true;
            req.session.user.creatingArticle = false;
            res.render('pages/editArticle',{data: data, user: req.session.user})
        }
    })

})

//adding article deleting method
router.delete('/delete/:articleId', function (req, res) {
    Article.findByIdAndDelete(req.params.articleId, function (err, data) {
        if (err) {
            console.log(err),
                res.send('something went wrong')
        } else {
            res.send(true);
            console.log(data);
        }
    })
    if(req.session.user){
        req.session.user.editingArticle = false;
        req.session.user.creatingArticle = false;
    }

})
//getting user's articles
router.get('/myArticles', checkSession, function (req, res) {
    Article.find({
        author: req.session.user._id
    }, function (err, data) {
        if (err) {
            res.status('500').send("something went wrong");
            console.log(err);
        } else {
            data.reverse();
            res.render('pages/myArticles', {user: req.session.user, data: data});
        }
    })
    if(req.session.user){
        req.session.user.editingArticle = false;
        req.session.user.creatingArticle = false;
    }

})
//getting all articles
router.get('/allArticles', function (req, res) {
    Article.find({}).populate('author').exec(function (err, data) {
        if (err) {
            res.status('500').send("something went wrong");
            console.log(err);
        } else if (req.session) {
            data.reverse();
            res.render('pages/allArticles', {
                data: data,
                user: req.session.user
            });
        } else if (!req.session) {
            res.render('pages/allArticles');
        }
    })
    if(req.session.user){
        req.session.user.editingArticle = false;
        req.session.user.creatingArticle = false;
    }

})
//opening add an article page
router.get('/addArticlePage',checkSession, function(req, res){
    if(req.session.user.creatingArticle === false){
        req.session.user.articleAvatar = "book.png";
    }
    req.session.user.editingArticle = false;
    req.session.user.creatingArticle = true;
    res.render('pages/addArticle', {user: req.session.user});
})


//adding image of article handler
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
router.post('/uploadfile', upload.single('myFile'), (req, res, next) => {
    const file = req.file;
    if (!file) {
        const error = new Error('Please upload a file')
        error.httpStatusCode = 400
        return next(error)
    }
    if (req.session.user.Articleavatar) {
        fs.unlinkSync(`uploads/${req.session.user.avatar}`)
    };
    req.session.user.articleAvatar = req.file.filename;
    res.redirect(req.get('referer'));

})

module.exports = router;