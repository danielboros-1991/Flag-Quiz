// To get data from an URL the XMLHttpRequest-object is used
// Here we use it to get the data from the flags.json file 
var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function() {
  // If the data has been sent successfully the javascript code of the flags quiz is executed.
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
	
	easyModeButton.addEventListener("click", function(){
		easyModeButton.classList.add("selected");
		if(selectedMode == "medium"){
			mediumModeButton.classList.remove("selected");
		} else if(selectedMode == "hard"){
			hardModeButton.classList.remove("selected");
		}
		selectedMode = "easy";
		imagesDisplayed = 3;
		randomArray = random(imageNumber,imagesDisplayed);
		displayedFlags=[];
		for(var i = 0; i < square.length; i++){
			if(i < imagesDisplayed){
				var number = randomArray[i];
				displayedFlags.push(number);
				square[i].style.backgroundImage = "url("+ images[number] +")";
			} else{
				square[i].style.display = "none";
			}
		} 
		num = pickNumber(displayedFlags);
		countryNameDisplay.textContent = countryNames[num];
	});
	
	hardModeButton.addEventListener("click", function(){
		hardModeButton.classList.add("selected");
		if(selectedMode == "medium"){
			mediumModeButton.classList.remove("selected");
		} else if(selectedMode == "easy"){
			easyModeButton.classList.remove("selected");
		}
		selectedMode = "hard";
		if(imagesDisplayed === 6){
			mediumModeButton.classList.remove("selected");
		} else{
			easyModeButton.classList.remove("selected");
		}
		imagesDisplayed = 9;
		randomArray = random(imageNumber,imagesDisplayed);
		displayedFlags=[];
		for(var i = 0; i < square.length; i++){
			if(i < imagesDisplayed){
				var number = randomArray[i];
				displayedFlags.push(number);
				square[i].style.backgroundImage = "url("+ images[number] +")";
				square[i].style.display = "block";
			} else{
				square[i].style.display = "none";
			}
		} 
		num = pickNumber(displayedFlags);
		countryNameDisplay.textContent = countryNames[num];
	});
	
	mediumModeButton.addEventListener("click", function(){
		defaultMode()
	});
	
	// We create a set with random numbers between 0 and the length of the images array, and go through a while loop until the random set has 
	// reached the length of the images array.
	
	function defaultMode(){
		
		// Handling of the visual appearance of the difficulty buttons to show the user which mode they are playing.
		mediumModeButton.classList.add("selected");
		if(selectedMode == "hard"){
			hardModeButton.classList.remove("selected");
		} else if(selectedMode == "easy"){
			easyModeButton.classList.remove("selected");
		}
		
		// A random array is generated with 6 entries (the difficulty level being medium) by calling the random-function.
		selectedMode = "medium";
		imagesDisplayed = 6;
		randomArray = random(imageNumber,imagesDisplayed);
		displayedFlags=[];
		
		// According to the random array the images of the flags are displayed in 6 square elements randomly.
		for(var i = 0; i < square.length; i++){
			if(i < imagesDisplayed){
				var number = randomArray[i];
				displayedFlags.push(number);
				square[i].style.backgroundImage = "url("+ images[number] +")";
				square[i].style.display = "block";
			} else{
				square[i].style.display = "none";
			}
		} 
		
		// A random country from these displayed flags is chosen by calling a function and the countries name is displayed 
		// for the user as a text to know which country should be guessed.
		num = pickNumber(displayedFlags);
		countryNameDisplay.textContent = countryNames[num];
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
	
	// 
	resetButton.addEventListener("click", function(){
		randomArray = random(imageNumber,imagesDisplayed)
		displayedFlags=[];
		for(var i = 0; i < square.length; i++){		
			if(i < imagesDisplayed){
				var number = randomArray[i];
				displayedFlags.push(number);
				square[i].style.backgroundImage = "url("+ images[number] +")";
				resultDisplay.textContent = "";
			} else{
				square[i].style.display = "none";
			}					
		}
		num = pickNumber(displayedFlags);
		countryNameDisplay.textContent = countryNames[num];
	});	
	
  }
}

xmlhttp.open("GET", "flags.json", true);
xmlhttp.send();




