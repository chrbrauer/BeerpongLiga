var mongoose = require('mongoose');
var _ = require('lodash');
var url = require('url');

var Team = mongoose.model('Team');
var Game = mongoose.model('Game');
var Season = mongoose.model('Season');
var Seasonresults = mongoose.model('Seasonresults');

/**
 * Findet alle Teams
 * @param req
 * @param res
 */
module.exports.getTeamsBySeason = (req, res) => {
    var result = []
    Team.find({}, (err, elem) => {
        if (!err && elem.length > 0) {
            Season.find({}, (err2, seasons) => {
                if (!err2 && seasons.length > 0) {
                    elem.forEach(function (team) {
                        Seasonresults.findOne({team: team._id, season: req.query.season}, (err3, punkte) => {
                            if (!err3 && punkte !== null) {
                                result.push({
                                    '_id': team._id,
                                    'spieler_1': team.spieler_1,
                                    'spieler_2': team.spieler_2,
                                    'teamname': team.teamname,
                                    'punkte': punkte.punkte,
                                });
                            }else{
                                result.push({_id:-1})
                            }
                            if (result.length === elem.length) {
                                result = result.filter((a)=>a._id != -1);
                                if (result.length > 0) {
                                    return res.status(200).json({status: true, elements: result});
                                } else {
                                    return res.status(404).json({status: false, message: 'Keine Teams gefunden.'})
                                }
                            }
                        });

                    });
                }
            });
        }
    });
};

module.exports.getTeams = (req, res) => {
    Team.find({}, (err, elem) => {
        if (!err && elem.length > 0) {
            return res.status(200).json({status: true, elements: elem});
        } else {
            return res.status(404).json({status: false, message: 'Keine Teams gefunden.'})
        }
    });
};

module.exports.getElo = (req, res) => {
    Seasonresults.findOne({team:req.query.team, season:req.query.season}, (err, elem) => {
        if (!err) {
            return res.status(200).json({status: true, punkte: elem.punkte});
        } else {
            return res.status(404).json({status: false, message: 'Keinen Elo gefunden.'})
        }
    });
};

module.exports.TeamToSeason = (req, res) => {
    Team.findOne({teamname: req.body.teamname}, (err, elem) => {
        if (!err) {
            var sr = new Seasonresults();
            sr.team = elem._id;
            sr.season = req.body.season;
            sr.punkte = 1500;
            sr.save((erro, doc) => {
                if (!erro) {
                    return res.status(200).json({status: true, element: doc});
                } else {
                    return res.status(500).json({status: false, message: err});
                }
            });
        } else {
            return res.status(404).json({status: false, message: 'Kein Team gefunden.'})
        }
    });
};

module.exports.getSeasons = (req, res) => {
    Season.find({}, (err, elem) => {
        if (!err && elem.length > 0) {
            return res.status(200).json({status: true, elements: elem});
        } else {
            return res.status(404).json({status: false, message: 'Keine Seasons gefunden.'})
        }
    });
};

/**
 * Findet alle Teams
 * @param req
 * @param res
 */
module.exports.getGamesBySeason = (req, res) => {
    const result = []
    Game.find({season: req.query.season}, (err, elem) => {
        if (!err && elem.length > 0) {
            elem.forEach(function (el) {
                Team.findOne({_id: el.heim}, (err, heim) => {
                    if (!err) {
                        Team.findOne({_id: el.gast}, (error, gast) => {
                            if (!error) {
                                result.push({
                                    '_id': el._id,
                                    'heim': heim,
                                    'gast': gast,
                                    'score_heim': el.score_heim,
                                    'score_gast': el.score_gast,
                                    'datum': el.datum
                                });
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

/**
 * Diese Funktion erstellt generisch einen Eintrag in tree.
 * Ist der zu erstellende Eintrag ein Project, so wird auch ein Eintrag in UPRM erstellt.
 * @param req enthält Daten nach Typ Tree
 * @param res
 */
module.exports.postTeam = (req, res) => {
    var team = new Team();
    team.spieler_1 = req.body.spieler_1;
    team.spieler_2 = req.body.spieler_2;
    team.teamname = req.body.teamname;
    team.save((err, doc) => {
        if (!err) {
            return res.status(200).json({status: true, element: doc});
        } else {
            if (err.code === 11000) {
                return res.status(422).json({status: false, message: 'Der Teamname existiert bereits'});
            } else
                return res.status(500).json({status: false, message: err});
        }
    });
};

/**
 * Diese Funktion erstellt generisch einen Eintrag in tree.
 * Ist der zu erstellende Eintrag ein Project, so wird auch ein Eintrag in UPRM erstellt.
 * @param req enthält Daten nach Typ Tree
 * @param res
 */
module.exports.postGame = (req, res) => {
    var game = new Game();
    Team.findOne({teamname: req.body.heim}, (err, heim) => {
        if (!err) {
            Team.findOne({teamname: req.body.gast}, (error, gast) => {
                if (!error) {
                    game.heim = heim._id;
                    game.gast = gast._id;
                    game.score_heim = 0;
                    game.score_gast = 0;
                    game.datum = req.body.datum;
                    game.season = req.body.season;
                    game.save((err, doc) => {
                        if (!err) {
                            return res.status(200).json({status: true, element: doc});
                        } else {
                            return res.status(500).json({status: false, message: err});
                        }
                    });
                }
            });
        }
    });
};


module.exports.putResult = (req, res) => {
    Game.findOne({_id: req.body._id},
        (err, game) => {
            if (!game)
                return res.status(404).json({status: false, message: 'Spiel nicht gefunden.'});
            else {
                game.score_heim = req.body.score_heim;
                game.score_gast = req.body.score_gast;
                Game.updateOne({_id: game._id}, game, (err, doc) => {
                    if (!err)
                        res.status(200).json({status: true, message: 'Ergebnis konnte geändert werden'});
                    else {
                        res.status(422).json({status: false, message: err});
                    }
                });
            }
        }
    );
};


module.exports.putPoints = (req, res) => {
    Team.findOne({teamname: req.body.teamname},
        (err, team) => {
            if (!team)
                return res.status(404).json({status: false, message: 'Team nicht gefunden.'});
            else {
                Seasonresults.findOne({season: req.body.season, team: team._id},(err2, season) => {
                    season.punkte = req.body.punkte
                    Seasonresults.updateOne({_id: season._id}, season, (err, doc) => {
                        if (!err)
                            res.status(200).json({status: true, message: 'Ergebnis konnte geändert werden'});
                        else {
                            res.status(422).json({status: false, message: 'Punktes konnten nicht geändert werden'});
                        }
                    });
                })

            }
        }
    );
};
