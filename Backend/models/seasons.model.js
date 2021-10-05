var mongoose = require('mongoose');

var seasonSchema = mongoose.Schema({
    _id: {
        type: Number
    },
    name: {
        type: String,
    }
});

mongoose.model('Season', seasonSchema);
