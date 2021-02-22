const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const pasteSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    data: {
        type: String,
        required: true
    },
    private: {
        type: Boolean,
        require: true
    }
});

module.exports = mongoose.model('Paste', pasteSchema);