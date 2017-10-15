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

/* GET show job posting */
router.get('/:_id', function (req, res, next) {
  JobPosting.findOne(req.params._id, function (err, posting) {
    if (err) {
      res.status(500).json({error: err});
    } else {
      res.status(200).json(posting);
    }
  });
});

/* GET job posting using postingId */
// router.get('/:_id', function(req, res, next){
//   JobPosting.findOne({postingId: req.params._id},
//     function(err, posting){
//       if(err){
//         res.status(500);
//         console.log('did not get it!');
//       } else {
//         res.status(200).json(posting);
//         console.log('got it!');
//       }
//     });
// });

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

/* DELETE QUERY romove a posting with postingId */
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
        console.log('\tDeleted 1 record which has postingId as '+req.params.postingId);
      }
    });
});


/* DELETE remove a posting with primary Id */
router.delete('/:_id', function (req, res, next) {
  JobPosting.findByIdAndRemove(req.params._id, function (err, posting) {
    if (err) {
      res.status(500).json({error: err});
    } else {
      res.status(200).json(posting);
    }
  });
});


/*Update specific posting */
router.put('/:_id', function (req, res){
  JobPosting.findOneAndUpdate(
  {postingId: req.params._id},
  {$set: {title: req.body.title}},
  {upsert: true},
    function(err, newPosting){
      if(err){
        res.status('An error');
        res.status(500);
      } else {
        console.log(newPosting);
        console.log('sent OK');
        res.status(200);
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
