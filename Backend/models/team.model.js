var mongoose = require('mongoose');


var teamSchema = mongoose.Schema({
    spieler_1: {
        type: String,
        required: 'Das Feld kann nicht leer sein',

    },
    spieler_2: {
        type: String,
        required: 'Das Feld kann nicht leer sein',

    },
    teamname: {
        type: String,
        required: 'Das Feld kann nicht leer sein',
        unique: true
    },
    punkte: {
        type: Number,
        default: 0
    }
});

mongoose.model('Team', teamSchema);
