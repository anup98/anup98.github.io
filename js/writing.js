
var canvas, path, paths = [], textItem, drawing = false;

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
	textItem.innerText = 'Segment count: ' + path.segments.length;
}

// When the mouse is released, we simplify the path:
function onMouseUp(event) {
	console.log("Mouse Up");
	drawing = false;
	paths.push(path)
	var segmentCount = path.segments.length;

	// When the mouse is released, simplify it:
	path.simplify(10);

	// Select the path, so we can see its segments:
	path.fullySelected = true;

	var newSegmentCount = path.segments.length;
	var difference = segmentCount - newSegmentCount;
	var percentage = 100 - Math.round(newSegmentCount / segmentCount * 100);
	textItem.innerText = difference + ' of the ' + segmentCount + ' segments were removed. Saving ' + percentage + '%';
}


// Only executed our code once the DOM is ready.
window.onload = function () {
	// Get a reference to the canvas object
	canvas = document.getElementById('writing');
	textItem = document.getElementById('textItem');
	clearbtn = document.getElementById('clear');
	// Create an empty project and a view for the canvas:
	paper.setup(canvas);
	// Add event listeners to draw on the canvas
	canvas.addEventListener('mousedown', onMouseDown);
	canvas.addEventListener('mousemove', onMouseDrag);
	canvas.addEventListener('mouseup', onMouseUp);
	clearbtn.addEventListener('click', clear);
}

function clear() {
	paths.forEach(path => {
		path.clear();
	});
}