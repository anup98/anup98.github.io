paper.install(window);
var pencil = new paper.Tool();
var star1, star2, star3, star4, star5, activeStar;
var text1, text2, text3, text4, text5;

// TODO: try making an array of stars. This would be much more scalable long-term
// TODO: add another star for 'S'
// TODO: put the stars in better places

pencil.onMouseDown = function(event) {
	if (activeStar.contains(event.point) || text1.contains(event.point)){
		activeStar.scale(.8);
	}
	console.log(event.point);
};

pencil.onMouseUp = function (event) { // TODO: the stars have mousedown events that may work better
	if (activeStar.contains(event.point) || text1.contains(event.point)){
		activeStar.scale(1);
		window.location.href = "canvas.html?letter=" + activeStar.level;
	}
};

window.onresize = function() {
	window.location.reload(true);
	console.log("change");
};

window.onload = function () {
	// Get a reference to the canvas object
	canvas = document.getElementById('map');
	// Create an empty project and a view for the canvas:
	paper.setup(canvas);

	var queryString = window.location.search.substring(1);
	var query = queryString.split('&');
	var params = {};

    for (var i = 0; i < query.length; i++) {
		var temp = query[i].split('=');
		params[temp[0]] = temp[1];
    }

	text1 = new PointText({
		fillColor: 'black',
		content: '1'
	});
	var width = window.innerWidth;
	var height = window.innerHeight;

	console.log(width, height);
  star1 = new Path.Star({
    center: new Point(width/5, height - 100),
    points: 6,
    radius1: 14,
    radius2: 27,
    fillColor: 'white'
  });

	star2 = star1.clone();
	star3 = star2.clone();
	star4 = star2.clone();
	star5 = star4.clone();
	text2 = text1.clone();
	text3 = text1.clone();
	text4 = text1.clone();
	text5 = text1.clone();

	switch (params['level']) {
		case '2':
			activeStar = star2;
			activeStar.level = 'D';
			break;
		case '3':
			activeStar = star3;
			activeStar.level = 'F';
			break;
		case '4':
			activeStar = star4;
			activeStar.level = 'K';
			break;
		case '5':
			activeStar = star5;
			activeStar.level = 'Q';
			break;
		default:
			activeStar = star1;
			activeStar.level = 'A';
			break;
    }

	activeStar.fillColor = 'gold';
	activeStar.scale(1.3);

	star2.bounds.center = new Point(0.4*width, height - 100);
	star3.bounds.center = new Point(0.6*width, height - 100);
	star4.bounds.center = new Point(0.8*width, height - 100);
	star5.bounds.center = new Point(0.8*width, height - 300);

	text1.position = new Point(star1.bounds.center);
	text2.position = new Point(star2.bounds.center);
	text3.position = new Point(star3.bounds.center);
	text4.position = new Point(star4.bounds.center);
	text5.position = new Point(star5.bounds.center);

	text2.content = '2';
	text3.content = '3';
	text4.content = '4';
	text5.content = '5';

  var x1 = new Segment(star1.bounds.center);
  var x2 = new Segment(star2.bounds.center);
	var x3 = new Segment(star3.bounds.center);
	var x4 = new Segment(star4.bounds.center);
	var x5 = new Segment(star5.bounds.center, new Point(150, 80), null);

  var connect = new Path({
		strokeColor: "blue",
		strokeWidth: 3
	});

	connect.add(x1);
	connect.add(x2);
	connect.add(x3);
	connect.add(x4);
	connect.add(x5);

	view.onResize = function (event){
		star1.bounds.center = new Point(0.2*window.innerWidth, window.innerHeight - 100);
		star2.bounds.center = new Point(0.4*window.innerWidth, window.innerHeight - 100);
		star3.bounds.center = new Point(0.6*window.innerWidth, window.innerHeight - 100);
		star4.bounds.center = new Point(0.8*window.innerWidth, window.innerHeight - 100);
		star5.bounds.center = new Point(0.8*window.innerWidth, window.innerHeight - 300);

		text1.position = new Point(star1.bounds.center);
		text2.position = new Point(star2.bounds.center);
		text3.position = new Point(star3.bounds.center);
		text4.position = new Point(star4.bounds.center);
		text5.position = new Point(star5.bounds.center);

		text2.content = '2';
		text3.content = '3';
		text4.content = '4';
		text5.content = '5';

		connect.removeSegments();

	  var x1 = new Segment(star1.bounds.center);
	  var x2 = new Segment(star2.bounds.center);
		var x3 = new Segment(star3.bounds.center);
		var x4 = new Segment(star4.bounds.center);
		var x5 = new Segment(star5.bounds.center, new Point(150, 80), null);

		connect.add(x1);
		connect.add(x2);
		connect.add(x3);
		connect.add(x4);
		connect.add(x5);
	}
	view.onFrame = function (event){
		connect.sendToBack();
		star1.rotate(1);
		star2.rotate(1);
		star3.rotate(1);
		star4.rotate(1);
		star5.rotate(1);

		text1.bringToFront();
		text2.bringToFront();
		text3.bringToFront();
		text4.bringToFront();
		text5.bringToFront();
	}
};
