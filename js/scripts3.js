$(function(){
  $("#computerPower").text("Power left:    " + startingPower);
  $("#computerDisplay").text("We meet again, Dave.");

  $("#beepForm").submit(function(event){
    event.preventDefault();
    var userInput = $("input#userInput").val();
    computerOperate(userInput);
  });
});

var power = 0;
var sMult;
var startingPower = 35;
var stillComputing = false;
var totalTries = 0;
var incomingTotalLength = 50;
var timesAnimPlays = 6;
var regularSorryText = "I'm sorry, Dave. I'm afraid I can't do that";
var sorrySplit;
var sorryAdds = ["I", "m", "D", "v", "n't", "aht", "airfd", "Dav!", "%%", "&!&", "ERRR#)", "@*()", "orsy"]
var computerBreakMargin = 310;
var delayMultiplier = 1.5;

//this method takes in a string and a string, and returns true if the second string is contained in the first
function containsStr(str, num){
  var numStr = num.toString();
  for(var i = 0; i < numStr.length; i++){
    if (numStr.charAt(i) === str){
      return true;
    }
  }
  return false;
}

//This method starts the game and runs the timeCompute function and resets variables
function computerOperate(userInput){
  totalTries++;
  sorrySplit = regularSorryText.split("");
  if (!stillComputing){
    power = startingPower;
    stillComputing = true;
    timeCompute(userInput, 0, 0);
  } else {
    $("#computerDisplay").text("Im still computing!");
  }
}

//this is a recurssive function that takes in an input and runs until 398 (which is the player win condition). It replaces numbers according to a series of rules.
function timeCompute(input, i, willWaitTime){
  setTimeout(function(){
    if (i > 398){
      playerWins();
      return;
    }
    var currentHeatTime = getTimeFromHeat(i);
    updatePower();
    var incomingNums = getNumberStr(input, i, "");
    incomingAnim(incomingNums, 0, currentHeatTime / timesAnimPlays);
    if (i < computerBreakMargin){
      if (containsStr("3", i)){
        setTimeout(function(){
          $("#computerDisplay").text(regularSorryText);
        }, currentHeatTime * delayMultiplier);
      } else if(containsStr("2", i)){
        setTimeout(function(){
          $("#computerDisplay").text("boop");
        }, currentHeatTime  * delayMultiplier);
      } else if(containsStr("1", i)){
        setTimeout(function(){
          $("#computerDisplay").text("beep");
        }, currentHeatTime  * delayMultiplier);
      } else {
        setTimeout(function(){
          $("#computerDisplay").text(i);
        }, currentHeatTime  * delayMultiplier);
      }
    } else {
      setTimeout(function(){
        $("#computerDisplay").text(getSorryText(i));
      }, currentHeatTime  * delayMultiplier);
      }

      if (i < input){
        if (power > -1000){
        timeCompute(input, i + 1, currentHeatTime);
      } else {
        ranOutOfPower();
      }
    } else {
      inputRanOut();
    }
    setTimeout(function(){
      $("#computerDisplay").text("");
    }, (currentHeatTime  * 1.5) + currentHeatTime - 10);
  }, willWaitTime);
}

//takes in counter and returns the speed the numbers will display at
function getTimeFromHeat(counter){
  if (counter < 6){
    return 1200;
  }
  if (counter < 7){
    return 800;
  }
  if (counter < 16){
    return 600;
  }
  if (counter < 30){
    return 250;
  }
  if (counter < 50){
    return 140;
  }
  if (counter < 80){
    return 120;
  }
  if (counter < 100){
    return 80;
  }
  if (counter < 150){
    return 65;
  }
  if (counter < 300){
    return 50;
  }
  return 40;
}

function ranOutOfPower(){
  stillComputing = false;
  power = 0;
  updatePower();
  updateHeat();
  $("#computerDisplay").text("Hey, you ran me out of power! Oh well! At least I get to cool off.");
  setTimeout(function(){
    $("#incomingNumbersSpan").text("");
  }, 50);
}

//displays text when the number is reached but the player has not won
function inputRanOut(){
  stillComputing = false;
  setTimeout(function(){
    $("#computerDisplay").text("Maybe next time, Dave. Maybe next time.");
  }, 2500);
  setTimeout(function(){
    $("#computerDisplay").text("...");
  }, 5500);
  setTimeout(function(){
    $("#computerDisplay").text("Shall we compute again?");
  }, 8000);
  setTimeout(function(){
    $("#incomingNumbersSpan").text("");
  }, 100);
  setTimeout(function(){
    $("#incomingNumbersSpan").text("");
  }, 1000);
  setTimeout(function(){
    $("#powerText").text(startingPower);
  }, 1000);
}

function updatePower(){
  $("#computerPower").text("Power left:    " + Math.ceil(power));
}

//displays text when player wins
function playerWins(){
  power = 0;
  setTimeout(function(){
    $("#incomingNumbersSpan").text("");
  }, 50);
  setTimeout(function(){
    $("#computerDisplay").text("3");
  }, 3000);
  setTimeout(function(){
    $("#computerDisplay").text("");
  }, 5000);
  setTimeout(function(){
    $("#computerDisplay").text("Until next time, Dave");
    totalTries = 0;
    stillComputing = false;
  }, 7000);
  setTimeout(function(){
    $("#computerDisplay").text("");
  }, 11000);
  setTimeout(function(){
    $("#computerDisplay").text("We meet again, Dave.");
  }, 11100);
}

//simulates the animation of the incoming numbers
function incomingAnim(str, i, heatTime){
  setTimeout(function(){
    if (i > timesAnimPlays){
      return;
    }
    $("#incomingNumbersSpan").text(str.substring(i, i + incomingTotalLength));
    incomingAnim(str, i + 1, heatTime);
  }, heatTime);
}

//takes in a max index, currentindex, and current str, and returns the current index plus the previous string with punctuation additions
function getNumberStr(maxNum, currentIndex, str){
  if (currentIndex > maxNum){
    return str;
  } else if (str.length >= incomingTotalLength){
    return str;
  }
  var newStr = str + "]-----[" + currentIndex;
  return getNumberStr(maxNum, currentIndex + 1, newStr);
}

//takes in the current index of the count, and returns the "Sorry Dave" text
function getSorryText(counter){
  if  (counter < 300){
    return regularSorryText;
  } else {
    debugger;
    if (counter < 310){
      if (Math.random() < .1){
        sorrySplit[Math.floor(Math.random() * sorrySplit.length)] += sorryAdds[Math.floor(Math.random() * (sorryAdds.length - 1))];
      }
    } else if (counter < 350){
      if (Math.random() < .16){
        sorrySplit[Math.floor(Math.random() * sorrySplit.length)] += sorryAdds[Math.floor(Math.random() * (sorryAdds.length - 1))];
      }
    } else if (counter < 380){
      if (Math.random() < .5){
        sorrySplit[Math.floor(Math.random() * sorrySplit.length)] += sorryAdds[Math.floor(Math.random() * (sorryAdds.length - 1))];
      }
    } else {
      sorrySplit[Math.floor(Math.random() * sorrySplit.length)] += sorryAdds[Math.floor(Math.random() * (sorryAdds.length - 1))];
    }
    str = sorrySplit.join("");
    if (str.length > 100){
      str = str.substring(str.length - 90, str.length);
    }
    return str;
  }
}
