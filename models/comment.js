const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const CommentsShema = new Schema({
    text:{
        type:String,
        required: true,
    },
    commenter:{
        type:Schema.Types.ObjectId,
        required:true,
        ref:'User'
    },
    article:{
        type:Schema.Types.ObjectId,
        required: true,
        ref:'Article'
    }
})
















module.exports = mongoose.model('Comments', CommentsShema);