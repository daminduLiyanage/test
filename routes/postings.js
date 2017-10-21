var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();

var JobPostingSchema = require('../schemas/job-posting');
var JobPosting = mongoose.model('posting', JobPostingSchema);

/* POST create posting */
router.post('/', function (req, res, next) {
  JobPosting.create(req.body, function (err, posting) {
    if (err) {
      res.status(500).json({error: err});
    } else {
      res.status(200).json({posting: posting._id});
    }
  });
});

/* GET list all job postings */
router.get('/', function (req, res, next) {
  JobPosting.find({}, function (err, postings) {
    if (err) {
      res.status(500).json({error: err});
    } else {
      res.status(200).json(postings);
    }
  });
});

/**
 * GET job posting using postingId
 *
 * When a GET request is made along with the postingID as the 
 * parameter, specific record will be shown. 
 */
router.get('/:postingId', function(req, res, next){
  JobPosting.
    findOne({postingId: req.params.postingId}, 
      function(err, posting){
        if(err){
          res.status(500);
        } else {
          res.status(200).json(posting);
        }
    });
});

/**
 * DELETE removes a posting with postingId
 * 
 * When a DELETE request is made along with the postingId as the 
 * parameter, the specific record will get deleted. 
 */
router.delete('/:postingId', function (req, res, next) {
  JobPosting.
    findOneAndRemove({postingId: req.params.postingId}, 
      function(err, posting){
      if(err){
        res.status(500);
      } else {
        res.status(200).json(posting);
      }
    });
});











/**
 * PUT Updates title using postingId
 * 
 * When a PUT request is made along with the title as the key value in
 * the body of the request in the type x-www-form-urlencoded using the
 * postingId as the parameter of the request the record will be located, 
 * then updated.
 */
router.put('/:postingId', onlyNotEmpty, function (req,res){
  JobPosting.findOneAndUpdate(
      {postingId: req.params.postingId}, 
      {$set: req.bodyNotEmpty},
      function(err, posting){
        if(err){
          res.status(500);
        } else {
          res.status(200).json(posting);
        }
      });
  });

/* GET remove all postings */
/* This is useful for testing purposes */
router.get('/nuke', function (req, res, next) {
  JobPosting.remove({}, function (err) {
    if (err) {
      res.redirect('/postings');
    } else {
      res.redirect('/postings');
    }
  });
});

module.exports = router;

/**
 * Middleware to provide support PUT Update method
 *
 * Following middleware provides support to the Update request by 
 * checking and removing null fields in the request body. notEmptyBody
 * is the output. 
 */

function onlyNotEmpty (req, res, next) {
    const out = {};
    for (var key in req.body){
      if(req.body[key]!=null)
        out[key] = req.body[key];
    }
    req.bodyNotEmpty = out;
    next();
}
