// Author: David Bang
	var windowHeight =  $(window).height(),
		windowWidth =  $(window).width(),
		restrictingDim = 3*Math.min(windowHeight, windowWidth),
		canvas = $("#canvas").get(0),
		context = canvas.getContext("2d"),
		traceCanvas = $("#traceCanvas").get(0),
		traceContext = traceCanvas.getContext('2d'),
		planetSize = restrictingDim/700,
		theSun = new Ball(10, "#ffff00"),
		theEarth = new Ball(10, "#3399ff"),
		playBool = false,
		traceBool = false,
		canvasDim = windowHeight*(2/3),
		timer = 0;
	
		// Resize the canvas(es) and place buttons below them
		canvas.width = canvasDim;
		canvas.height = canvasDim;
		traceCanvas.width = canvasDim;
		traceCanvas.height = canvasDim;
		$("#buttondiv").get(0).style.top = canvasDim + "px";
		$("#explanation").css("top", canvasDim+"px");

	var midx = canvas.width / 2,
		midy = canvas.height / 2,
		unit = canvasDim / 8,
		g = 8.0,
		delta_t = 0.005,
		x_init = 0.0, // Initial x position
		y_init = 1.5, // Initial y position
		v_x_init = 1.2, // 1.2
		v_y_init = 0.0, // 0.0
		n = 1,
		x = x_init,
		y = y_init,
		v_x = (v_x_init - ((0.5 * delta_t * g * x) / ((x * x + y * y) ** n))),
		v_y = (v_y_init - ((0.5 * delta_t * g * y) / (((x * x) + (y * y)) ** n))),

		// Changed from **n to **(0.5*(1-n)) so that 1 is the ellipse
		a_x = (-g) * x / (((x * x) + (y * y)) **(0.5*(1-n))),
		a_y = (-g) * y / (((x * x) + (y * y)) **(0.5*(1-n)));

	//Initial positions
	context.translate(midx,midy);
	traceContext.translate(midx,midy);
	$("#play-button").get(0).addEventListener("click", play, false);
	$("#reset").get(0).addEventListener("click", reset, false);
	$("#trace").get(0).addEventListener("click", trace, false);

	function play () {
		if (playBool) { //pause
			playBool = false;
			$("#play-button span").get(0).className = "glyphicon glyphicon-play";
		} 
		else { //play
			playBool = true;
			$("#play-button span").get(0).className = "glyphicon glyphicon-pause";
			drawFrame();
		}
	}

	function reset () {
		// Text inputs
		n = document.getElementById("textN").value;
    	document.getElementById("demo").innerHTML = "N = " + n;
    	delta_t = document.getElementById("textt").value;
    	document.getElementById("demo2").innerHTML = "Animation = " + delta_t;
    	v_x_init = document.getElementById("textv").value;
    	document.getElementById("demo3").innerHTML = "Velocity = " + v_x_init;

		playBool = false;
		$("#play-button span").get(0).className = "glyphicon glyphicon-play";
		traceContext.clearRect(-canvas.width, -canvas.height, canvas.width*2, canvas.height*2);
		x = x_init,
		y = y_init,
		v_x = (v_x_init - ((0.5 * delta_t * g * x) / ((x * x + y * y) ** n))),
		v_y = (v_y_init - ((0.5 * delta_t * g * y) / (((x * x) + (y * y)) ** n))),
		a_x = (-g) * x / (((x * x) + (y * y)) **(0.5*(1-n))),
		a_y = (-g) * y / (((x * x) + (y * y)) **(0.5*(1-n)));

		drawFrame();
	}

	function trace () {
		if (traceBool) {
			traceBool = false;
			$("#trace").get(0).innerHTML = "Show Orbits";
			traceContext.clearRect(-canvas.width, -canvas.height, canvas.width*2, canvas.height*2);
		} else {
			traceBool = true;
			$("#trace").get(0).innerHTML = "Hide Orbits";
		}
	}
	// Animate!
	function drawFrame () {
		timer = timer + 1;
		if (playBool) {
			window.requestAnimationFrame(drawFrame, canvas);
		}
		context.clearRect(-canvas.width, -canvas.height, canvas.width*2, canvas.height*2);
		x = x + (v_x * delta_t);
		y = y + (v_y * delta_t);
		a_x = -g * x / (((x * x) + (y * y)) **(0.5*(1-n)));
		a_y = -g * y / (((x * x) + (y * y)) **(0.5*(1-n)));
		v_x = v_x + (a_x * delta_t);
		v_y = v_y + (a_y * delta_t);
		theEarth.x = x*133;
		theEarth.y = y*133;	
		if (traceBool) {
			if(timer%10 == 0){
				traceContext.fillStyle = theEarth.color;
				traceContext.fillRect(theEarth.x, theEarth.y, 3, 3);
			}
		}
		//  Model - Draw planets
		theSun.draw(context);
		theEarth.draw(context);
	}
	drawFrame();


