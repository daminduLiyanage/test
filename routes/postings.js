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


/* GET QUERY job posting using postingId */
router.get('/:postingId', function(req, res, next){
  JobPosting.
    find().
    where('postingId').equals(req.params.postingId).
    exec(function(err, posting){
        if(err){
          res.status(500);
          console.log('It is an internal server error!')
        } else {
          res.status(200).json(posting);
          console.log('Here is what we got:');
          console.log(posting);
        }
    });
});

/* DELETE QUERY romoves a posting with postingId */
router.delete('/:postingId', function (req, res, next) {
  JobPosting.
    deleteOne().
    where('postingId').equals(req.params.postingId).
    exec(function(err, posting){
      if(err){
        res.status(500);
        console.log('Oops. Deleting wasn\'t succesful!');
      } else {
        res.status(200);
        console.log('Here is what we did:');
        console.log('\tDeleted 1 record which has postingId as ' + req.params.postingId);
      }
    });
});

/*Update specific posting with PUT QUERY */
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
        console.log('\tUpdated 1 record which has postingId as ' + req.params.postingId);
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
