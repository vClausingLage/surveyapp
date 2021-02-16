const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
//const helmet = require('helmet');
const path = require('path');
const UmfrageRoute = require('./routes/umfrage-route');
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
//app.use(
//    helmet.contentSecurityPolicy({
//      directives: {
//        defaultSrc: ["'self'"],
//        connectSrc: ["'self'", 'https://surveyapp-cll.herokuapp.com'],
//        frameSrc: ["'self'", 'https://surveyapp-cll.herokuapp.com'],
//        childSrc: ["'self'", 'https://surveyapp-cll.herokuapp.com'],
//        scriptSrc: ["'self'", 'https://surveyapp-cll.herokuapp.com'],
//        styleSrc: [
//          "'self'",
//          'https://fonts.googleapis.com',
//          'https://surveyapp-cll.herokuapp.com',
//        ],
//        fontSrc: ["'self'", 'https://fonts.gstatic.com'],
//        baseUri: ["'self'"],
//      },
//    })
//  )
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use('/api', UmfrageRoute);

// BUILD
if (process.env.NODE_ENV === 'production') {
app.use(express.static(path.join(__dirname, 'client', 'build')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});
}

app.listen(PORT, function(){
    console.log('server running on Port', PORT);
});
