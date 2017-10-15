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
 * GET QUERY job posting using postingId
 *
 * When a GET request is made along with the postingID as the 
 * parameter, specific record will be shown. 
 */
router.get('/:postingId', function(req, res, next){
  JobPosting.
    find().
    where('postingId').equals(req.params.postingId).
    exec(function(err, posting){
        if(err){
          res.status(500);
          console.log('We weren\'t able to get the record!')
        } else {
          res.status(200).json(posting);
          console.log('Here is what we got:');
          console.log(posting);
        }
    });
});

/**
 * DELETE QUERY removes a posting with postingId
 * 
 * When a DELETE request is made along with the postingId as the 
 * parameter, the specific record will get deleted. 
 */
router.delete('/:postingId', function (req, res, next) {
  JobPosting.
    deleteOne().
    where('postingId').equals(req.params.postingId).
    exec(function(err, posting){
      if(err){
        res.status(500);
        console.log('Oops. Deleting wasn\'t succesful!');
      } else {
        res.status(200).json(posting);
        console.log('Here is what we did:');
        console.log('\tDeleted 1 record which has postingId as ' 
          + req.params.postingId);
      }
    });
});

/**
 * PUT QUERY Updates title using postingId
 * 
 * When a PUT request is made along with the title as the key value in
 * the body of the request in the type x-www-form-urlencoded using the
 * postingId as the parameter of the request the record will be located, 
 * then updated.
 */
router.put('/:postingId', function (req,res){
  JobPosting.
    update({$set: {title: req.body.title}}).
    where('postingId').equals(req.params.postingId).
    exec(function(err, posting){
      if(err){
        res.status(500);
        console.log('Oops. Updating wasn\'t succesful');
      } else {
        res.status(200).json(posting);
        console.log('\tUpdated 1 record which has postingId as ' 
          + req.params.postingId);
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