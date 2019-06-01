
var canvas, path, paths = [], drawing = false, rect;
var tool = new paper.Tool();

tool.onMouseDown = function(event) {
	drawing = true;
	// Create a new path and set its stroke color to black:
	path = new paper.Path({
		segments: [event.point],
		strokeColor: '#9816d3',
	});
}

// While the user drags the mouse, points are added to the path
// at the position of the mouse:
tool.onMouseDrag = function(event) {
	if (!drawing) return;
	path.add(event.point);
}

// When the mouse is released, we simplify the path:
tool.onMouseUp = function(event) {
	drawing = false;
	paths.push(path)
}

// Only executed our code once the DOM is ready.
window.onload = function () {
	// Get a reference to the canvas object
	canvas = document.getElementById('writing');
	// Create an empty project and a view for the canvas:
	paper.setup(canvas);
	rect = new paper.Path.Rectangle(10, 20, 200, 100);
	rect.fillColor = "#000000"
	console.log(rect);
}

function clear() {
	paths.forEach(path => {
		path.clear();
	});
}