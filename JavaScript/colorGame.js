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
	if (gameOver === true) {
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
					correctSquare.classList.add("correct");
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
			window.setTimeout(resetSquares, 2000);
		}
	})
}

function resetColors(){
	colors = populateColors(squareArrSize);
	rgbValue = pickColor();
	targetColor.textContent = rgbValue;
	for (var i = 0; i < squares.length; i++) {
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
	resetSquares();
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
				squareArrSize = 6;
				toggleSquares("block")
				selected = gameMode[1]
			}
			resetSquares();
		}
	})
}

resetSquares();
