var key = require('../utils/key');
var sync = require('synchronize');
var request = require('request');
var _ = require('underscore');

// The API that returns the in-email representation.
module.exports = function(req, res) {
  var term = req.query.text.trim();
  if (/^http:\/\/soundcloud\.com\/\S+/.test(term)) {
    handleIdString(term.replace(/^http:\/\/soundcloud\.com\//, ''), req, res);
  } else {
    handleSearchString(term, req, res);
  }
};

function handleIdString(url, req, res) {
  return;
}

function handleSearchString(term, req, res) {
  var response;
  try {
    response = sync.await(request({
      url: encodeURIComponent(term),
      method: 'GET',
      gzip: true,
      json: true,
      timeout: 15 * 1000
    }, sync.defer()));
  } catch (e) {
    res.status(500).send('Error hss');
    return;
  }
  
  var image = response.body.courses.image;
  var coursename = response.body.user.username;
  var permalink = response.body.permalink_url;
  var title = response.body.title;

  var width = 320;
  var height = 180
  var html = '<div> <a href="' +permalink+'"> <img style="max-width:100%;" src="' + image + '" width="' + width + ' height="' + height + '"/>';
  html += '<p style="color:#000000; font-size: 160%;> <b> Title: ' + title + '</b> </p>';
  html += '<p style="color:#000000; font-size: 160%;> <b>  ' + title + ' by ' + username + '</b> </p> </a></div>';

  res.json({
    body: html
  });
}
