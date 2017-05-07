var scene, fieldOfView, camera, renderer,
aspectRatio, nearPlane, farPlane, HEIGHT, WIDTH;

var contentBox = document.getElementsByClassName('content')[0];
HEIGHT = window.innerHeight;
WIDTH = window.innerWidth;

function createScene(){
	scene = new THREE.Scene();

	aspectRatio = WIDTH/HEIGHT;
	nearPlane = .1;
	farPlane = 5000;
	camera = new THREE.PerspectiveCamera(fieldOfView, aspectRatio, nearPlane, farPlane);
	camera.position.x = 0;
	camera.position.y = 0;
	camera.position.z = 2000;

	renderer = new THREE.WebGLRenderer({alpha: true, antialias: true});
	renderer.setSize(WIDTH, HEIGHT);
	renderer.shadowMapEnabled = true;
	renderer.setClearColor(0x000000, 0);

	renderer.domElement.classList.add('center');
	renderer.domElement.style.position = "absolute";
	renderer.domElement.style.zIndex = -1;
	var slide = document.getElementsByClassName('slide')[0];
	slide.appendChild(renderer.domElement);
}

var shadowLight;
var ambientLight;
function createLights(){
	shadowLight = new THREE.DirectionalLight(0x000000, .5);
	shadowLight.castShadow = true;
	shadowLight.shadowDarkness = 0.5;
	// shadowLight.shadow.camera.near = 0.5;
	// shadowLight.shadow.camera.far = 500;
	scene.add(shadowLight);
	ambientLight = new THREE.AmbientLight(0x404040);
	scene.add(ambientLight);
}

function addSprite(path, offsetX, offsetY, z, scale){ //offset = percentage of screen 0%->left, bottom
	var sprite;
	var x = (offsetX-.5) * WIDTH;
	var y = (offsetY-.5) * HEIGHT;
	var spriteMap = THREE.ImageUtils.loadTexture(path, {}, function(){
		var imageHeight = spriteMaterial.map.image.height;
		var imageWidth = spriteMaterial.map.image.width;
		sprite.scale.set(imageWidth*scale, imageHeight*scale);
		renderer.render(scene, camera);
	});
	var spriteMaterial = new THREE.SpriteMaterial({map: spriteMap});
	sprite = new THREE.Sprite(spriteMaterial);

	sprite.castShadow = true;
	sprite.position.set(x, y, z);
	sprite.rotation.y = 180;
	scene.add(sprite);
	return sprite;
}

Sprite = function(sprite){
	var _this = this;
	this.startX = sprite.position.x;
	this.startY = sprite.position.y;
	this.maxY = sprite.position.y + 30;
	this.maxX = sprite.position.x + 30;
	this.minY = sprite.position.y - 30;
	this.minX = sprite.position.x - 30;
	this.iterator = 1.5;
	this.sprite = sprite;
	this.move = function(offsetX, offsetY){
		_this.sprite.position.x += offsetX;
		_this.sprite.position.y += offsetY
	}
}

var spritesArr = [];
function createSprites(){
	var temp1 = addSprite('/assets/images/1.png', 1, -.2, 0, 1.5);
	var temp2 = addSprite('/assets/images/ocean.jpg', .6, 0, 0, .6);
	var temp3 = addSprite('/assets/images/sample.jpg', 1, .8, 0, 1);

	spritesArr.push(new Sprite(temp1));
	spritesArr.push(new Sprite(temp2));
	spritesArr.push(new Sprite(temp3));
}

function createCube(){
	var geometry = new THREE.BoxGeometry(15, 15, 15);
	var material = new THREE.MeshBasicMaterial(0xe1e1e1);
	var cube = new THREE.Mesh(geometry, material);
	cube.position.set(0,0,0);
	scene.add(cube);
}

//animation functions


function animateVector(vectorToAnimate, target, options){
    options = options || {};
    // get targets from options or set to defaults
    var to = target || THREE.Vector3(),
        easing = options.easing || TWEEN.Easing.Quadratic.In,
        duration = options.duration || 2000;
    // create the tween
    var tweenVector3 = new TWEEN.Tween(vectorToAnimate)
        .to({ x: to.x, y: to.y, z: to.z }, duration)
        .easing(easing)
        .onUpdate(function(d) {
            if(options.update){ 
                options.update(d);
            }
         })
        .onComplete(function(){
          if(options.callback) options.callback();
          renderer.render(scene, camera);
        });
    // start the tween
    tweenVector3.start(+new Date());
    // return the tween in case we want to manipulate it later on
    return tweenVector3;
}

function hoverSprites(){
	var i=2;
	var interval = setInterval(function(){ //make objects hover
			if (i==-1){
				clearInterval(interval);
				return;
			}
			if (spritesArr[i].sprite.position.y <= spritesArr[i].minY){
				spritesArr[i].iterator = 1.5;
			}
			else if (spritesArr[i].sprite.position.y >= spritesArr[i].maxY){
				spritesArr[i].iterator = -1.5;
			}

			//simulate an ease
			if (spritesArr[i].sprite.position.y >= spritesArr[i].maxY - 5 || spritesArr[i].sprite.position.y <= spritesArr[i].minY + 5){
				spritesArr[i].sprite.position.y += .2*spritesArr[i].iterator;
			}
			else if (spritesArr[i].sprite.position.y >= spritesArr[i].maxY - 10 || spritesArr[i].sprite.position.y <= spritesArr[i].minY + 10){
				spritesArr[i].sprite.position.y += .4*spritesArr[i].iterator;
			}
			else if (spritesArr[i].sprite.position.y >= spritesArr[i].maxY - 20 || spritesArr[i].sprite.position.y <= spritesArr[i].minY + 20){
				spritesArr[i].sprite.position.y += .6*spritesArr[i].iterator;
			}
			else if (spritesArr[i].sprite.position.y >= spritesArr[i].maxY - 30 || spritesArr[i].sprite.position.y <= spritesArr[i].minY + 30){
				spritesArr[i].sprite.position.y += .8*spritesArr[i].iterator;
			}
			else
				spritesArr[i].sprite.position.y += spritesArr[i].iterator;
			i--;
	}, 200);
}

//mouse handler

var mouse3D;
function getMousePosition( event ) {                
    mouse3D = new THREE.Vector3( ( event.clientX / window.innerWidth ) * 2 - 1,   //x
                                        -( event.clientY / window.innerHeight ) * 2 + 1,  //y
                                        0.5 );                                            //z  
    mouse3D.sub( camera.position );                
    mouse3D.normalize();
    console.log(mouse3D);
    return mouse3D;
}

var mouseX, mouseY;
// function handleMouseMove(event){
// 	mouseX = getMousePosition(event).x;
// 	mouseY = getMousePosition(event).y;

// 	var i=0;
// 	var interval = setInterval(function(){ //make objects hover
// 			if (i==3){
// 				clearInterval(interval);
// 				return;
// 			}
// 			spritesArr[i].sprite.position.x += 9000*mouseX;
// 			spritesArr[i].sprite.position.y += 9000*mouseY;
// 			i++;
// 	}, 200);
// }

// window.addEventListener('mousemove', handleMouseMove, false);
//render

var tween;
function loop(){
	hoverSprites();
	renderer.render(scene, camera);
	requestAnimationFrame(loop);
	tween = animateVector(spritesArr[0], {x: 0, y: 0, z: 0} );
	tween.update(+new Date());
}

createScene();
createLights();
createSprites();
loop();

renderer.render(scene, camera);