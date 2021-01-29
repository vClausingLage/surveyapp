const express = require('express');
const keys = require('./config/keys');
const PORT = process.env.PORT || 4000;
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const schuelerRoute = require('./schueler.route');
const klassenRoute = require('./klassen.route');

mongoose.connect(keys.mongoURI, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateIndex: true,
	useFindAndModify: false
    })
    .then(
    () => {console.log('Database is connected') },
    err => { console.log('Can not connect to the database'+ err)}
);

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use('/schueler', schuelerRoute);
app.use('/klassen', klassenRoute);

app.listen(PORT, function(){
    console.log('server running on Port', PORT);
});
