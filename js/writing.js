// This is so we don't have to say paper. before everything
paper.install(window);

let canvas, path, paths = [], drawing = false, letter;
let pencil = new paper.Tool();
let A_DATA, D_DATA, F_DATA, K_DATA, Q_DATA, S_DATA;

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
	// let canvas_width = canvas.offsetWidth, canvas_height = canvas.offsetHeight;
	// Create an empty project and a view for the canvas:
	paper.setup(canvas);

	// Item.importSVG('images/A.svg');

	A_DATA = new CompoundPath({
		children: [
			new Path({
				segments: [
					[35 , 0],
					[0, 100]
				]
			}),
			new Path({
				segments: [
					[35 , 0],
					[70, 100]
				]
			}),
			new Path({
				segments: [
					[17.5, 50],
					[52.5, 50]
				]
			})
		],
		strokeColor: '#787878',
		strokeWidth: 5,
		dashArray: [15,8]
	});

	D_DATA = new CompoundPath({
		children: [
			new Path({
				segments: [
					[0, 0],
					[0, 100]
				]
			}),
			new Path({
				segments: [
					[[0 , 0], null, [75, 0]],
					[[0 , 100], [75, 0], null]
				]
			})
		],
		strokeColor: '#787878',
		strokeWidth: 5,
		dashArray: [15,8]
	});

	F_DATA = new CompoundPath({
		children: [
			new Path({
				segments: [
					[0, 0],
					[0, 100]
				]
			}),
			new Path({
				segments: [
					[0, 0],
					[50, 0]
				]
			}),
			new Path({
				segments: [
					[0 , 50],
					[30 , 50]
				]
			})
		],
		strokeColor: '#787878',
		strokeWidth: 5,
		dashArray: [15,8]
	});

	K_DATA = new CompoundPath({
		children: [
			new Path({
				segments: [
					[0, 0],
					[0, 100]
				]
			}),
			new Path({
				segments: [
					[50, 0],
					[0, 50],
					[50 , 100]
				]
			})
		],
		strokeColor: '#787878',
		strokeWidth: 5,
		dashArray: [15,8]
	});

	Q_DATA = new CompoundPath({
		children: [
			new Path({
				segments: [
					[[50 , 0], [30, 0], [-30, 0]],
					[[0 , 50], [0, -30], [0, 30]],
					[[50 , 100], [-30, 0], [30, 0]],
					[[100 , 50], [0, 30], [0, -30]],
					[[50 , 0], [30, 0], [-30, 0]]
				]
			}),
			new Path({
				segments: [
					[75, 75],
					[100 , 100]
				]
			})
		],
		strokeColor: '#787878',
		strokeWidth: 5,
		dashArray: [15,8]
	});

	S_DATA = new CompoundPath({
		children: [
			new Path({
				segments: [
					[[40 , 15], null, [-35, -15]],
					[[25 , 47], [-30, -10], [35, 5]],
					[[0 , 80], [50, 25], null]
				]
			})
		],
		strokeColor: '#787878',
		strokeWidth: 5,
		dashArray: [15,8]
	});

	let queryString = window.location.search.substring(1);
	let query = queryString.split('&');
	let params = {};

    for (let i = 0; i < query.length; i++) {
		let temp = query[i].split('=');
		params[temp[0]] = temp[1];
    }

	switch (params['letter']) {
		case 'A':
			letter = new Letter(A_DATA);
			break;
		case 'D':
			letter = new Letter(D_DATA);
			break;
		case 'F':
			letter = new Letter(F_DATA);
			break;
		case 'K':
			letter = new Letter(K_DATA);
			break;
		case 'Q':
			letter = new Letter(Q_DATA);
			break;
		case 'S':
		default:
			letter = new Letter(S_DATA);
			break;
    }

	// TODO: place and scale letters responsive-ly (or at least tailored to the big iPads)
    // TODO: pro - gres - sion (first 2 or 3 should be fine)
	letter.scale(3);
	letter.move(new Point(canvas.offsetWidth/2 - letter.getWidth()/2, 150));
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
			window.location.href = "./map.html?level=2";
			return;
		}
		this.activePath = this.paths.children[this.path_idx];
		this.startPoint = this.activePath.firstSegment.point;
		this.endPoint = this.activePath.lastSegment.point;
		this.addStartEnd();
	}

	addStartEnd() {
		this.end = Path.Circle({
			center: this.endPoint,
			radius: 25,
			fillColor: "#e7444e"
		});
		this.start = Path.Circle({
			center: this.startPoint,
			radius: 25,
			fillColor: "#68ff51"
		});
		// TODO: add arrows to the starting circle
	}

	removeStartEnd() {
		this.start.remove();
		this.end.remove();
	}

	scale(scalar) {
        this.paths.scale(scalar, this.getPos());
        this.removeStartEnd();
        this.addStartEnd();
    }

    move(point) {
        this.paths.position.x = point.x + this.paths.bounds._width/2;
        this.paths.position.y = point.y + this.paths.bounds._height/2;
        this.removeStartEnd();
        this.addStartEnd();
    }

    getPos() {
	    let x = this.paths.position.x - this.paths.bounds._width/2;
	    let y = this.paths.position.y - this.paths.bounds._height/2;
	    return new Point(x, y);
    }

    getWidth() {
	    return this.paths.bounds._width;
    }

    getHeight() {
	    return this.paths.bounds._height;
    }
}