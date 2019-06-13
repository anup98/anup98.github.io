// This is so we don't have to say paper. before everything
paper.install(window);

var canvas, path, paths = [], drawing = false, letter, touch_id;
var pencil = new paper.Tool();
var A_DATA, D_DATA, F_DATA, K_DATA, Q_DATA, S_DATA;

var nextButton;

pencil.onMouseDown = function(event) {
    event.preventDefault();
    if (event.event.type === "touchstart") {
        for (var i = 0; i < event.event.changedTouches.length; ++i) {
            if (letter.start.contains([event.event.changedTouches[i].pageX, event.event.changedTouches[i].pageY])) {
                console.log(event.event.changedTouches[i].identifier);
                touch_id = event.event.changedTouches[i].identifier;
                drawing = true;
                path = new Path({
                    segments: [event.event.changedTouches[i].pageX, event.event.changedTouches[i].pageY],
                    strokeColor: '#000000',
                    strokeWidth: 6
                });
            }
        }
    } else {
        if (letter.start.contains(event.point)) {
            drawing = true;
            path = new Path({
                segments: [event.point],
                strokeColor: '#000000',
                strokeWidth: 6
            });
        }
    }
};

// While the user drags the mouse, points are added to the path
// at the position of the mouse:
pencil.onMouseDrag = function(event) {
    event.preventDefault();
    if (!drawing) return;
    if (event.event.type === "touchmove") {
        console.log(event.event.changedTouches);
        for (var i = 0; i < event.event.changedTouches.length; ++i) {
            console.log(event.event.changedTouches[i].identifier,event.event.changedTouches[i].pageX,event.event.changedTouches[i].pageY);
            if (event.event.changedTouches[i].identifier === touch_id) {
                letter.start.position = [event.event.changedTouches[i].pageX, event.event.changedTouches[i].pageY];
                letter.start.opacity = 0.2;
                if (!letter.checkBounds(letter.start.position)) {
                    drawing = false;
                    path.remove();
                    letter.removeStartEnd();
                    letter.addStartEnd();
                } else {
                    path.add(letter.start.position);
                }
            }
        }
    } else {
        letter.start.position = event.point;
        letter.start.opacity = 0.2;
        path.add(event.point);
        if (!letter.checkBounds(event.point)) {
            drawing = false;
            path.remove();
            letter.removeStartEnd();
            letter.addStartEnd();
        }
    }
};

// When the mouse is released, we simplify the path:
pencil.onMouseUp = function (event) {
    event.preventDefault();
    if (!drawing) return;
    if (event.event.type === "mouseup") {
        for (var i = 0; i < event.event.changedTouches.length; ++i) {
            if (event.event.changedTouches[i].identifier === touch_id) {
                if (letter.end.contains([event.event.changedTouches[i].pageX, event.event.changedTouches[i].pageY])) {
                    letter.start.opacity = 1;
                    drawing = false;
                    paths.push(path);
                    if (!letter.next()) {
                        nextButton.visible = true;
                    }
                } else {
                    drawing = false;
                    path.remove();
                    letter.removeStartEnd();
                    letter.addStartEnd();
                }
            }
        }
    } else {
        if (letter.end.bounds.contains(event.point)) {
            letter.start.opacity = 1;
            drawing = false;
            paths.push(path);
            if (!letter.next()) {
                nextButton.visible = true;
            }
        } else {
            drawing = false;
            path.remove();
            letter.removeStartEnd();
            letter.addStartEnd();
        }
    }
};

function sendTouchEvent(x, y, element, eventType) {
  const touchObj = new Touch({
    identifier: Date.now(),
    target: element,
    clientX: x,
    clientY: y,
    radiusX: 2.5,
    radiusY: 2.5,
    rotationAngle: 10,
    force: 0.5,
  });

  const touchEvent = new TouchEvent(eventType, {
    cancelable: true,
    bubbles: true,
    touches: [touchObj],
    targetTouches: [],
    changedTouches: [touchObj],
    shiftKey: true,
  });

  element.dispatchEvent(touchEvent);
}

