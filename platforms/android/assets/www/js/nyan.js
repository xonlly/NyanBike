// Options de placement //
var nyanWidth = window.innerWidth/1.5;

// Variables pour adaptation écran //
var widthNyan = 1920/window.innerWidth;
var heightNyan = Math.floor(168/widthNyan);
	widthNyan = Math.floor(272/widthNyan);

var widthRain = 1920/window.innerWidth;
var heightRain = Math.floor(136/widthRain);
	widthRain = Math.floor(60/widthRain);

var widthStar = 1920/window.innerWidth;
var heightStar = Math.floor(119/widthStar);
	widthStar = Math.floor(119/widthStar);
// Fin des variables d'adaptation //

var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

context.width = window.innerWidth;
context.height = window.innerHeight;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

rainbowImage = new Image();
rainbowImage.src = 'img/rainbow.png';


var options = {
	'speedMoveStars' : 50
};
var height = window.innerHeight/2;

var widthx = 0;

function rainbow(invert){
	var u = (invert == true) ? 1 : 2;
	for (var width = 0; width <= nyanWidth; width = width + widthRain) {
		//console.log(width);
		u++;
		if(u%2 == 1) {
			context.drawImage(rainbowImage, width, height-((heightRain+(heightRain/21))/2), widthRain, heightRain);
		} else {
			context.drawImage(rainbowImage, width, height-(heightRain/2), widthRain, heightRain);
		}
		widthx = width;
	};
}

var listImages = {};
for (var i = 0; i <= 5; i++) {
	listImages[i] = new Image();
	listImages[i].src = 'img/nyan/frame' + i + '.png';
};

var starsImages = {};
for (var i = 0; i <= 5; i++) {
	starsImages[i] = new Image();
	starsImages[i].src = 'img/stars/dot' + i + '.png';
};

var starsSpawn = [];

function spawnStar(width, height) {
	starsSpawn.push({
		"x" : width,
		"y" : height,
		"frame": 1,
		"order": true,
		"speed": Math.floor((Math.random() * 40) + 10)
	});
}

function updateStarsSpawn() {
	for (key in starsSpawn) {
		starsSpawn[key].x -= starsSpawn[key].speed;
		if (starsSpawn[key].frame > 4 || starsSpawn[key].frame <= 0) {
			starsSpawn[key].order = !starsSpawn[key].order;
		}

		starsSpawn[key].frame = (starsSpawn[key].order ? starsSpawn[key].frame + 1 : starsSpawn[key].frame - 1);
		if (starsSpawn[key].x < 0) {
			delete starsSpawn[key];
			continue;
		}
		context.drawImage(starsImages[starsSpawn[key].frame], starsSpawn[key].x, starsSpawn[key].y, widthStar, heightStar);

	};
}

setTimeout(function() {
	var x = 0,
		r = 0;

	setInterval(function(){
		context.clearRect(0, 0, canvas.width, canvas.height);

		x++;
		r++;
		(r > 3) ? r = 0 : "";
		(x > 5) ? x = 0 : "";

		if (Math.floor((Math.random() * 5) + 1) == 1) {
			spawnStar(Math.floor((Math.random() * 400) + window.innerWidth), Math.floor((Math.random() * window.innerHeight) + 0))
		}
		if(r >= 2){

			rainbow(true);
		} else {
			rainbow(false);
		}

		updateStarsSpawn();
		context.drawImage(listImages[x], widthx, height-(heightNyan/2), widthNyan, heightNyan);
	}, 75);
}, 1000);
