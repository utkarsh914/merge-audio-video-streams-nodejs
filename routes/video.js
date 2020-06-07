const fs = require('fs');
let express = require('express');
let router  = express.Router();
var ffmpeg = require('fluent-ffmpeg');

router.get('/', function(req, res){

  res.set('Content-Type', 'video/mp4');
	var file = './public/4d';

	var ffmpeg = require('fluent-ffmpeg');
	ffmpeg()
		// input video only stream
	  .addInput(fs.createReadStream(`${file}-video-streamable.mp4`))
	  // input audio only stream
	  .addInput(`${file}-audio.aac`)
	  .format('mp4')
	  // required bcz mp4 needs to write header in the front after completing whole encoding
	  .outputOptions('-movflags frag_keyframe+empty_moov')
	  // display progress
	  .on('progress', function(progress) {
	    console.log(progress);
	  })
	  .on('error', function(err) {
	    console.log('An error occurred: ' + err.message);
	  })
	  // after whole merging operaton is finished
	  .on('end', function() {
	    console.log('Processing finished !');
	  })
	  // pipe the resulting merged stream to output
	  .pipe(res, { end: true })

})

module.exports = router;