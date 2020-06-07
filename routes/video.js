const { spawn } = require('child_process');
const fs = require('fs');

let express = require('express');
let router  = express.Router();

//fluent ffmpeg
var ffmpeg = require('fluent-ffmpeg');

router.get('/', function(req, res){


  var pathToMovie = './public/Lamberghini.mp4';

  res.set('Content-Type', 'video/mp4');

  //encoding the video source
  // ffmpeg({source: pathToMovie})
  // 	// .seekInput(10)
  // 	.toFormat('mp4')
  // 	.outputOptions('-movflags frag_keyframe+empty_moov')
  // 	.on('progress', function(progress) {
  //   	console.log(progress);
  // 	})
	 //  .on('error', function(err) {
	 //    console.log('An error occurred: ' + err.message);
	 //  })
	 //  .on('end', function() {
	 //    console.log('Processing finished !');
	 //  })
	 //  .pipe(res, { end: true })
	 //  // .stream(outStream, { end: true })


  // var ffmpeg = require('fluent-ffmpeg');
  // ffmpeg(pathToMovie)
  // 		.toFormat('mp4')
  //     // .preset('flashvideo')
  //     .on('error', function (err) {
  //         console.log('an error happened: ' + err.message);
  //         res.send(err.message);
  //     })
  //     .output(res, { end: true })
  //     .run();



	var file = './public/4d';

	var ffmpeg = require('fluent-ffmpeg');
	ffmpeg()
	  .addInput(fs.createReadStream(`${file}-video-streamable.mp4`))
	  // .addInput(`${file}-video-streamable.mp4`)
	  // .addInput(fs.createReadStream(`${file}-audio.aac`))
	  .addInput(`${file}-audio.aac`)
	  .format('mp4')
	  .outputOptions('-movflags frag_keyframe+empty_moov')
	  .on('progress', function(progress) {
	    console.log(progress);
	  })
	  .on('error', function(err) {
	    console.log('An error occurred: ' + err.message);
	  })
	  .on('end', function() {
	    console.log('Processing finished !');
	  })
	  .pipe(res, { end: true })
	  // .stream(outStream, { end: true })
	  // .save(`${file}-merged.mp4`, function(stdout, stderr) {
	  //   console.log('file has been combined succesfully');
	  // });
})

module.exports = router;