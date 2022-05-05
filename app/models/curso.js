var mongoose = require('mongoose');
module.exports = function() {
    var schema = mongoose.Schema({
        curso: {type: String, required: true},
        coordenador: { type: String, required: true }
    });
     return mongoose.model('Curso', schema);
};
