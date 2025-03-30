
const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    description: { type: String },
    date: { type: Date },
});

module.exports = mongoose.model('Blog', blogSchema);
