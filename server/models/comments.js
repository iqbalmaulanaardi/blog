var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var commentSchema = new Schema({
    content: String,
    user_id: { type: Schema.Types.ObjectId, ref: 'User', required: [true, 'Comment must have a user'] },
    article_id: {
        type: Schema.Types.ObjectId,
        ref: 'Article',
        required: [true, 'Comment must have an article_id']
    },
    createdAt: Date
})

var Comment = mongoose.model('Comment', commentSchema)

module.exports = Comment