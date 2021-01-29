const express = require('express');
const klassenRoute = express.Router();

let Schueler = require('./schueler.model');

// alle
klassenRoute.route('/').get((req, res) => {
    Schueler.find({}, (err, docs) => {
        if(err){
            console.log(err);
        }
        else {
            res.json(docs);
        }
    });
});

// Schüler sortieren
klassenRoute.route('/list').get(function(req, res) {
    Schueler.find({ })
    .sort({klasse: 'asc'})
    .exec(function(err, result) {
        if(err){
        console.log(err)
        }
        else {
        let newData= [];
        for(let i = 0; i < result.length; i++){
            newData.push(result[i].klasse);
        }
        klassen = [...new Set(newData)];
        res.json(klassen)
        }
    })
});

// klassen anzeigen
klassenRoute.route('/list/:klasse').get(function (req, res) {
    let klassenname = req.params.klasse;
    Schueler.find({ klasse: klassenname }, 'klasse', function (err, docs) {
      if(err){
        console.log(err);
      }
      else {
        res.json(docs);
        }
    });
});

module.exports = klassenRoute;
