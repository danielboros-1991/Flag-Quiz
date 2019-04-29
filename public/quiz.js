// To get data from an URL the XMLHttpRequest-object is used.
// Here we use it to get the data from the flags.json file. 
var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function() {
  // If the data has been sent successfully back from the server the javascript code of the flags quiz is executed.
  if (this.readyState == 4 && this.status == 200) {
  	// To get a Javascript-Object from the strings contained in the JSON-file the JSON-file has to be parsed.
  	// After that the keys and values of the object are pushed into seperate arrays.
    var parsedData = JSON.parse(this.responseText);
    var images = [];
    var countryNames = [];
    for (var key in parsedData) {
        if (parsedData.hasOwnProperty(key)){
            images.push(parsedData[key]);
            countryNames.push(key);
        }
    }
 
	// Required elements of the DOM are selected.
	var square = document.querySelectorAll(".squares");
	var resetButton = document.querySelector("#reset");
	var countryNameDisplay = document.querySelector("#countryName");
	var resultDisplay = document.querySelector("#result");
	var hardModeButton = document.querySelector("#hard");
	var mediumModeButton = document.querySelector("#medium");
	var easyModeButton = document.querySelector("#easy");
	var imageNumber = images.length;
	var selectedMode = "medium";
	
	defaultMode();
	
	// Defining the three different modes and setting up the quiz accordingly.
	
	easyModeButton.addEventListener("click", function(){
		// Handling of the visual appearance of the difficulty buttons to show the user which mode they are playing.
		easyModeButton.classList.add("selected");
		if(selectedMode == "medium"){
			mediumModeButton.classList.remove("selected");
		} else if(selectedMode == "hard"){
			hardModeButton.classList.remove("selected");
		}
		selectedMode = "easy";
		imagesDisplayed = 3;
		setupQuiz();
	});
	
	hardModeButton.addEventListener("click", function(){
		hardModeButton.classList.add("selected");
		if(selectedMode == "medium"){
			mediumModeButton.classList.remove("selected");
		} else if(selectedMode == "easy"){
			easyModeButton.classList.remove("selected");
		}
		selectedMode = "hard";
		imagesDisplayed = 9;
		setupQuiz();
	});
	
	mediumModeButton.addEventListener("click", function(){
		defaultMode()
	});
	
	function defaultMode(){
		mediumModeButton.classList.add("selected");
		if(selectedMode == "hard"){
			hardModeButton.classList.remove("selected");
		} else if(selectedMode == "easy"){
			easyModeButton.classList.remove("selected");
		}
		selectedMode = "medium";
		imagesDisplayed = 6;
		setupQuiz();
	}
	
	// This function generates an array with randomly chosen indices of the images array. 
	function random(imageNumber, imagesDisplayed){
		var randomSet = new Set();
		while(randomSet.size < imagesDisplayed){
			var randomNumber = Math.floor((Math.random() * imageNumber));
			randomSet.add(randomNumber);
			}
		var randomArray = Array.from(randomSet);
		return randomArray;
	}
	
	// This function returns a random entry of an array.
	function pickNumber(randomArray){
		var i = Math.floor((Math.random() * randomArray.length));
		var num = randomArray[i];
		return num;
	}

	// Handling of the clicked guess of the user and display if correct or not.
	// First the position of the sought flag in the displayed images is determined.
	for(var i = 0; i<square.length; i++){
		square[i].addEventListener("click", function(){	
			var position = 0;
			for(i=0;i<randomArray.length;i++){
				if(num === randomArray[i]){
					position = i;
				}
			}
			if((this === square[position])){
				resultDisplay.textContent = "You are correct!"
				for(var i=0; i<square.length; i++){
					square[i].style.backgroundImage = "url("+ images[num] +")"
				}
			} else{
				resultDisplay.textContent = "Try again!"
				this.style.backgroundImage = "none";
			}
		});
	}
	
	resetButton.addEventListener("click", function(){
		setupQuiz();
	});
	
	function setupQuiz(){
		randomArray = random(imageNumber,imagesDisplayed)
		displayedFlags=[];
		// According to the random array the images of the flags are displayed in n = imagesDisplayed square elements randomly.
		for(var i = 0; i < square.length; i++){		
			if(i < imagesDisplayed){
				var number = randomArray[i];
				displayedFlags.push(number);
				square[i].style.backgroundImage = "url("+ images[number] +")";
				square[i].style.display = "block";
				resultDisplay.textContent = "";
			} else{
				square[i].style.display = "none";
			}					
		}
		// A random country from these displayed flags is chosen by calling a function and the countries name is displayed 
		// for the user as a text to know which country should be guessed.
		num = pickNumber(displayedFlags);
		countryNameDisplay.textContent = countryNames[num];
	}
  }
}

// The XMLHttpRequest is initialized and the request is sent to the server.
xmlhttp.open("GET", "flags.json", true);
xmlhttp.send();




