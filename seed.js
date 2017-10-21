var mongoose = require('mongoose');
var JobPostingSchema = require('./schemas/job-posting');
var JobPosting = mongoose.model('posting', JobPostingSchema);

var seedPosting = {
  "postingId": "10201021",
  "title": "Daniele",
  "name" : "Candidate Name Here",
  "blurb": "Looking for Capable C#.NET developer with experience writing SQL queries. Knowledge of Javascript is a plus",
  "languages": ["C#", "Javascript", "Powershell", "SQL"],
  "frameworks": ["ASP.NET MVC", "React"]
  //successful canddate 

};

function seed () {
  JobPosting.findOne({postingId: "10201021"}, function (err, posting) {
    if (err) {
      console.log(err);
    } else {
      if (!posting) {
        JobPosting.create(seedPosting, function (err, posting) {
          if (err) {
            console.log(err)
          } else {
            console.log('Database seeded');
          }
        });
      }
    }
  });
}

module.exports = seed;