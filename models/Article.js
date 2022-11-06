const mongoose = require('mongoose')

const ArticleSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        unique: true
    },
    description: {
        type: String,
    },
    author: {
        type:String,
    },
    username:{
        type: String,
    },
    state:{
        type:String,
        enum: ['Draft', 'Published'],
        default: 'Draft'

    },
    readcount:{
        type:Number,
    },
    readingtime:{
        type: String,
    },
    tags:{
        type: Array,
    },
    body:{
        type: String,
        required: true
    },
},
{timestamps: true}
)






module.exports = mongoose.model("Article", ArticleSchema)