const express = require('express');
const schuelerRoute = express.Router();

let Schueler = require('./schueler.model');

// finden
schuelerRoute.route('/').get(function(req, res) {
  Schueler.find({}, function(err, result){
      if(err){
        console.log(err);
      }
      else {
        res.json(result);
      }
    });
})

// erstellen
schuelerRoute.route('/add').post(function (req, res) {
  let schueler = new Schueler(req.body);
  schueler.save()
    .then(schueler => {
      res.status(200).json({'schueler': 'added successfully'});
    })
    .catch(err => {
      res.status(400).send("unable to save to database");
    });
});

// bearbeiten finden
schuelerRoute.route('/edit/:id').get(function (req, res) {
  let id = req.params.id;
  Schueler.findById(id, function (err, schueler){
      res.json(schueler);
  });
});

// bearbeiten speichern
schuelerRoute.route('/update/:id').post(function (req, res) {
    Schueler.findById(req.params.id, function(err, schueler) {
    if (!schueler)
      res.status(404).send("data is not found");
    else {
        schueler.name = req.body.name;
        schueler.nachname = req.body.nachname;
        schueler.klasse = req.body.klasse;

        schueler.save().then(schueler => {
          res.json('Update complete');
        })
        .catch(err => {
          res.status(400).send("unable to update the database");
        });
    }
  });
});

// löschen
schuelerRoute.route('/delete/:id').get(function (req, res) {
    Schueler.findByIdAndRemove({_id: req.params.id}, function(err, schueler){
        if(err) res.json(err);
        else res.json('Successfully removed' + schueler);
    });
});

// noten eintragen Template
schuelerRoute.route('/notentemplate/:id').post(function (req, res) {
    Schueler.findById(req.params.id, function(err, schueler) {
    if (!schueler)
      res.status(404).send("data is not found");
    else {
        schueler.noten.tests = req.body.noten.tests;
        schueler.noten.mundlich = req.body.noten.mundlich;
        schueler.noten.klausuren = req.body.klausuren;

        schueler.save().then(schueler => {
          res.json('Update complete');
        })
        .catch(err => {
          res.status(400).send("unable to update the database");
        });
    }
  });
});

// test eintragen
schuelerRoute.route('/noten/:id').post(function (req, res) {
  Schueler.findById(req.params.id, function(err, schueler) {
  if (!schueler)
    res.status(404).send("data is not found");
  else {
      schueler.noten.tests = req.body.noten.tests;
      schueler.save().then(schueler => {
        res.json('Update complete');
      })
      .catch(err => {
        res.status(400).send("unable to update the database");
      });
  }
});
});

module.exports = schuelerRoute;
