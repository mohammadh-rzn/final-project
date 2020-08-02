//requiring model and modules
const express = require('express');
const router = express.Router();
const Comment = require('../models/comment');

//adding  authentication function
const checkSession = function(req, res, next) {
    if (!req.session.user) return res.redirect('/api/login')

    next();
};
//adding admin authentication function
const checkAdmin = function(req, res, next){
    if(req.session.user.role != 'admin')return res.send('You do not have access to do this');

    next();
}
//adding comments
router.post('/add/:articleId', checkSession, function(req, res){
    const NEW_COMMENT = new Comment({
        text: req.body.text,
        commenter: req.session._id,
        article: req.params.articleId 
    })
    NEW_COMMENT.save(function(err,data){
        if(err){
            console.log(err);
            res.status(500).send('something went wrong');
        }
        else{
            res.send(data);
        }
    })
})
//deleting comments
router.delete('/delete/:commentId', checkAdmin, function(req, res){
    Comment.findByIdAndDelete(req.params.commentId, function(err, data){
        if(err){
            console.log(err);
            res.send('something went wrong');
        }
        else{
            res.send(data);
            console.log(data);
        }
    })
})












module.exports = router;