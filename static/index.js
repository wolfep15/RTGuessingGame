$(document).ready(function(){
	$("#input").hide();
    $.get("https://damp-depths-96034.herokuapp.com/getRandomMovie",function(rawData, status) {
    	data = JSON.parse(rawData);
     	$("#submitButton").show();
    	i = 0;
    	j = 0;
    	$("#submitButton").click(function(){
		if(j==12) {
       			$("input").css("width", "140px");
			$("#submitButton").hide();
			$("#movieScore").hide();
			$("#movieName").hide(); 
    			$("#guessedScore").hide();
    			$("#poster").hide();
    			$("#input").show();
    			var totalPoints = parseInt($("#points").text());
    			resultString = "You scored " + $("#points").text() + " points";
    			$("#pointsText").text(resultString);
    			$("#finishButton").show();
    			$("#input").val("");
    			$("#input").attr("placeholder", "Enter your name here");
    			$("#finishButton").click(function(){
				$("#finishButton").hide();
    				urlencoded = 'https://damp-depths-96034.herokuapp.com/sendScore'
    				data = {"name": $("#input").val(), "score": totalPoints}
    				$.post(urlencoded, data, function(){
    					$("#gotoLeaderboard").show();
					$("#submitButton").show();
    					$("#submitButton").text("Play again!");
    				});
    			});
		}
		else if (j == 13) {
			window.location.reload(); 
		}
		else if(j%2==0) {
			$("#poster").show();
			$("#explanation").text("Enter a guess within the range 0-100")
    			$("#input").show();
    			$("#input").val(""); 
    			$("#poster").attr("src", data[i].poster);
    			$("#movieName").text(data[i].name);
    			$("#submitButton").text("Guess");
    			$("#movieScore").hide();
    			$("#guessedScore").hide();
			}
		else {
			var guess = $("#input").val();
			var intGuess = parseInt(guess);
			if(guess == "" || guess > 100 || guess < 0 || isNaN(parseInt(guess))) {
				alert("Invalid guess");
				j--;
			}
			else {
				var intScore = parseInt(data[i].score);
				var points = 100 - Math.trunc(Math.abs(intScore - intGuess)); 
				if (i == 0) {
					$("#points").text(points);
				}
				else {
					var currPoints = parseInt($("#points").text());
					currPoints += points;
					$("#points").text(currPoints);
				}
				$("#guessedScore").text("Your guess: " + guess);
				$("#movieScore").text("Metacritic Score: " + data[i].score);
				i++;
				$("#pointsText").text("Current points: " + $("#points").text());
				$("#submitButton").text("Next");
	    			$("#movieScore").show();
	    			$("#guessedScore").show();
	    			$("#pointsText").show();
	    			$("#input").hide();
    			}
		}
		j++;
    	});
    });
});
