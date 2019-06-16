var buttonColors  = ["red", "blue", "green", "yellow"]; // array for the color seqeunces
var gamePattern = []; // empty array to push the randomly selected pattern
var userClickedPattern = []; // empty array to push the users button choices
var level = 0;
var hasStarted = false;
function nextSequence() {

  userClickedPattern = [];

  //increases the level by one
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4); // a random number variable between 0 -3

 // this variable gets the array of the colors of the buttons
 // and then uses the random number variable to choose a random color in the array
  var randomChosenColor = buttonColors[randomNumber];

  // pushes the random choser colour into the game pattern array
  gamePattern.push(randomChosenColor);



  $("#" + randomChosenColor).fadeOut(120).fadeIn(120); // animate the chosen color
  playSound(randomChosenColor); // play the sound of the chosen color

}

function animatePress(currentColour) // this function triggers an animation when the user clicks on a button
{
   $("#" + currentColour).addClass("pressed"); // adds the pressed class to the button for 100ms
  setTimeout(function(){

           $("#" + currentColour).removeClass("pressed");

   }, 100);
}

function playSound(name) //play sound with the input of the name of a file
{
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function checkAnswer(currentLevel)
{
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

     console.log("success");


     if (userClickedPattern.length === gamePattern.length){

       setTimeout(function () {
         nextSequence();
       }, 1000);

     }

   }
   else {

     console.log("wrong");
     $("#level-title").text("Game Over Press A key to play again ");

     $("body").addClass("game-over");
     setTimeout(function () {
        $("body").removeClass("game-over");
     }, 200);

     startOver();
   }


}

function startOver()
{
  level = 0;
  gamePattern = [];
  hasStarted = false;
}


////////////////////////////////////////////
//          Event Listeners               //
///////////////////////////////////////////


$(".btn").click(function(event) {
  var userColorChosen = this.id; //grabs the id of the button
  userClickedPattern.push(userColorChosen); //pushes the user choice to the userClickedPattern array
  checkAnswer(userClickedPattern.length -1);// checks the answer of the users input
  animatePress(userColorChosen); // animates the button on click
  playSound(userColorChosen); // plays the color sound
});

$(document).keypress(function(){
  if(!hasStarted)
  {
      nextSequence();
  }


});
