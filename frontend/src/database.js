const mongoose = require('mongoose');
const { mongodb } =  require('./keys');

mongoose.connect(mongodb.URI, {useNewUrlParser: true})
    .then(db => console.log('DATABASE IS CONNECTED'))
    .catch(err => console.log(err));