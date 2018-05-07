var targetColor = document.querySelector("#rgb");
var messageDisplay = document.getElementById("message");
var squares = document.querySelectorAll(".square");
var header = document.querySelector("h1");
var buttons = document.querySelectorAll("button");
var gameMode = document.querySelectorAll(".mode")
var reset = document.getElementById("reset");
var highScoreText = document.getElementById("highscoretext");
var attemptsText = document.getElementById("attemptstext");
var alertDiv = document.getElementById("alert");
var resultDiv = document.getElementById("header3");
var container = document.getElementById('container')


var squareArrSize = 6;
var colors = populateColors(squareArrSize);
var highScore = 0;
var attempts = 0;
var gameWon = false;
var gameOver = false;
var clicked = false;
var rgbValue = pickColor();
var selected = gameMode[1];
var correctSquare = "";

targetColor.textContent = rgbValue;

function resetSquares(){
	gameWon = false;
	clicked = false;
	alertDiv.hidden = true;
	alertDiv.innerHTML = '';
	if (gameOver) {
		if (window.confirm("Your score is: "+highScore+"\nWould you like to play again?")) { 
  			gameOver = false;
  			resetValues();
  			resetSquares();
		}
		else{
			alert("Thanks for playing!");
			window.close();
		}
	}	
	resetColors();
}

for (var i = 0; i < squares.length; i++) {
	squares[i].addEventListener("click", function(){
		if (!gameOver && !clicked) {
			if (!gameWon) {
				alertDiv.hidden = false;
				if(this.style.backgroundColor == targetColor.textContent){
					highScore++
					highScoreText.textContent = highScore;
					alertDiv.innerHTML = '<span>Correct!</span> <i class="fa fa-check fa-lg"></i>';
					alertDiv.style.color = "green";
					applySameColor();
				} else{
					this.style.backgroundColor = document.body.style.backgroundColor;
					// correctSquare.classList.add("correct");
					correctSquare.style.border= "12px solid white";
					alertDiv.innerHTML = '<span>Wrong!</span> <i class="fa fa-ban fa-lg"></i>';
					alertDiv.style.color = "red";
				}
				attempts++
				attemptsText.textContent = attempts;
				gameWon = true;
				clicked = true;
			}

			if (attempts == 10) {
				gameOver = true;
			}
			window.setTimeout(resetSquares, 2500);
		}
	})
}

function resetColors(){
	colors = populateColors(squareArrSize);
	rgbValue = pickColor();
	targetColor.textContent = rgbValue;
	for (var i = 0; i < squares.length; i++) {
		squares[i].style.border = "5px solid #232323";
		squares[i].style.backgroundColor = colors[i];
		squares[i].classList.remove("correct");
		if (colors[i] == rgbValue) {
			correctSquare = squares[i];
		}
	}
}

function resetValues(){
	highScore = 0;
	highScoreText.textContent = highScore;
	attempts = 0;
	attemptsText.textContent = attempts;
	gameOver = false;
}

function randomRgb(){
	var r = Math.floor(Math.random() * 256)
	var g = Math.floor(Math.random() * 256)
	var b = Math.floor(Math.random() * 256)
	var rgb = 'rgb('+r+', '+g+', '+b+')';
	return rgb;
}

function populateColors(size){
	tempList = [];
	for(var i = 0; i < size; i++){
		tempList[i] = randomRgb();
	}
	return tempList;
}

function applySameColor(){
	for (var i = 0; i < squares.length; i++) {
		squares[i].style.backgroundColor = rgbValue;
	}
}

function pickColor(){
	var random = Math.floor(Math.random() * colors.length)
	return colors[random]
}

function toggleSquares(mode){
	for (var i = 4; i < squares.length; i++) {
		squares[i].style.display = mode;
	}
}

function changeMode(a){
	gameMode[0].classList.remove("selected")
	gameMode[1].classList.remove("selected")
	a.classList.add("selected")
	if (a.textContent == "EASY") {
		squareArrSize = 4;
		toggleSquares("none");
		selected = gameMode[0];
		container.style.maxWidth = '400px';
	} else {
		squareArrSize = 6;
		toggleSquares("block");
		selected = gameMode[1];
		container.style.maxWidth = '600px';
	}
}

reset.addEventListener("click", function(){
	if (attempts != 0) {
		if (!gameOver) {
			if (window.confirm("Are you sure you want to reset this game?")) { 
	  			resetSquares();
				resetValues();
			}
		}
	} else {
		resetSquares();
	}
})

for (var i = 0; i < gameMode.length; i++) {
	gameMode[i].addEventListener("click", function(){
		if (!gameOver && selected != this) {
			if (attempts > 0) {
				if (window.confirm("This will reset the game. Do you want to continue?")) { 
		  			changeMode(this);
					resetValues();
					resetSquares();
				}
			}
			else{
				changeMode(this);
				resetSquares();
			}
		}
	})
}

resetSquares();


var red = document.getElementById('r');
var green = document.getElementById('g');
var blue = document.getElementById('b');
var labels = document.getElementsByTagName('input');
var rgbCanvas = document.getElementById('rgb-canvas');

for (var i = 0; i < labels.length; i++) {
	labels[i].addEventListener('change', function(){
		rgbCanvas.style.background = 'rgb('+red.value+', '+green.value+', '+blue.value+')'
	})
}

var slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  if (n > slides.length) {
  	slideIndex = 1
  }

  if (n < 1) {
  	slideIndex = slides.length
  }

  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none"; 
  }
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block"; 
  dots[slideIndex-1].className += " active";
}

var skip = document.getElementById('skip');
var overlay = document.getElementById('overlay');
skip.addEventListener('click', function(){
	overlay.style.display = 'none';
})

// window.setTimeout(function(){
// 	if (window.confirm("Welcome! \n \nThe goal of this game is to learn how colors are represented on screen.\n \nSelect the box that matches the color code on top of the page in RGB format. \n \nNeed help? Click 'OK' to learn about the RGB color format or 'Cancel' to close this message")){
// 		window.open("https://en.wikipedia.org/wiki/RGB_color_model#Additive_colors")
// 	}
// }, 1000)