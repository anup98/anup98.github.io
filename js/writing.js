
var canvas, path, paths = [], drawing = false, circ, endCirc;
var tool = new paper.Tool();
var startPoints = [];
var endPoints = [];
var index = 0;

tool.onMouseDown = function(event) {
	if (circ.contains(event.point)){
		drawing = true;
		path = new paper.Path({
			segments: [event.point],
			strokeColor: '#9816d3',
		});
	}
};

// While the user drags the mouse, points are added to the path
// at the position of the mouse:
tool.onMouseDrag = function(event) {
	if (!drawing) return;
	circ.position = event.point;
	circ.opacity = 0.2;
	path.add(event.point);
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
tool.onMouseUp = function(event) {
	if (drawing) {
		circ.position = event.point;
		circ.opacity = 1;
		drawing = false;
		paths.push(path);
		console.log(event.point);
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

	//console.log(rect);
};
