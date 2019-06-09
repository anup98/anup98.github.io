// This is so we don't have to say paper. before everything
paper.install(window);

let canvas, path, paths = [], drawing = false, letter;
let pencil = new paper.Tool();
let A_DATA;

pencil.onMouseDown = function(event) {
	if (letter.start.contains(event.point)){
		drawing = true;
		path = new Path({
			segments: [event.point],
			strokeColor: '#000000',
			strokeWidth: 6
		});
	}
};

// While the user drags the mouse, points are added to the path
// at the position of the mouse:
pencil.onMouseDrag = function(event) {
	if (!drawing) return;
	letter.start.position = event.point;
	letter.start.opacity = 0.2;
	path.add(event.point);
	if (!letter.checkBounds(event.point)) {
		drawing = false;
		path.remove();
		letter.removeStartEnd();
		letter.addStartEnd();
	}

};

// When the mouse is released, we simplify the path:
pencil.onMouseUp = function (event) {
	if (!drawing) return;
	if (letter.end.bounds.contains(event.point)) {
		letter.start.opacity = 1;
		drawing = false;
		paths.push(path);
		letter.next();
	} else {
		drawing = false;
		path.remove();
		letter.removeStartEnd();
		letter.addStartEnd();
	}
};

// Only executed our code once the DOM is ready.
window.onload = function () {
	// Get a reference to the canvas object
	canvas = document.getElementById('writing');
	let canvas_width = canvas.offsetWidth, canvas_height = canvas.offsetHeight;
	// Create an empty project and a view for the canvas:
	paper.setup(canvas);

	A_DATA = new CompoundPath({
		children: [
			new Path({
				segments: [
					[canvas_width * 0.5 , canvas_height * 0.05],
					[canvas_width * 0.35, canvas_height * 0.7 ]
				]
			}),
			new Path({
				segments: [
					[canvas_width * 0.5 , canvas_height * 0.05],
					[canvas_width * 0.65, canvas_height * 0.7 ]
				]
			}),
			new Path({
				segments: [
					[canvas_width * 0.425, canvas_height * 0.375],
					[canvas_width * 0.575, canvas_height * 0.375]
				]
			})
		],
		strokeColor: '#78787a',
		strokeWidth: 5,
		dashArray: [15,8]
	});
	letter = new Letter(A_DATA);
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
	 * @param {CompoundPath} paths
	 * @memberof Letter
	 */
	constructor(paths) {
		this.paths = paths;
		this.path_idx = 0;
		this.activePath = this.paths.children[this.path_idx];
		this.startPoint = this.activePath.firstSegment.point;
		this.endPoint = this.activePath.lastSegment.point;
		this.addStartEnd();
	}

	// TODO: be able to switch active paths once one is completed
	// TODO: do something when the letter is finished

	/**
	 * If point is outside 50 pixels from the nearest part of the curve,
	 * stop drawing and remove the path
	 *
	 * @param {paper.Point} point
	 * @returns true if point is within 50 pixels of the curve
	 * @memberof Letter
	 */
	checkBounds(point) {
		return (this.activePath.getNearestLocation(point).distance < 50);
	}

	next() {
		// this.paths.children[0].remove();
		this.removeStartEnd();
		if (++this.path_idx >= this.paths.children.length) {
			window.location.href = "./map.html";
			return;
		}
		this.activePath = this.paths.children[this.path_idx];
		this.startPoint = this.activePath.firstSegment.point;
		this.endPoint = this.activePath.lastSegment.point;
		this.addStartEnd();
	}

	addStartEnd() {
		this.start = Path.Circle({
			center: this.startPoint,
			radius: 25,
			fillColor: "#68ff51"
		});
		this.end = Path.Circle({
			center: this.endPoint,
			radius: 25,
			fillColor: "#e7444e"
		});
	}

	removeStartEnd() {
		this.start.remove();
		this.end.remove();
	}
}