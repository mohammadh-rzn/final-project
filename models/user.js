const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserShema = new Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
        maxlength: 30,
        minlength: 3
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        maxlength: 30,
        minlength: 3
    },
    userName: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        maxlength: 30,
        minlength: 3,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        maxlength: 30,
        minlength: 8
    },
    sex: {
        type: String,
        required: true,
        enum: ['male', 'female']
    },
    mobile: {
        type: String,
        required: true,
        trim: true,
    },
    role: {
        type: String,
        enum: ['blogger', 'admin']
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    },
    avatar:{
        type:String,
        default:'avatardefault_92824.png'
    },
    articleAvatar:{
        type:String,
        default:'book.png'
    },
    editingArticle:{
        type: Boolean,
        default:false
    },
    creatingArticle:{
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('User', UserShema);
