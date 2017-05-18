$(document).ready(function() {

  var count = 1;
  var simonCount;
  var myInterval;
  var random;
  var moves = [];
  var input;
  var compare;
  var firstPress = 0;
  var playerTurns = 0;
  var tempArray;
  var myVar;
  var blockInput = 1;
  var strictMode = 0;

  $("#measure").on("click", function() {
    if (strictMode == 0)
      strictMode = 1;
    else
      strictMode = 0;

  });




  $(".startButton").on("click", function() {

    if (firstPress == 0) {
      firstPress = 1;
      document.getElementById("timer").innerHTML = count;
      simon();
    } else {
      $(".startButton").css("background", "#00aaff");
      firstPress = 0;
      playerTurns = 0;
      simonCount = 0;
      tempArray = [];
      count = 1;
      moves = [];
      clearTimeout(myVar);
      document.getElementById("timer").innerHTML = "start";
    }

  });

  $(document.body).on('click', '.unitSquare', function() {
    if (blockInput == 0) {
      input = $(this).attr("id");
      playerTurns++;

      compare = moves.shift();
      buttonPress(input);

      if (input !== compare) {
        setTimeout(function() {
          sound1.play();
          sound2.play();
        }, 1000);
        if (strictMode == 1) {
          playerTurns = 0;
          simonCount = 0;
          tempArray = [];
          count = 1;
          moves = [];
          clearTimeout(myVar);
          document.getElementById("timer").innerHTML = count;
          simon();
        } else {
          moves.splice(0, 0, compare);
          if (playerTurns > 1) {
            moves = tempArray.concat(moves);
          }

          document.getElementById("timer").innerHTML = "!";
          setTimeout(function() {
            document.getElementById("timer").innerHTML = count;
          }, 500);

          replay();
          playerTurns = 0;
        }
      } else if (playerTurns == count) {
        if (playerTurns == 20) {


          document.getElementById("timer").innerHTML = "You Win!";


        } else {
          moves.push(compare);
          if (playerTurns > 1) {
            moves = tempArray.concat(moves);
          }
          count++;
          simon();
          playerTurns = 0;
          tempArray = [];
          document.getElementById("timer").innerHTML = count;
        }
      } else {
        tempArray.push(compare);

      }
    }
  });


  function simon() {
    blockInput = 1;
    random = Math.floor((Math.random() * 4) + 1);
    if (random == 1)
      moves.push("tl");
    else if (random == 2)
      moves.push("tr");
    else if (random == 3)
      moves.push("bl");
    else
      moves.push("br");
    replay();
  }

  function replay() {
    blockInput = 1;
    simonCount = count;

    myInterval = setInterval(function() {

      input = moves.shift();

      buttonPlay(input);

      moves.push(input);
      simonCount--;

    }, 1000);

    blockInput = 0;
  }

  function buttonPlay(input) {
    if (input == "tl") {
      $("#" + input).css("background", "#71d184");
      sound1.play();
      document.getElementById("timer").innerHTML = "green";
    } else if (input == "tr") {
      $("#" + input).css("background", "#f8877f");
      sound2.play();
      document.getElementById("timer").innerHTML = "red";
    } else if (input == "bl") {
      $("#" + input).css("background", "#f7d456");
      sound3.play();
      document.getElementById("timer").innerHTML = "yellow";
    } else if (input == "br") {
      $("#" + input).css("background", "#4dc4ff");
      sound4.play();
      document.getElementById("timer").innerHTML = "blue";
    }

    setTimeout(function() {

      if (input == "tl")
        $("#" + input).css("background", "#3cba54");
      else if (input == "tr")
        $("#" + input).css("background", "#F44336");
      else if (input == "bl")
        $("#" + input).css("background", "#f4c20d");
      else if (input == "br")
        $("#" + input).css("background", "#00aaff");
    }, 1500);



    if (simonCount < 2) {
      clearInterval(myInterval);
      setTimeout(function() {

        document.getElementById("timer").innerHTML = count;
      }, 1500);
    }

  }

  function buttonPress(input) {
    if (input == "tl") {
      $("#" + input).css("background", "#71d184");
      sound1.play();
    } else if (input == "tr") {
      $("#" + input).css("background", "#f8877f");
      sound2.play();
    } else if (input == "bl") {
      $("#" + input).css("background", "#f7d456");
      sound3.play();
    } else if (input == "br") {
      $("#" + input).css("background", "#4dc4ff");
      sound4.play();
    }

    setTimeout(function() {

      if (input == "tl")
        $("#" + input).css("background", "#3cba54");
      else if (input == "tr")
        $("#" + input).css("background", "#F44336");
      else if (input == "bl")
        $("#" + input).css("background", "#f4c20d");
      else if (input == "br")
        $("#" + input).css("background", "#00aaff");
    }, 100);



  }
});
