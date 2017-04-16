function checkNavBar(){
	var scrollTop = Number(document.body.scrollTop);
	var main2 = document.getElementById('main2');
	var main = document.getElementById('main');
	var boxes = main.getElementsByTagName('div');
	let options = document.getElementsByClassName('options')[0].getElementsByTagName('a');

	if((scrollTop) < 75){
		for (var i=0; i<boxes.length; i++){
			if (i!=1){
			boxes[i].style.top = 40 + "%";
			boxes[i].style.color = "white";
			}
		}
		boxes[1].style.top = 30 + "%";
		for (var k=0; k<options.length; k++)
			options[k].style.color = "white";
		main2.style.backgroundColor = "transparent";
		main2.style.height = 35 + "px";
	}
	else{
		for (var i=0; i<boxes.length; i++){
			if (i!=1){
			boxes[i].style.top = 50 + "%";
			boxes[i].style.color = "black";
		}
		}

		boxes[1].style.top = 37 + "%";
		for (var k=0; k<options.length; k++)
			options[k].style.color = "black";
		main2.style.backgroundColor = "white";
		main2.style.height = 70 + "px";
	}
}

window.addEventListener('scroll', checkNavBar);