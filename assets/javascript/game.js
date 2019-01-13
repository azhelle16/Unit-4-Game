/*
 #######################################################################
 #
 #  FUNCTION NAME : 
 #  AUTHOR        : 
 #  DATE          : 
 #  MODIFIED BY   : 
 #  REVISION DATE : 
 #  REVISION #    : 
 #  DESCRIPTION   : 
 #  PARAMETERS    : 
 #
 #######################################################################
*/

/* GLOBAL VARIABLES */
var cryst = {
	totalWins : 0,
	totalLoss : 0,
	score : 0,
	match : 0,
	blue : 0,
	red : 0,
	green : 0,
	yellow : 0,
	lastNum : 0
}

$(document).ready(function() {
 	
 	//footer
 	var currdate = new Date();
 	var year = currdate.getFullYear();
 	//var canvasTop = "450";
 	var crstr = "&copy; Copyright "+year+"<br>";
 	$('footer').empty().append(crstr);
 	generateNumberToGuess();
	generateCrystalValue();
	initializeButtonFunction();

})

/*
 #######################################################################
 #
 #  FUNCTION NAME : generateNumberToGuess
 #  AUTHOR        : Maricel Louise Sumulong
 #  DATE          : January 10, 2019 PST
 #  MODIFIED BY   : 
 #  REVISION DATE : 
 #  REVISION #    : 
 #  DESCRIPTION   : generates a random number to guess
 #  PARAMETERS    : none
 #
 #######################################################################
*/

function generateNumberToGuess() {

	cryst.match = Math.ceil(Math.random() * (120 - 19) + 19);
	$("#tg").text(cryst.match);

}

/*
 #######################################################################
 #
 #  FUNCTION NAME : generateCrystalValue
 #  AUTHOR        : Maricel Louise Sumulong
 #  DATE          : January 10, 2019 PST
 #  MODIFIED BY   : Maricel Louise Sumulong
 #  REVISION DATE : January 12, 2019 PST
 #  REVISION #    : 1
 #  DESCRIPTION   : generates a random number for the crystals
 #  PARAMETERS    : none
 #
 #######################################################################
*/

function generateCrystalValue() {

	var valArr = []
	var num = 0 // 4 random numbers should be selected

	while (num != 4) {
		var rand = Math.ceil(Math.random() * 12);
		if (!valArr.includes(rand)) {
			num++;
			valArr.push(rand)
		}
	}

	var i = 0;
	$('button').each(function() {
		if ($(this).hasClass("crys")) {
			//$(this).attr("value",valArr[i])
			switch (i) {
				case 0 : cryst.blue = valArr[i]; break;
				case 1 : cryst.red = valArr[i]; break;
				case 2 : cryst.yellow = valArr[i]; break;
				case 3 : cryst.green = valArr[i]; break;
			}
			i++;
		}
	})

}

/*
 #######################################################################
 #
 #  FUNCTION NAME : initializeButtonFunction 
 #  AUTHOR        : Maricel Louise Sumulong
 #  DATE          : January 10, 2019 PST
 #  MODIFIED BY   : Maricel Louise Sumulong
 #  REVISION DATE : January 13, 2019 PST
 #  REVISION #    : 3
 #  DESCRIPTION   : initialize the buttons functionality
 #  PARAMETERS    : none
 #
 #######################################################################
*/

function initializeButtonFunction() {

	$('button').on("click", function(){
		if ($(this).hasClass("crys")) {
			var color = $(this).attr("value");
			//cryst.score += parseInt($(this).attr("value"));
			//console.log(cryst[color])
			lastNum = cryst[color];
			cryst.score += cryst[color];
			$(".undoButton").attr("disabled",false);
			// cryst.score = cryst.match
			$("#ug").text(cryst.score)
			if (cryst.score > cryst.match) {
				cryst.totalLoss++
				$("#totalLoss").text(cryst.totalLoss)
				$("#ug").css("color","#ff3232")
				$("#wrongAudio").trigger("play");
				setTimeout(function() {
					reset("0")
				},1000);
			} else if (cryst.score == cryst.match) {
				cryst.totalWins++
				$("#totalWins").text(cryst.totalWins)
				$("#ug").css("color","#b2ffb2")
				$("#correctAudio").trigger("play");
				setTimeout(function() {
					reset("0")
				},1000);
			  }
		} else {
			if ($(this).text().toLowerCase() == "reset") {
				reset("1");
			} else if ($(this).text().toLowerCase() == "undo last move"){
				cryst.score -= lastNum;
				$("#ug").text(cryst.score);
				$(this).attr("disabled",true);
			  }
		  }
	})
	
}

/*
 #######################################################################
 #
 #  FUNCTION NAME : reset
 #  AUTHOR        : Maricel Louise Sumulong
 #  DATE          : January 11, 2019 PST
 #  MODIFIED BY   : Maricel Louise Sumulong
 #  REVISION DATE : January 12, 2019 PST
 #  REVISION #    : 1
 #  DESCRIPTION   : resets values of the game
 #  PARAMETERS    : flag
 #
 #######################################################################
*/

function reset(flag) {

	if (flag == "1") {
		cryst.totalWins = 0;
		cryst.totalLoss = 0;
		$("#totalWins").text(cryst.totalWins);
		$("#totalLoss").text(cryst.totalLoss);

	}

	cryst.score = 0;
	cryst.lastNum = 0;
	$("#ug").text(cryst.score);
	$("#ug").css("color","white")
	generateNumberToGuess();
	generateCrystalValue();
	$(".undoButton").attr("disabled",true)	
}
