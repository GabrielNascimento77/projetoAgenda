const mongoose = require('mongoose');

const IndexSchema = new mongoose.Schema({
    titulo: {type: String, required: true},
    descricao: String
});

const IndexModel = mongoose.model('Index', IndexSchema);

module.exports = IndexModel;