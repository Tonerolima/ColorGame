var targetColor = document.querySelector("#rgb");
var messageDisplay = document.getElementById("message");
var squares = document.querySelectorAll(".square");
var header = document.getElementById("header");
var buttons = document.querySelectorAll("button");
var gameMode = document.querySelectorAll(".mode")
var reset = document.getElementById("reset");
var highScoreText = document.getElementById("highscoretext")
var attemptsText = document.getElementById("attemptstext")

var squareArrSize = 8;
var colors = populateColors(squareArrSize);
var highScore = 0;
var attempts = 0;
var gameWon = false;
var gameOver = false;
var rgbValue = pickColor();
var selected = gameMode[1];

targetColor.textContent = rgbValue;

function resetSquares(){
	header.style.backgroundColor = "rgb(0, 150, 200)";
	gameWon = false;
	messageDisplay.textContent = "";
	resetColors();
}

for (var i = 0; i < squares.length; i++) {
	squares[i].addEventListener("click", function(){
		if (!gameOver) {
			if (!gameWon) {
				attempts++
				attemptsText.textContent = attempts;
				if(this.style.backgroundColor == targetColor.textContent){
					messageDisplay.innerHTML = 'Correct! <i class="fa fa-check" aria-hidden="true"></i>';
					highScore++
					highScoreText.textContent = highScore;
					applySameColor();
				} else{
					messageDisplay.innerHTML = 'Try Again! <i class="fa fa-times" aria-hidden="true"></i>'
					this.style.backgroundColor = document.body.style.backgroundColor;
				}
				gameWon = true;
			}

			if (attempts == 10) {
				reset.textContent = "PLAY AGAIN?";
				gameOver = true;
			}
			else {
				window.setTimeout(resetSquares, 3000);
			}
		}
	})
}

function resetColors(){
	colors = populateColors(squareArrSize);
	rgbValue = pickColor();
	targetColor.textContent = rgbValue;
	for (var i = 0; i < squares.length; i++) {
		squares[i].style.backgroundColor = colors[i];
	}
}

function resetValues(){
	highScore = 0;
	attempts = 0;
	gameOver = false;
	reset.textContent = "NEW COLORS"
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
	header.style.backgroundColor = rgbValue;
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

reset.addEventListener("click", function(){
	// resetColors();
	resetSquares();
	// populateColors();

	if (gameOver === true) {
		resetValues();
	}	
})

for (var i = 0; i < gameMode.length; i++) {
	gameMode[i].addEventListener("click", function(){
		if (gameOver === false && selected != this) {
			gameMode[0].classList.remove("selected")
			gameMode[1].classList.remove("selected")
			this.classList.add("selected")
			highScore = 0;
			attempts = 0;
			if (this.textContent == "EASY") {
				squareArrSize = 4;
				toggleSquares("none")
				selected = gameMode[0]
			} else {
				squareArrSize = 8;
				toggleSquares("block")
				selected = gameMode[1]
			}
			resetSquares();
		}
	})
}



resetSquares();