var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var articleSchema = new Schema({
    title: String,
    content: String,
    image: String,
    createdAt: Date,
    updatedAt: Date,
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Article must have an author']
    }
})

var Article = mongoose.model('Article', articleSchema)

module.exports = Article