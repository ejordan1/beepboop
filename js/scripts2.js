$(function(){
  $("#computerPower").text("Power left:    " + startingPower);
  $("#computerDisplay").text("We meet again, Dave.");

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
    power = startingPower;
    stillComputing = true;
    timeCompute(userInput, 0, 0);
  } else {
    $("#computerDisplay").text("Im still computing!");
  }
}

function timeCompute(input, i, willWaitTime){
  setTimeout(function(){
    var currentHeatTime = getTimeFromHeat(heat,maxHeat,i);
    updatePower();
    var incomingNums = getNumberStr(input, i, "");
    incomingAnim(incomingNums, 0, currentHeatTime / timesAnimPlays);
    if (heat < computerBreakMargin){
        if (containsStr("3", i)){
          setTimeout(function(){
            $("#computerDisplay").text(regularSorryText);
            heat++;
          }, currentHeatTime * 1.5);
          updateHeat();
        } else if(containsStr("2", i)){
          setTimeout(function(){
              $("#computerDisplay").text("boop");
          }, currentHeatTime  * 1.5);
        } else if(containsStr("1", i)){
          setTimeout(function(){
              $("#computerDisplay").text("beep");
          }, currentHeatTime  * 1.5);
        } else {
          setTimeout(function(){
            $("#computerDisplay").text(i);
          }, currentHeatTime  * 1.5);
        }
      } else {
        heat++;
        $("#computerDisplay").text(getSorryText());
      }
    power -= currentHeatTime / 1000;
    // if (playerWon()){
    //   playerWins();
    //   // console.log("player won!");
    //   // timeCompute(input, i + 1); //keeps going forever, will crash users browser :)
    // } else

    if (i < input){
      //cannot run out of power
      if (power > -1000){
        timeCompute(input, i + 1, currentHeatTime);
      } else {
        //ran out of power
        ranOutOfPower();
      }
    } else {
      inputRanOut();
    }
  }, willWaitTime);
}

var power = 0;
var heat = 0;
var sMult;
var maxHeat = 100;
var startingPower = 40;
var stillComputing = false;
var totalTries = 0;
var incomingTotalLength = 30;
var timesAnimPlays = 6;
var regularSorryText = "I'm sorry, Dave. I'm afraid I can't do that";
var sorrySplit = regularSorryText.split("");
var sorryAdds = ["I", "m", "D", "v", "n't", "aht", "airfd", "Dav!", "%%", "&!&", "ERRR#)", "@*()", "orsy"]
var computerBreakMargin = 60;

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
  if (heat < 30){
    return 80;
  }
  return 65;
  // var time = Math.pow(0.05825 * inHeat, 2) + (6.479 * inHeat) - 5;
  // return time;
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
  setTimeout(function(){
    $("#incomingNumbersSpan").text("");
  }, 50);
}

function inputRanOut(){
  stillComputing = false;
  heat = heat / 1.5;
  setTimeout(function(){
    $("#computerDisplay").text("Try all you want, Dave. I'm not gonna say it.");
  }, 2000);
  setTimeout(function(){
    $("#computerDisplay").text("Try all you want, Dave. I'm not gonna say it. Dave.");
  }, 3500);
  setTimeout(function(){
    $("#incomingNumbersSpan").text("");
  }, 500);
  setTimeout(function(){
    $("#powerText").text(startingPower);
  }, 1000);
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
  setTimeout(function(){
    $("#incomingNumbersSpan").text("");
  }, 80);
  setTimeout(function(){
    $("#computerDisplay").text(threes);
  }, 80);
  setTimeout(function(){
    $("#computerDisplay").text("Well Done! It took you " + totalTries + " tries!");
    totalTries = 0;
    stillComputing = false;
  }, 4000);
}


function incomingAnim(str, i, heatTime){
  setTimeout(function(){
    if (i > timesAnimPlays){
      return;
    }
    //sets new string to substring of i
    $("#incomingNumbersSpan").text(str.substring(i, i + incomingTotalLength));
    incomingAnim(str, i + 1, heatTime);
    //repeats at duratin of interval / times it will switch between new numbers
  }, heatTime);
}
function getNumberStr(maxNum, currentIndex, str){
  if (currentIndex > maxNum){
    return str;
  } else if (str.length >= incomingTotalLength){
    return str;
  }
  var newStr = str + "]-----[" + currentIndex;
  return getNumberStr(maxNum, currentIndex + 1, newStr);
}

function getSorryText(){
  if  (heat < computerBreakMargin){
    return regularSorryText;
  } else if (heat > 100){
    sorrySplit[Math.floor(Math.random() * sorrySplit.length)] += 3;
  } else {
      if (Math.random() > .03){
        sorrySplit[Math.floor(Math.random() * sorrySplit.length)] += sorryAdds[Math.floor(Math.random() * (sorryAdds.length - 1))];
      }
    console.log(sorrySplit.join(""));
    return sorrySplit.join("");
  }
}
