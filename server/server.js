const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet')
const UmfrageRoute = require('./routes/umfrage-route');
const PORT = process.env.PORT || 4000;

mongoose.connect("mongodb+srv://user:NdItKhAW9e4QaAUf@surveycluster.rys35.mongodb.net/survey?retryWrites=true&w=majority", {   // process.env.MONGO_URI
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
app.use(helmet());
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use('/umfrage', UmfrageRoute);

// BUILD
//app.use(express.static(path.join(__dirname, 'build')));
//app.get('/*', (req, res) => {
//  res.sendFile(path.join(__dirname, 'build', 'index.html'));
//});

app.listen(PORT, function(){
    console.log('server running on Port', PORT);
});
