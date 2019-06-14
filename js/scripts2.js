$(function(){
      $("#beepForm").submit(function(event){
        event.preventDefault();
        var userInput = $("input#userInput").val();
        //reset user input
        // $("input#userInput").text("");
        // var output = compute(userInput);
        // $("#results").text(output);
        timeCompute(userInput, 0);
      });
});

function compute(userString){
  if (!stillComputing){
    if (!playerWon(heat, maxHeat)){
      var input = parseInt(userString);
      var valuesStored = [];
      for (var i = 0; i < input + 1; i++){
        if (containsStr("3", i)){
          valuesStored.push("I'm sorry, Dave. I'm afraid I can't do that");
          heat++;
          $("computerTemp").text(heat);
        } else if(containsStr("2", i)){
          valuesStored.push("Boop");
        } else if(containsStr("1", i)){
          valuesStored.push("Beep");
        } else {
          valuesStored.push(i);
        }
          console.log("heat: " + heat + ", power: " + power);
      }
        return valuesStored.join(", ");
    } else {
      console.log("player won! heat: " + heat);
    }
  } else {
    console.log("Still computing!");
  }
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
  stillComputing = true;
  timeCompute(userInput, 0);
}

function timeCompute(input, i){
  setTimeout(function(){
      console.log("time: " + i);

      if (containsStr("3", i)){
        console.log("I'm sorry, Dave. I'm afraid I can't do that");
        heat++;
        $("computerTemp").text(heat);
      } else if(containsStr("2", i)){
        console.log("Boop");
      } else if(containsStr("1", i)){
        console.log("Beep");
      } else {
        console.log(i);
      }

      if (i < input){
        timeCompute(input, i + 1);
        if (playerWon()){
          console.log("player won!")
        }
      }
  }, 30);
}



var power;
var heat = 0;
var sMult;
var maxHeat = 20;
var startingPower;
var stillComputing = false;

function playerWon(){
  // console.log (heat + " is heat, and max: " + maxHeat);
  return heat > maxHeat;
}
