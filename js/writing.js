// This is so we don't have to say paper. before everything
paper.install(window);

var canvas, path, paths = [], drawing = false, letter, lines = [], touch_id;
var A_DATA, D_DATA, F_DATA, K_DATA, Q_DATA, S_DATA;

var nextButton;

/**
 * Gets index of the touch in the changed index array.
 * If it is not a changed touch but is still a touch, return a -1.
 * If it is not a touch anymore, return -2.
 * @param touches Array of current event touches
 * @param changedTouches Array of current event changed touches
 * @param id identifier to the touch we are looking for
 * @returns {number} index of the changed touch, -1, or -2
 */
function getTouch(touches, changedTouches, id) {
    for (var i = 0; i < changedTouches.length; i++) {
        if (changedTouches[i].identifier === id) return i;
    }
    for (var i = 0; i < touches.length; i++) {
        if (touches[i].identifier === id) return -1;
    }
    return -2;
}

var touch = false;
function touchStart(ev){
    ev.preventDefault();
    //Draw path for each touch
    for (var i = 0; i < ev.changedTouches.length; i++) {
        var x1, y1;
        x1 = ev.changedTouches[i].clientX;
        y1 = ev.changedTouches[i].clientY;
        if (letter.start.contains(new Point(x1,y1))){
            touch_id = ev.changedTouches[i].identifier;
            path = new Path({
                segments: [x1, y1],
                strokeColor: '#000000',
                strokeWidth: 8
            });
            touch = true;
            break;
        }
    }
}

function touchEnd(ev){
    ev.preventDefault();
    if (!touch) return;
    console.log(ev);

    var touchIdx = getTouch(ev.touches, ev.changedTouches, touch_id);
    if (touchIdx >= 0 && letter.end.contains([ev.changedTouches[touchIdx].clientX,
                                              ev.changedTouches[touchIdx].clientY])) {
        letter.start.opacity = 1;
        touch = false;
        paths.push(path);
        if (!letter.next()) {
            nextButton.visible = true;
        }
    } else if (touchIdx === -2) {
        touch = false;
        path.remove();
        letter.removeStartEnd();
        letter.addStartEnd();
    }
}

function touchmove(ev) {
    ev.preventDefault();
    if (!touch) return;

    //Draw path for each touch
    var touchIdx = getTouch(ev.touches, ev.changedTouches, touch_id);
    if (touchIdx >= 0 && letter.checkBounds([ev.changedTouches[touchIdx].clientX,
                                             ev.changedTouches[touchIdx].clientY])) {
        var x = ev.changedTouches[touchIdx].clientX;
        var y = ev.changedTouches[touchIdx].clientY;
        letter.start.position = new Point(x, y);
        path.add(letter.start.position);
    } else if (touchIdx !== -1) {
        touch = false;
        path.remove();
        letter.removeStartEnd();
        letter.addStartEnd();
    }
}

function Sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function(){
        this.sound.play();
    };
    this.stop = function(){
        this.sound.pause();
    };
}

// Only executed our code once the DOM is ready.
window.onload = function () {
	// Get a reference to the canvas object
	canvas = document.getElementById('writing');
	// Create an empty project and a view for the canvas:
	paper.setup(canvas);
	window.addEventListener('touchmove', function(e) {
	    e.preventDefault();
	}, false);
  //Listen multitouch event for simultation
  document.body.addEventListener('onmousedown', touchStart, false);
  document.body.addEventListener('onmousemove', touchmove, false);
  document.body.addEventListener('onmouseup', touchEnd, false);
  document.body.addEventListener('onmouseout', touchEnd, false);
  document.body.addEventListener('touchstart', touchStart, false);
  document.body.addEventListener('touchmove', touchmove, false);
  document.body.addEventListener('touchend', touchEnd, false);
  document.body.addEventListener('touchcancel', touchEnd, false);

	nextButton = new Shape.Rectangle({
        topLeft: [canvas.offsetWidth/2 - 50, 50],
        bottomRight: [canvas.offsetWidth/2 + 50, 90],
        strokeColor: 'black',
        fillColor: '#c2c2c2',
        visible: false
	});

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
	var params = {};

    for (var i = 0; i < query.length; i++) {
		var temp = query[i].split('=');
		params[temp[0]] = temp[1];
    }

    if (isNaN(parseInt(params['progression'], 10))) {
        params['progression'] = 0;
    }

	switch (params['letter']) {
		case 'A':
			letter = new Letter(A_DATA, params.progression);
			letter.sound = new Sound('sounds/Letter_A.m4a');
			letter.nextLevel = 2;
			break;
		case 'D':
			letter = new Letter(D_DATA, params.progression);
			letter.sound = new Sound('sounds/Letter_D.m4a');
			letter.nextLevel = 3;
			break;
		case 'F':
			letter = new Letter(F_DATA, params.progression);
			letter.sound = new Sound('sounds/Letter_F.m4a');
			letter.nextLevel = 4;
			break;
		case 'K':
			letter = new Letter(K_DATA, params.progression);
			letter.sound = new Sound('sounds/Letter_K.m4a');
			letter.nextLevel = 5;
			break;
		case 'Q':
			letter = new Letter(Q_DATA, params.progression);
			letter.sound = new Sound('sounds/Letter_Q.m4a');
			letter.nextLevel = 6;
			break;
		case 'S':
		default:
			letter = new Letter(S_DATA, params.progression);
			letter.sound = new Sound('sounds/Letter_S.m4a');
			letter.nextLevel = 1;
			break;
    }

	// TODO: place and scale letters responsive-ly (or at least tailored to the big iPads)
    // TODO: pro - gres - sion (first 2 or 3 should be fine)
	letter.scale(9/4);
	letter.move(new Point(canvas.offsetWidth/2 - letter.getWidth()/2, 150));
	letter.sound.play();

	nextButton.on('mousedown', function () {
        if (!nextButton.visible) return;
        window.location.href = "./canvas.html?level=" + params['letter'] + "&progression=" + (letter.progression + 1);
    });

	nextButton.on('mousedown', function () {
        if (!nextButton.visible) return;
        if (parseInt(params['progression'], 10) >= 2) {
            window.location.href = "./map.html?level=" + letter.nextLevel;
            return;
        }
        window.location.href = "./canvas.html?letter=" + params['letter'] + "&progression=" + (parseInt(params['progression'], 10) + 1);
    });

	lines[0] = new Path.Line({
        from: [0, 150],
        to: [canvas.offsetWidth, 150],
        strokeColor: '#8d97ff',
        strokeWidth: 3,
        opacity: 0.5
    });
	lines[1] = new Path.Line({
        from: [0, 150 + letter.getHeight()/2],
        to: [canvas.offsetWidth, 150 + letter.getHeight()/2],
        strokeColor: '#8d97ff',
        strokeWidth: 3,
        opacity: 0.5,
        dashArray: [20, 15]
    });
	lines[2] = new Path.Line({
        from: [0, 150 + letter.getHeight()],
        to: [canvas.offsetWidth, 150 + letter.getHeight()],
        strokeColor: '#ff858c',
        strokeWidth: 3,
        opacity: 0.5
    });

	lines[0].sendToBack();
	lines[1].sendToBack();
	lines[2].sendToBack();
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
     * @param {string} progression
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
