const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const authorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        unique: true
    },
    born: {
        type: Number
    },
    bookCount: {
        type: Number,
        default: 0
    },
})

authorSchema.plugin(uniqueValidator)
const Author = mongoose.model('Author', authorSchema)

module.exports = Author