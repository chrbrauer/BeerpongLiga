var mongoose = require('mongoose');
var ObjectID = mongoose.ObjectId;

var seasonresultsSchema = mongoose.Schema({
    team: {
        type: ObjectID,
        ref: 'Team'
    },
    season: {
        type: Number,
        ref: 'Season'
    },
    punkte: {
        type: Number
    }
});

mongoose.model('Seasonresults', seasonresultsSchema);
