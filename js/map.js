paper.install(window);
window.onload = function () {
	// Get a reference to the canvas object
	canvas = document.getElementById('map');
	// Create an empty project and a view for the canvas:
	paper.setup(canvas);

  var star1 = new Path.Star({
    center: new Point(50, 50),
    points: 12,
    radius1: 25,
    radius2: 40,
    fillColor: 'black'
  });
  var x1 = new Segment(new Point(50,50));
  var x2 = new Segment(new Point(200,200));
  var connect = new Path(x1, x2);
  connect.strokeColor = "black";
  connect.strokeWidth = 5;
};
