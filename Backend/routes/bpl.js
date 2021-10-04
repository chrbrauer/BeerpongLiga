var express = require('express');
var router = express.Router();

var ctrlGame = require('../controllers/Game.controller');

/**
 * Hier werden die Routes definiert, über die das Frontend auf die Funktionen des Backends zugreifen kann.
 */

router.get('/getTeams', ctrlGame.getTeams);
router.get('/getGames', ctrlGame.getGames);
router.post('/postTeam', ctrlGame.postTeam);
router.post('/postGame', ctrlGame.postGame);
router.put('/putResult', ctrlGame.putResult);
router.put('/putPoints', ctrlGame.putPoints);
module.exports = router;
