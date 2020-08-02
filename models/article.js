const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ArticleShema = new Schema({
    title:{
        type:String,
        required: true,

    },
    text:{
        type: String,
        required: true
    },
    img:{
        type:String,
        default:'book.png'
    },
    createdAt:{
        type: Date,
        default: Date.now,
    },
    seen:{
        type:Number,
        default: 0
    },
    likes:{
        type:Number,
        default: 0
    },
    author:{
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    rawText:{
        type: String,
        required: true,
    }


})


module.exports = mongoose.model('Article', ArticleShema);