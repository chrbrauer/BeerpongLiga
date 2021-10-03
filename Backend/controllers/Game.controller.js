var mongoose = require('mongoose');
var _ = require('lodash');

var Team = mongoose.model('Team');
var Game = mongoose.model('Game');

/**
 * Findet alle Teams
 * @param req
 * @param res
 */
module.exports.getTeams = (req, res) => {
    Team.find({}, (err, elem) => {
            if (!err && elem.length > 0) {
                return res.status(200).json({status: true, elements: elem});
            } else {
                return res.status(404).json({status: false, message: 'Keine Teams gefunden.'})
            }
        });
};

/**
 * Findet alle Teams
 * @param req
 * @param res
 */
module.exports.getGames = (req, res) => {
    const result = []
    Game.find({}, (err, elem) => {
        if (!err && elem.length > 0) {
            elem.forEach(function (el) {
                Team.findOne({_id: el.heim},(err, heim)=> {
                    if (!err) {
                        Team.findOne({_id: el.gast},(error, gast)=> {
                            if (!error) {
                                result.push({'heim': heim, 'gast': gast, 'score_heim': el.score_heim, 'score_gast': el.score_gast, 'datum': el.datum});
                                if (result.length === elem.length) {
                                    if (result.length > 0) {
                                        return res.status(200).json({status: true, elements: result});
                                    } else {
                                        return res.status(404).json({status: false, message: 'Keine Spiele gefunden.'})
                                    }
                                }
                            }
                        });
                    }
                });

            })
        } else {
            return res.status(404).json({status: false, message: 'Keine Spiele gefunden.'})
        }
    });
};

function findTeam(id){
    Team.findOne({_id: id},(err, res)=>{
        if (!err) {
            return res;
        }
    })
}
