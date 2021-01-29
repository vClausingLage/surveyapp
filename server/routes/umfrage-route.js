const express = require('express');
const UmfrageRoute = express.Router();

let Umfrage = require('../models/umfrage.model');

UmfrageRoute.route('/create').post(function (req, res) {
    let umfrage = new Umfrage(req.body);
    umfrage.save()
        .then(umfrage => {
        res.status(200).json({'umfrage': 'added successfully'});
        })
        .catch(err => {
        res.status(400).send("unable to save to database");
    });
});

UmfrageRoute.route('/list').get(function(req, res) {
    Umfrage.find({}, function(err, result) {
        if(err){
            console.log(err);
        }
        else {
            res.json(result);
        }
    });
})

UmfrageRoute.route('/list/:id').get(function (req, res) {
    let id = req.params.id;
    Umfrage.findById(id, function (err, umfrage){
        res.json(umfrage);
    });
});

UmfrageRoute.route('/update/:id').post(function (req, res) {
    let id = req.params.id;
    let data = req.body;
    Umfrage.findByIdAndUpdate(id, { optionen: data }, function(err, result){
        if(err){
            console.log(err);
        } else {
            res.json(result);
        }
    });
});

UmfrageRoute.route('/delete/:id').get(function(req, res) {
    let id = req.params.id;
    Umfrage.findByIdAndDelete(id, function(err){
        console.log(err);
    });
});

module.exports = UmfrageRoute;
