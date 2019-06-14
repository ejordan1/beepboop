$(function(){
      $("#beepForm").submit(function(event){
        event.preventDefault();
        var userInput = $("input#userInput").val();
        var output = compute(userInput);
        $("#results").text(output);
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
  debugger;
  var numStr = num.toString();
  for(var i = 0; i < numStr.length; i++){
    if (numStr.charAt(i) === str){
      return true;
    }
  }
  return false;
}
