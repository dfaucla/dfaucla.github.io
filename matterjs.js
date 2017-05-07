Matter.use(
  'matter-attractors' // PLUGIN_NAME
);

var Engine = Matter.Engine,
	Events = Matter.Events,
	Render = Matter.Render,
	Runner = Matter.Runner,
	World = Matter.World,
	Bodies = Matter.Bodies;
	Body = Matter.Body,
	Mouse = Matter.Mouse,
	Common = Matter.Common

var engine = Engine.create();
var render = Render.create({
	element: document.getElementsByClassName('canvasContainer')[0],
	engine: engine,
	background: '#ff0000',
	width: window.innerWidth,
	height: window.innerHeight,
	wireframeBackground: 'transparent'
});

render.options.width = render.canvas.width = window.innerWidth;
render.options.height = render.canvas.height = window.innerHeight;

var world = engine.world;
world.gravity.scale = 0;

  // create 3 body with attractors
	var attractiveBody = Bodies.circle(
	    render.options.width/2,
	    render.options.height/2,
	  75, 
	    {
	    isStatic: true,
	    isPermeable: true,
	    plugin: {
	      attractors: [
	        function(bodyA, bodyB) {
	          return {
	            x: (bodyA.position.x - bodyB.position.x) * 5e-6,
	            y: (bodyA.position.y - bodyB.position.y) * 5e-6
	          };
	        }
	      ]
	    }
	  });
	  World.add(world, attractiveBody);


  // add some bodies that to be attracted
  for (var i = 0; i < 100; i += 1) {
  	var body;
	    body = Bodies.polygon(
	    Common.random(0, render.options.width), 
	    Common.random(0, render.options.height),
	    Common.random(3, 15),
	    Common.random() > 0.9 ? Common.random(30, 40) : Common.random(10, 20)
	  	);

    World.add(world, body);
  }

//mouse functionality

var mouse = Mouse.create(render.canvas);

  Events.on(engine, 'afterUpdate', function() {
      if (!mouse.position.x) {
        return;
      }

	      Body.translate(attractiveBody, {
	          x: (mouse.position.x - attractiveBody.position.x) * 0.25 ,
	          y: (mouse.position.y - attractiveBody.position.y) * 0.25 
	      });
});

function clip(imagePath){ //only need image path, there should only be one render per world 
	var img = document.createElement('img');
	img.src = imagePath;
	var ctx = render.canvas.getContext('2d');
	ctx.save();

	img.addEventListener('load', function(){
		var imgwidth = parseInt(img.width);
		var factor = HEIGHT/img.height;
		imgwidth = imgwidth*factor;
		Render.world(render);
		ctx.clip();
		ctx.drawImage(img, 0, 0, imgwidth, HEIGHT);
		ctx.restore();
	});
}

function expandCircle(object, endRadius, duration){
	var factor = endRadius/object.circleRadius; 
	factor = 1+factor/duration; //divide it so it scales one tick

	Matter.Body.scale(object, factor, factor);

	if (object.circleRadius >= endRadius){
		Engine.off(engine, 'afterUpdate');
		return;
	}

	window.requestAnimationFrame(function(){
		expandCircle(object, endRadius, duration);
	});
}

function showImage(){
	var radius = Math.max(window.innerHeight, window.innerWidth);
	var landingImage = document.getElementsByClassName('landingImage')[0];
	expandCircle(attractiveBody, radius, 15);
	setTimeout(function(){
		var canvas = document.getElementsByClassName('canvasContainer')[0];
		canvas.style.display = "none";
		landingImage.style.display = "block";
		document.getElementsByClassName('section')[0].style.display = "flex";
	}, 300);
}

window.addEventListener('click', showImage);