// Only executed our code once the DOM is ready.
window.onload = function () {
	// Get a reference to the canvas object
	canvas = document.getElementById('writing');
	// Create an empty project and a view for the canvas:
	paper.setup(canvas);

	nextButton = new Shape.Rectangle({
        topLeft: [canvas.offsetWidth/2 - 50, 50],
        bottomRight: [canvas.offsetWidth/2 + 50, 90],
        strokeColor: 'black',
        fillColor: '#c2c2c2',
        visible: false
    });

	view.onFrame = function(event) {
	    if (typeof Touch !== 'undefined' &&
            typeof TouchEvent !== 'undefined' &&
            Touch.length === 1 &&
            TouchEvent.length === 1) {
            sendTouchEvent(490, 150, canvas, 'touchstart');
            sendTouchEvent(490, 150, canvas, 'touchmove');
            sendTouchEvent(490, 150, canvas, 'touchend');
        }
    };


	// TODO: Create a json file of Path data to read from so we won't need all of this
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
		]
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
		]
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
		]
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
		]
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
		]
	});

	S_DATA = new CompoundPath({ // TODO: Fix this 'S'
		children: [
			new Path({
				segments: [
					[[40 , 15], null, [-35, -15]],
					[[25 , 47], [-30, -10], [35, 5]],
					[[0 , 80], [50, 25], null]
				]
			})
		]
	});

	D_DATA.visible = false;
	A_DATA.visible = false;
	F_DATA.visible = false;
	K_DATA.visible = false;
	Q_DATA.visible = false;
	S_DATA.visible = false;

	var queryString = window.location.search.substring(1);
	var query = queryString.split('&');
	console.log(query);
	var params = {};

    for (var i = 0; i < query.length; i++) {
		var temp = query[i].split('=');
		params[temp[0]] = temp[1];
    }

	switch (params['letter']) {
		case 'A':
			letter = new Letter(A_DATA, params.progression);
			letter.nextLevel = 2;
			break;
		case 'D':
			letter = new Letter(D_DATA, params.progression);
			letter.nextLevel = 3;
			break;
		case 'F':
			letter = new Letter(F_DATA, params.progression);
			letter.nextLevel = 4;
			break;
		case 'K':
			letter = new Letter(K_DATA, params.progression);
			letter.nextLevel = 5;
			break;
		case 'Q':
			letter = new Letter(Q_DATA, params.progression);
			letter.nextLevel = 6;
			break;
		case 'S':
		default:
			letter = new Letter(S_DATA, params.progression);
			letter.nextLevel = 1;
			break;
    }

	// TODO: place and scale letters responsive-ly (or at least tailored to the big iPads)
    // TODO: pro - gres - sion (first 2 or 3 should be fine)
	letter.scale(3);
	letter.move(new Point(canvas.offsetWidth/2 - letter.getWidth()/2, 150));

	nextButton.on('mousedown', function () {
        if (!nextButton.visible) return;
        window.location.href = "./canvas.html?level=" + params['letter'] + "&progression=" + (letter.progression + 1);
    });
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
     * @param {char} progression
	 * @memberof Letter
	 */
	constructor(paths, progression) {
        this.paths = paths;
        this.progression = progression;
        this.paths.strokeColor = '#787878';
        this.paths.strokeWidth = 5;
        this.path_idx = 0;
        this.activePath = this.paths.children[this.path_idx];
        this.startPoint = this.activePath.firstSegment.point;
        this.endPoint = this.activePath.lastSegment.point;

        switch (this.progression) {
            default:
            case '0':
                this.paths.visible = true;
                this.addStartEnd();
                break;
            case '1':
                this.paths.dashArray = [15, 8];
                this.paths.visible = true;
                this.addStartEnd();
                break;
            case '2':
                this.paths.visible = false;
                this.addStartEnd();
                break;
        }
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
			return false;
		}
		this.activePath = this.paths.children[this.path_idx];
		this.startPoint = this.activePath.firstSegment.point;
		this.endPoint = this.activePath.lastSegment.point;
		this.addStartEnd();
		return true;
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
	    var x = this.paths.position.x - this.paths.bounds._width/2;
	    var y = this.paths.position.y - this.paths.bounds._height/2;
	    return new Point(x, y);
    }

    getWidth() {
	    return this.paths.bounds._width;
    }

    getHeight() {
	    return this.paths.bounds._height;
    }
}