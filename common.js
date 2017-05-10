var WIDTH = window.innerWidth;
var HEIGHT = window.innerHeight;

const WAIT = 750;
const WHEELAMT = 5;

function resize(){
	WIDTH = window.innerWidth;
	HEIGHT = window.innerHeight;

	if (WIDTH>HEIGHT){
	}
	else{
	}
}

window.addEventListener('resize', resize);

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

var dir = new screen(0, -100, 0);

var slideContainer = document.getElementsByClassName('slideContainer')[0];
var counter = 0;
var switchable = true;
var MAX = document.getElementsByClassName('section').length;

function move(dir){
	var amt;
	if (dir == 'up'){
		if (counter == MAX)
			return;
		counter++;
		amt = counter*100;
		slideContainer.style.transform = "translateY(" + -amt + "vh)";
	}
	else{
		if (counter == 0)
			return;
		counter--;
		amt = counter*100;
		slideContainer.style.transform = "translateY(" + amt + "vh)";
	}
	switchable = false;	
}

function handleScroll(e){
	var scrollX = e.deltaX; var scrollY = e.deltaY;
	var moveable = ((scrollX < -WHEELAMT || scrollX > WHEELAMT) || scrollY > -WHEELAMT || scrollY < WHEELAMT);
	if (!moveable || !switchable || !dir.switchable) //do nothing if small movement or in switch progress
		return;
	if (scrollX < -WHEELAMT){
		dir.switchOn();
	}
	else if (scrollX > WHEELAMT){
		dir.switchOff()
	}
	else if (scrollY > WHEELAMT){ //scrollup
		move('up');
	}
	else if (scrollY < -WHEELAMT){ //scrollup
		move('down');
	}
	dir.toggleSwitchable();
	setTimeout(dir.toggleSwitchable, WAIT);
	setTimeout(function(){
		switchable = true;
	}, WAIT);
}

window.addEventListener('mousewheel', function(e){
	var scrollX = e.deltaX; var scrollY = e.deltaY;
	var moveable = ((scrollX < -WHEELAMT || scrollX > WHEELAMT) || scrollY > -WHEELAMT || scrollY < WHEELAMT);
	if (!moveable || !dir.switchable) //do nothing if small movement or in switch progress
		return;
	if (scrollX < -WHEELAMT){
		dir.switchOn();
	}
	else if (scrollX > WHEELAMT){
		dir.switchOff()
	}
	dir.toggleSwitchable();
	setTimeout(dir.toggleSwitchable, WAIT);
});