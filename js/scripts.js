$(function(){
  $("#beepForm").submit(function(event){
    event.preventDefault();
    var userInput = $("input#userInput").val();
    $("#resultsList").text(userInput);
  });
});

function compute(userString){
  var input = parseInt(userString);
  for (var i = 0; i < input + 1; i++)
}
