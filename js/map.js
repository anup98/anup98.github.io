paper.install(window);
var pencil = new paper.Tool();
var star1, star2, star3, star4, star5;
var text1, text2, text3, text4, text5;

pencil.onMouseDown = function(event) {
	if (star1.contains(event.point) || text1.contains(event.point)){
		star1.scale(.8);
	}
};

pencil.onMouseUp = function (event) {
	if (star1.contains(event.point) || text1.contains(event.point)){
		star1.scale(1);
		document.location = "canvas.html";
	}
};

window.onload = function () {
	// Get a reference to the canvas object
	canvas = document.getElementById('map');
	// Create an empty project and a view for the canvas:
	paper.setup(canvas);

	text1 = new PointText({
		fillColor: 'black',
		content: '1'
	});

  star1 = new Path.Star({
    center: new Point(900, 500),
    points: 6,
    radius1: 18,
    radius2: 35,
    fillColor: 'gold'
  });

	star2 = star1.clone();
	star3 = star2.clone();
	star4 = star2.clone();
	star5 = star4.clone();
	text2 = text1.clone();
	text3 = text1.clone();
	text4 = text1.clone();
	text5 = text1.clone();

	star2.bounds.center = new Point(634, 500);
	star3.bounds.center = new Point(367, 500);
	star4.bounds.center = new Point(100, 500);
	star5.bounds.center = new Point(100, 300);

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
	var x5 = new Segment(star5.bounds.center, new Point(-150, 80), null);

  var connect = new Path({
		strokeColor: "blue",
		strokeWidth: 3
	});

	connect.add(x1);
	connect.add(x2);
	connect.add(x3);
	connect.add(x4);
	connect.add(x5);
	var scaler = .2;
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
