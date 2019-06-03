// This is so we don't have to say paper. before everything
paper.install(window) 

var canvas, path, paths = [], drawing = false, circ, endCirc, testPath, letter;
var pencil = new Tool();
var startPoints = [];
var endPoints = [];
var index = 0;

pencil.onMouseDown = function(event) {
	if (circ.contains(event.point)){
		drawing = true;
		path = new Path({
			segments: [event.point],
			strokeColor: '#9816d3',
			strokeWidth: 3
		});
	}
};

// While the user drags the mouse, points are added to the path
// at the position of the mouse:
pencil.onMouseDrag = function(event) {
	if (!drawing) return;
	circ.position = event.point;
	circ.opacity = 0.2;
	path.add(event.point);
	if (!letter.checkBounds(event.point)) {
		drawing = false;
		path.clear();
	}
	if (endCirc.bounds.contains(circ.bounds) && index <= 1){
		circ.position = startPoints[index];
		endCirc.position = endPoints[index];
		index += 1;
		circ.opacity = 1;
		drawing = false;
	}else if (endCirc.bounds.contains(circ.bounds) && index == 2){
		endCirc.visible = false;
		circ.visible = false;
		drawing = false;
	}

};

// When the mouse is released, we simplify the path:
pencil.onMouseUp = function (event) {
	if (drawing) {
		// circ.position = event.point;
		// circ.opacity = 1;
		drawing = false;
		paths.push(path);
		// console.log(event.point);
	}
};

// Only executed our code once the DOM is ready.
window.onload = function () {
	// Get a reference to the canvas object
	canvas = document.getElementById('writing');
	// Create an empty project and a view for the canvas:
	paper.setup(canvas);
	// endPoints.push([52,725]);
	endPoints.push([547,725]);
	endPoints.push([488,568]);
	// startPoints.push([295,80]);
	startPoints.push([295,80]);
	startPoints.push([113,568])


	circ = new paper.Path.Circle({
	center: [295, 80],
	radius: 15,
	fillColor: "#0000FF"
	});
	endCirc = new paper.Path.Circle({
	center: [52, 725],
	radius: 26,
	fillColor: "#0000FF"
	});
//53,730

	testPath = new Path();
	testPath.strokeColor = "#FF0000";
	testPath.strokeWidth = 5;
	testPath.dashArray = [15,8]
	testPath.add(new Point(295, 80));
	testPath.add(new Point(52, 725));
	letter = new Letter(testPath);
};

/**
 * Contains useful variables and functions for a renderable letter
 * that can be drawn on
 *
 * @class Letter
 */
class Letter {
	/**
	 * Creates an instance of Letter.
	 * @param {Path} path
	 * @memberof Letter
	 */
	constructor(path) {
		this.path = path;
	}

	/**
	 * If point is outside 50 pixels from the nearest part of the curve,
	 * stop drawing and remove the path
	 *
	 * @param {paper.Point} point
	 * @returns true if point is within 50 pixels of the curve
	 * @memberof Letter
	 */
	checkBounds(point) {
		return (this.path.getNearestLocation(point).distance < 50);
	}
}