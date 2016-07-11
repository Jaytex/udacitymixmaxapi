var sync = require('synchronize');
var request = require('request');
var _ = require('underscore');


// The Type Ahead API.
module.exports = function(req, res) {
  var term = req.query.text.trim();
  if (!term) {
    res.json([{
      title: '<i>(enter a search term)</i>',
      text: ''
    }]);
    return;
  }

  var response;
  try {
    response = sync.await(request({
      url: 'https://www.udacity.com/public-api/v0/courses',
      method: 'GET',
      gzip: true,
      json: true,
      timeout: 10 * 1000
    }, sync.defer()));
  } catch (e) {
    res.status(500).send('Error');
    return;
  }

  if (response.statusCode !== 200) {
    res.status(500).send('Error');
    return;
  }

  var results = _.chain(response.body.courses)
    .reject(function(course) {
      return !course.title.toLowerCase().includes(term) || !course.title || !course || !course.key || !course.image || !course.homepage;
    })
    .map(function(course) {
      return {
        title: '<div> <img style="height:75px" src="' + course.image + '"> <p>' + course.key + ': ' + course.title + '</p> <p> Level: ' + course.level + '</div>',
        text:  course.key
      };
    })
    .value();

  if (results.length === 0) {
    res.json([{
      title: '<i>(no results)</i>',
      text: ''
    }]);
  } else {
    res.json(results);
  }
};