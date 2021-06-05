const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const pasteSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    adddate: {
        type: Number,
        required: true
    },
    url: {
        type: String,
        require: true
    },
    email: {
        type: String,
        required: false
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