var mongoose = require('mongoose');
var ObjectID = mongoose.ObjectId;

var GameSchema = mongoose.Schema({
    heim:{
        type: ObjectID,
        ref: 'Team'
    },
    gast:{
        type: ObjectID,
        rev: 'Team'
    },
    score_heim:{
        type: Number,
        default: 0
    },
    score_gast:{
        type: Number,
        default: 0
    },
    datum:{
        type: String,
    }
});
mongoose.model('Game', GameSchema);
