var sync = require('synchronize');
var request = require('request');
var _ = require('underscore');

// The API that returns the in-email representation.
module.exports = function(req, res) {
  var term = req.query.text.trim();
  handleSearchString(term, req, res);
};

function handleSearchString(key, req, res) {
  var response;
  try {
    response = sync.await(request({
      url: 'https://www.udacity.com/public-api/v0/courses',
      method: 'GET',
      gzip: true,
      json: true,
      timeout: 15 * 1000
    }, sync.defer()));
  } catch (e) {
    res.status(500).send('Error hss');
    return;
  }
  var courses = response.body.courses;
  var course;

  for (var i = 0; i < courses.length; i++) {
    if (courses[i].key === key) {
      course = courses[i];
      break;
    }
  };

  var courselink = course.homepage;
  var title = course.title;
  var image = course.image;

  var width = 320;
  var height = 180
  var html = '<div> <a href="' + courselink +'"> <img style="max-width:100%;" src="' + image + '" width="' + width + ' height="' + height + '"/>';
  html += '<p style="color:#000000; font-size: 160%;> <b> Title: ' + title + '</b> </p>';
  html += '<p style="color:#000000; font-size: 160%;> <b>  ' + title + '</b> </p> </a></div>';

  res.json({
    body: html
  });
}
