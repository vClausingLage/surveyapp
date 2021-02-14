const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const UmfrageRoute = require('./routes/umfrage-route');
var path = require('path');

const PORT = process.env.PORT || 4000;
const keys = require('./config/keys');

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
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use('/umfrage', UmfrageRoute);

app.use(express.static(path.join(__dirname, 'build')));


app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT, function(){
    console.log('server running on Port', PORT);
});
