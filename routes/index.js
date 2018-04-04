var express = require('express');
var router = express.Router();
var Bird = require('../models/bird'); //bird schema

/* GET home page. */
router.get('/', function(req, res, next) {
  //Query to fetch all documents, get name fields, sort by name
    Bird.find().select( { name: 1, description: 1 } ).sort( {name:1} )
        .then( (birdDocs ) => {
          console.log('All birds', birdDocs); //for debugging
          res.render('index', {title: 'All Birds', birds: birdDocs} )
        }).catch( (err) => {
          next(err);
    })
});

/* POST create new bird document */
router.post('/addBird', function (req, res, next) {

  // use form data in req.body to create new bird
    var bird = Bird(req.body);

    //Save bird object to db as new bird document
    bird.save().then( (birdDoc) => {
      console.log(birdDoc); // helps see what's happening
      res.redirect('/');   // create a request to / to load home page
    }).catch((err) => {
      next(err); // send error to error handlers
    });
});

/* GET info about one bird */
router.get('/bird/:_id', function (req, res, next) {
    //Get the _id of the bird from req.params
    // Query db to get this birds document
    Bird.findOne( { _id: req.params._id} )
        .then( (birdDoc) => {
          if (birdDoc) {   // if a bird with this id is found
            console.log(birdDoc); res.render('birdinfo', { title: birdDoc.name, bird:birdDoc} );
          } else {        // else if bird not found, birdDoc will be undefined
            var err = Error('Bird not found'); // create a new error
            err.status = 404;   // set status to 404
            throw err;  // causes the chained catch function to run
          }
        })
        .catch( (err) => {
          next(err);  // 404 and database errors
        });
});

module.exports = router;
