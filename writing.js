// let canvas = document.getElementById('writing');
// let context = canvas.getContext("2d");
// let path;
//
// function onMouseDown(event) {
// 	// If we produced a path before, deselect it:
// 	if (path) {
// 		path.selected = false;
// 	}
//
// 	// Create a new path and set its stroke color to black:
// 	path = new Path({
// 		segments: [event.point],
// 		strokeColor: 'black',
// 		// Select the path, so we can see its segment points:
// 		fullySelected: true
// 	});
// }
//
// // While the user drags the mouse, points are added to the path
// // at the position of the mouse:
// function onMouseDrag(event) {
// 	path.add(event.point);
//
// 	// Update the content of the text item to show how many
// 	// segments it has:
// 	textItem.content = 'Segment count: ' + path.segments.length;
// }
//
// // When the mouse is released, we simplify the path:
// function onMouseUp(event) {
// 	var segmentCount = path.segments.length;
//
// 	// When the mouse is released, simplify it:
// 	path.simplify(10);
//
// 	// Select the path, so we can see its segments:
// 	path.fullySelected = true;
//
// 	var newSegmentCount = path.segments.length;
// 	var difference = segmentCount - newSegmentCount;
// 	var percentage = 100 - Math.round(newSegmentCount / segmentCount * 100);
// 	textItem.content = difference + ' of the ' + segmentCount + ' segments were removed. Saving ' + percentage + '%';
// }


	// Create a Paper.js Path to draw a line into it:
	var path = new Path();
	// Give the stroke a color
	path.strokeColor = 'black';
	var start = new Point(100, 100);
	// Move to start and draw a line from there
	path.moveTo(start);
	// Note the plus operator on Point objects.
	// PaperScript does that for us, and much more!
	path.lineTo(start + [ 100, -50 ]);