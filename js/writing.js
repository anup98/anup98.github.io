
var canvas, path, textItem, drawing = false;

function onMouseDown(event) {
	console.log(event);
	console.log("Mouse Down");
	drawing = true;
	// If we produced a path before, deselect it:
	if (path) {
		path.selected = false;
	}

	// Create a new path and set its stroke color to black:
	path = new paper.Path({
		segments: [new paper.Point(event.offsetX, event.offsetY)],
		strokeColor: 'black',
		// Select the path, so we can see its segment points:
		fullySelected: true
	});
}

// While the user drags the mouse, points are added to the path
// at the position of the mouse:
function onMouseDrag(event) {
	if (!drawing) return;
	console.log("Mouse Drag");
	path.add(new paper.Point(event.offsetX, event.offsetY));

	// Update the content of the text item to show how many
	// segments it has:
	textItem.content = 'Segment count: ' + path.segments.length;
}

// When the mouse is released, we simplify the path:
function onMouseUp(event) {
	console.log("Mouse Up");
	drawing = false;
	var segmentCount = path.segments.length;

	// When the mouse is released, simplify it:
	path.simplify(10);

	// Select the path, so we can see its segments:
	path.fullySelected = true;

	var newSegmentCount = path.segments.length;
	var difference = segmentCount - newSegmentCount;
	var percentage = 100 - Math.round(newSegmentCount / segmentCount * 100);
	textItem.content = difference + ' of the ' + segmentCount + ' segments were removed. Saving ' + percentage + '%';
}


// Only executed our code once the DOM is ready.
window.onload = function () {
	// Get a reference to the canvas object
	canvas = document.getElementById('writing');
	textItem = document.getElementById('textItem');
	// Create an empty project and a view for the canvas:
	paper.setup(canvas);
	// Create a Paper.js Path to draw a line into it:
	// path = new paper.Path();
	// // Give the stroke a color
	// path.strokeColor = 'black';
	// var start = new paper.Point(100, 100);
	// // Move to start and draw a line from there
	// path.moveTo(start);
	// // Note that the plus operator on Point objects does not work
	// // in JavaScript. Instead, we need to call the add() function:
	// path.lineTo(start.add([200, -50]));
	// // Draw the view now:
	// paper.view.draw();

	canvas.addEventListener('mousedown', onMouseDown);
	canvas.addEventListener('mousemove', onMouseDrag);
	canvas.addEventListener('mouseup', onMouseUp);
}