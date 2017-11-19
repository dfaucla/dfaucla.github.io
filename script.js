var WIDTH = window.innerWidth;
var HEIGHT = window.innerHeight;
var video = document.getElementsByClassName('landing')[0].getElementsByTagName('video')[0];
const WAIT = 750;
const WHEELAMT = 10;

function resize(){
	WIDTH = window.innerWidth;
	HEIGHT = window.innerHeight;

	if (WIDTH>HEIGHT){
		video.style.width = WIDTH + "px";
		video.style.height = "auto";
	}
	else{
		video.style.height = HEIGHT + "px";
		video.style.width = "auto";
	}
}

window.addEventListener('resize', resize);

function init(){
	if (WIDTH>HEIGHT){
		video.style.width = WIDTH + "px";
	}
	else{
		video.style.height = HEIGHT + "px";
	}
}

window.addEventListener('load', init);

function screen(index, start, end) {
	var _screen = this;
	_screen.DOM=document.getElementsByClassName('switch')[index];
	_screen.on=false;
	_screen.switchable=true;
	_screen.start = start;
	_screen.end = end;
	_screen.toggleSwitchable = function(){
		if (_screen.switchable){
			_screen.switchable = false;
			return;
		}
		_screen.switchable = true;
	}
	_screen.switchOn = function(){
			_screen.DOM.style.left = _screen.end +"%";
			_screen.on = true;
			_screen.DOM.style.opacity = 1;
	};
	_screen.switchOff = function(){
			_screen.DOM.style.left = _screen.start + "%";
			_screen.on = false;
			_screen.DOM.style.opacity = 0;
	}
}

//

var dir = new screen(0, -100, 0);
var mission = new screen(1, 100, 50);

window.addEventListener('mousewheel', function(e){
	var scrollX = e.deltaX; var scrollY = e.deltaY;
	var moveable = ((scrollX < -WHEELAMT || scrollX > WHEELAMT) || scrollY > -WHEELAMT || scrollY < WHEELAMT);
	if (!moveable || !mission.switchable || !dir.switchable) //do nothing if small movement or in switch progress
		return;
	if (scrollX < -WHEELAMT || scrollY > WHEELAMT){
		if (mission.on)
			mission.switchOff();
		else
			dir.switchOn();
	}
	else if (scrollX > WHEELAMT || scrollY < -WHEELAMT){
		if (dir.on)
			dir.switchOff();
		else
			mission.switchOn();
	}
	mission.toggleSwitchable();
	dir.toggleSwitchable();
	setTimeout(dir.toggleSwitchable, WAIT);
	setTimeout(mission.toggleSwitchable, WAIT);
});

window.addEventListener('mousewheel', removeScrollGif);

function removeScrollGif(){
	document.getElementsByClassName('scrollGif')[0].style.opacity = 0;
	window.removeEventListener('mousewheel', removeScrollGif);
};
