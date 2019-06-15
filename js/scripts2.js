$(function(){
      $("#beepForm").submit(function(event){
        event.preventDefault();
        var userInput = $("input#userInput").val();
        //reset user input
        // $("input#userInput").text("");
        // var output = compute(userInput);
        // $("#results").text(output);
        //$("#results").text(compute(userInput));
        computerOperate(userInput);
      });
});

function compute(userString){
  $("#computerPower").text(power);
  $("#computerHeat").text(heat);
  var input = parseInt(userString);
  var valuesStored = [];
  for (var i = 0; i < input + 1; i++){
    if (containsStr("3", i)){
      valuesStored.push("I'm sorry, Dave. I'm afraid I can't do that");
    } else if(containsStr("2", i)){
      valuesStored.push("Boop");
    } else if(containsStr("1", i)){
      valuesStored.push("Beep");
    } else {
      valuesStored.push(i);
    }
  }
  return valuesStored.join(", ");
}

function containsStr(str, num){
  var numStr = num.toString();
  for(var i = 0; i < numStr.length; i++){
    if (numStr.charAt(i) === str){
      return true;
    }
  }
  return false;
}

////////////////// game stuff

function computerOperate(userInput){
    totalTries++;
  //adds power
  if (!stillComputing){
    power = 10;
    stillComputing = true;
    timeCompute(userInput, 0);
  } else {
    $("#computerDisplay").text("Im still computing!");
  }
}

function timeCompute(input, i){
  setTimeout(function(){
      updatePower();
      if (containsStr("3", i)){
        $("#computerDisplay").text("I'm sorry, Dave. I'm afraid I can't do that");
        heat++;
        console.log("I'm sorry, Dave. I'm afraid I can't do that");
        updateHeat();
      } else if(containsStr("2", i)){
        $("#computerDisplay").text("boop");
        console.log("boop");
      } else if(containsStr("1", i)){
        $("#computerDisplay").text("beep");
        console.log("beep");
      } else {
        $("#computerDisplay").text(i);
      }
      power -= getTimeFromHeat(heat,maxHeat,i) / 1000;
      if (playerWon()){
        playerWins();
        // console.log("player won!");
        // timeCompute(input, i + 1); //keeps going forever, will crash users browser :)
        } else if (i < input){
          if (power > 0){
            timeCompute(input, i + 1);

          } else {
            //ran out of power
            debugger;
            ranOutOfPower();
          }
      } else {
        inputRanOut();
      }
  }, getTimeFromHeat(heat, maxHeat, i));
}

var power = 0;
var heat = 0;
var sMult;
var maxHeat = 100;
var startingPower;
var stillComputing = false;
var totalTries = 0;

function getTimeFromHeat(inHeat, inMaxHeat, counter){
  if (counter < 2){
    return 800;
  }
  if (heat === 0){
    return 500;
  }
  if (heat === 1){
    return 300;
  }
  if (heat === 2){
    return 150;
  }
  if (heat === 3){
    return 120;
  }
  if (heat === 4){
    return 95;
  }
  if (heat < 12){
    return 80;
  }
  var time = Math.pow(0.008212 * inHeat, 2) - (1.235 * inHeat) + 89.67;
  return time;
}

function playerWon(){
  // console.log (heat + " is heat, and max: " + maxHeat);
  return heat > maxHeat;
}

function ranOutOfPower(){
  stillComputing = false;
  heat = 0;
  power = 0;
  updatePower();
  updateHeat();
  $("#computerDisplay").text("Hey, you ran me out of power! Oh well! At least I get to cool off.");
}

function inputRanOut(){
  stillComputing = false;
    heat = heat / 1.5;
    $("#computerDisplay").text("Try all you want, I'm not going to say it, Dave!");
}

function updateHeat(){
  $("#computerHeat").text("Internal temperature:    " + Math.ceil(heat));
}

function updatePower(){
  $("#computerPower").text("Power left:    " + Math.ceil(power));
}

function playerWins(){
  power = 0;
  heat = 0;
  var threes = "";
  for (var i = 0; i < 100; i++){
    threes += "3";
  }
  $("#computerDisplay").text(threes);
  setTimeout(function(){
    $("#computerDisplay").text("Well Done! It took you " + totalTries + " tries!");
    totalTries = 0;
  }, 4000);
}
