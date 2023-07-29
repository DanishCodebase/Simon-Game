var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

var started = false;

var level = 0;

function nextSequence() {
    userClickedPattern.length = 0;
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("." + randomChosenColour).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    level++;
    $("h1").text("Level " + level);
    // console.log(gamePattern);
}

$(".btn").click(function () {
    var userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(level);
    // console.log(userClickedPattern);
    // alert(userChosenColour);
});

function playSound(name) {
    var audio = new Audio("./sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}

$(document).keypress(function () {
    startOver();
    if (!started) {
        nextSequence();
        started = true;
    }
});

function checkAnswer(currentLevel) {
    var i = userClickedPattern.length - 1;
    if (i < currentLevel) {
        if (gamePattern[i] === userClickedPattern[i]) {
            console.log("success");
            if (userClickedPattern.length == currentLevel) {
                setTimeout(nextSequence(), 1000);
            }
        } else {
            playSound("wrong");
            $("body").addClass("game-over");
            setTimeout(function () {
                $("body").removeClass("game-over");
            }, 200);
            $("h1").text("Game Over, Press Any Key to Restart");
        }
    }
}


function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}