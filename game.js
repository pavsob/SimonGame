var gamePattern = [];
var userClickedPattern = [];
var gameStarted = false;
var currentLevel = 0;
var buttonColors = ["green", "red", "yellow", "blue"];

function nextSequence() {
    return Math.floor(Math.random() * 4);
}

function randomChosenColor() {
    return buttonColors[nextSequence()];
}

function playSound(soundName) {
    var buttonSound = new Audio("sounds/" + soundName + ".mp3");
    buttonSound.play();
}

function buttonFlash(buttonColor) {
    $("#" + buttonColor).fadeOut(100).fadeIn(100);
}

function buttonPressed(buttonColor) {
    $("#" + buttonColor).addClass("pressed");
    setTimeout(function(){
        $("#" + buttonColor).removeClass("pressed");
    }, 500);
}

function arraysAreEqual(arr1, arr2) {
    if (arr1.length !== arr2.length) {
      return false;
    }
    
    for (var i = 0; i < arr1.length; i++) {
      if (arr1[i] !== arr2[i]) {
        return false;
      }
    }
    
    return true;
}

function computerTurn() {
    $("h1").text("Level " + currentLevel);
    gamePattern.push(randomChosenColor());
    setTimeout(function() {
        buttonFlash(gamePattern[gamePattern.length - 1]);
        playSound(gamePattern[gamePattern.length - 1]);
        }, 1000
    );
}

function restartGame() {
    $("body").removeClass("game-over");
    $(".btn").show();
    $("h1").text("Press A Key to Start");
    gameStarted = false;
    currentLevel = 0;
    gamePattern = [];
    userClickedPattern = [];
}

$(".btn").click(function(event) {
    if (gameStarted) {
        var chosenColor = event.target.id;
        userClickedPattern.push(chosenColor);
        buttonPressed(chosenColor);
        playSound(chosenColor);
        
        if(userClickedPattern.length !== gamePattern.length) {
            return;
        }

        if ( !arraysAreEqual(userClickedPattern, gamePattern) ) {
            $("body").addClass("game-over");
            $(".btn").hide(1000);
            $("h1").text("GAME OVER!")
            setTimeout(function() {
                restartGame();
            }, 2000);
            return;
        }
        userClickedPattern = [];
        computerTurn();
        currentLevel ++;
    }
});

$("body").keydown(function(event) {
    console.log(event.key)
    if (event.key === "a" && gameStarted == false) {
        gameStarted = true;
        computerTurn();
    }
});
