const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 3,
        unique: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Author'
    },
    published: {
        type: Number
    },
    genres: [{
        type: String
    }]
})

bookSchema.plugin(uniqueValidator)

const Book = mongoose.model('Book', bookSchema)

module.exports = Book