const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true,  useUnifiedTopology: true }, (err) => {
    console.log('Verbindung zur Datenbank:');
    if (!err) {console.log('\x1b[32m','                        erfolgreich','\x1b[37m');}
    else {console.log('\x1b[31m','                        fehlgeschlagen','\x1b[37m')}
});

require('./team.model');
require('./game.model');
