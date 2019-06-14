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
  //adds power
  power = 7;
  stillComputing = true;
  timeCompute(userInput, 0);
}

function timeCompute(input, i){
  setTimeout(function(){
      $("#computerPower").text(power);
      if (containsStr("3", i)){
        $("#computerDisplay").text("I'm sorry, Dave. I'm afraid I can't do that");
        heat++;
        console.log("I'm sorry, Dave. I'm afraid I can't do that");
        $("#computerHeat").text(heat);
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
        console.log("player won!");
        timeCompute(input, i + 1); //keeps going forever, will crash users browser :)
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
  heat = 0;
  power = 0;
  $("#computerPower").text(power);
  $("#computerHeat").text(heat);
  $("#messageToUser").text("Hey, you ran me out of power! Oh well! At least I get to cool off.");
}

function inputRanOut(){
  if (heat < 20){
    heat = heat / 2.3;
  }
    $("#messageToUser").text("Those were some nice calculations. But how many times am I going to have to say it! I can't! I can't! Goodness!");
}
