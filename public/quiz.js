var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    var x = JSON.parse(this.responseText);
    var images = []
    var lyrics = []
    for (var key in x) {
        if (x.hasOwnProperty(key)) {
            images.push(x[key])
            lyrics.push(key)
            
            // console.log(key + " -> " + list[key]);
            
        }
    }
    
    console.log(images)
    
    
	 //var lyrics = ["Andorra",
	 //"United Arab Emirates",
	 //"Afghanistan",
	 //"Antigua and Barbuda", 
	 //"Albania",
	 //"Hungary",
	 //"Central African Republic",
	 //"Djibouti",
	 //"Sao Tome and Principe",
	 //"Togo",
	 //"Uzbekistan",
	 //"France"];
	
	// Here all squares, which are the containers with the images in them, are selected:
	
	var square = document.querySelectorAll(".squares");
	var resetButton = document.querySelector("#reset");
	var lyricsDisplay = document.querySelector("#lyrics");
	var resultDisplay = document.querySelector("#result");
	var hardModeButton = document.querySelector("#hard");
	var mediumModeButton = document.querySelector("#medium");
	var easyModeButton = document.querySelector("#easy");
	
	var imageNumber = images.length;
	
	var select = "medium"
	
	defaultMode()
	
	easyModeButton.addEventListener("click", function(){
		easyModeButton.classList.add("selected");
		
		if(select == "medium"){
			mediumModeButton.classList.remove("selected");
		} else if(select == "hard"){
			hardModeButton.classList.remove("selected");
		}
	
		select = "easy"
		
		
		imagesDisplayed = 3;
		randomArray = random(imageNumber,imagesDisplayed);
		displayedFlags=[]
		for(var i = 0; i < square.length; i++){
			if(i < imagesDisplayed){
				var number = randomArray[i]
				displayedFlags.push(number)
				var a = "url("+ images[number] +")"
				square[i].style.backgroundImage = a;
			} else{
				square[i].style.display = "none";
			}
		} 
		num = pickNumber(displayedFlags);
		lyricsDisplay.textContent = lyrics[num];
	});
	
	hardModeButton.addEventListener("click", function(){
		hardModeButton.classList.add("selected");
		if(select == "medium"){
			mediumModeButton.classList.remove("selected");
		} else if(select == "easy"){
			easyModeButton.classList.remove("selected");
		}
	
		select = "hard"
		if(imagesDisplayed === 6){
			mediumModeButton.classList.remove("selected");
		} else{
			easyModeButton.classList.remove("selected");
		}
		
		imagesDisplayed = 9;
		randomArray = random(imageNumber,imagesDisplayed);
		displayedFlags=[]
		for(var i = 0; i < square.length; i++){
			if(i < imagesDisplayed){
				var number = randomArray[i]
				displayedFlags.push(number)
				var a = "url("+ images[number] +")"
				square[i].style.backgroundImage = a;
				square[i].style.display = "block";
			} else{
				square[i].style.display = "none";
			}
		} 
		num = pickNumber(displayedFlags);
		lyricsDisplay.textContent = lyrics[num];
	});
	
	mediumModeButton.addEventListener("click", function(){
		defaultMode()
	});
	
	// We create a set with random numbers between 0 and the length of the images array, and go through a while loop until the random set has 
	// reached the length of the images array.
	
	function defaultMode(){
		
		
		mediumModeButton.classList.add("selected");
		if(select == "hard"){
			hardModeButton.classList.remove("selected");
		} else if(select == "easy"){
			easyModeButton.classList.remove("selected");
		}
	
		select = "medium"
		
		imagesDisplayed = 6;
		randomArray = random(imageNumber,imagesDisplayed);
		displayedFlags=[]
		for(var i = 0; i < square.length; i++){
			if(i < imagesDisplayed){
				var number = randomArray[i]
				displayedFlags.push(number)
				var a = "url("+ images[number] +")"
				square[i].style.backgroundImage = a;
				square[i].style.display = "block";
				
			} else{
				square[i].style.display = "none";
			}
		} 
		num = pickNumber(displayedFlags);
		lyricsDisplay.textContent = lyrics[num];
	}
	
	function random(imageNumber, imagesDisplayed){
		var randomSet = new Set()
		while(randomSet.size < imagesDisplayed){
			var randomNumber = Math.floor((Math.random() * imageNumber));
			randomSet.add(randomNumber)
			}
		// Then we turn the set into an array and we have an array which every time the page gets refreshed creates a new arbitrary
		// sequence of the needed numbers to assign the squares in arbitrary sequence to the images. 
		var randomArray = Array.from(randomSet)
		return randomArray;
	}
	
	
	// Also wir haben schon den Array und jetzt sollten wir eher den angezeigten aus diesem array auswählen
	
	function pickNumber(randomArray){
		var i = Math.floor((Math.random() * randomArray.length));
		var num = randomArray[i]
		return num
	}
	
	
	
	
	// Then we turn the set into an array and we have an array which every time the page gets refreshed creates a new arbitrary
	// sequence of the needed numbers to assign the squares in arbitrary sequence to the images. 
	
	
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
		console.log(imagesDisplayed)
		randomArray = random(imageNumber,imagesDisplayed)
		console.log(randomArray)
		displayedFlags=[];
		for(var i = 0; i < square.length; i++){		
			if(i < imagesDisplayed){
				var number = randomArray[i];
				displayedFlags.push(number);
				var a = "url("+ images[number] +")";
				square[i].style.backgroundImage = a;
				resultDisplay.textContent = "";
			} else{
				square[i].style.display = "none";
			}					
		}
		num = pickNumber(displayedFlags);
		lyricsDisplay.textContent = lyrics[num];
	
	});	
	  }
	};
xmlhttp.open("GET", "flags.json", true);
xmlhttp.send();



// First step is to try and get every image in the array from the folder images
// JSON File laden 
// {
//   "Andorra": "\'ad.png\'",
//   "United Arab Emirates": "\'ae.png\'",
//   "Afghanistan": "\'af.png\'",
//   ...
//   ...
//   ...
// }

// var images = ['\'ad.png\'', '\'ae.png\'', '\'af.png\'',
//  '\'ag.png\'', '\'al.png\'', '\'hu.png\'', '\'cf.png\'',
//   '\'dj.png\'', '\'st.png\'', '\'to.png\'', '\'uz.png\'',
//   '\'fr.png\''];



