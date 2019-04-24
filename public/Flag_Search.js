var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    var x = JSON.parse(this.responseText);
    var flag = document.querySelector("#searchedImage");
    console.log(x)
    var t = document.querySelector("#searchedImageText");
    var s = document.querySelector("#searched").innerText
    var s_adjusted = s.toLowerCase()
    var found = false;
    var results ={}
    var counter = 0;
    for (key in x){
        var key_adjusted = key.toLowerCase()
        if(key_adjusted.includes(s_adjusted)&& s_adjusted!== ""){
            console.log(x[key])
            results[key] = x[key]
            found = true;
            counter = counter + 1
            
            
        } 
    }
    console.log(results)
    console.log(counter)
    
    if(counter == 1){
        for(key in results){
            flag.style.backgroundImage = "url("+results[key]+")"
            flag.style.display = "block";
            t.innerText = key
        }
       
    }
    
    if(counter > 1){
        t.innerText = "Did you mean..."
        t.style.display = "block"
        // CREATE NEW ANCHOR TAGS FOR EVERY COUNTRY AS FOUND
        for(key in results){
            var newLink = document.createElement("a");
            var node = document.createTextNode(key);
            newLink.appendChild(node);
            newLink.setAttribute('href', "#");
            newLink.style.display = "block";
            newLink.classList.add("tryOut")
            var element = document.querySelector("#bottom");
            element.appendChild(newLink);
        }    
        // console.log(newLink.innerText)
        var select = document.getElementsByClassName("tryOut")
        console.log(select[0].innerText)
        for(i=0;i<select.length;i++){
            console.log(i)
            select[i].addEventListener("click", function(){
                console.log(select.length)
                console.log(select[1].innerText)
                // flag.style.backgroundImage = "url("+results[newLink.innerText]+")"
                // flag.style.display = "block";
            })
            
        }
        
    } 
    
    if(found == false && s_adjusted!== ""){
        t.innerText = "Country not found"
        t.style.display = "inline-block"
    }
    
    
    
  }
};
xmlhttp.open("GET", "flags.json", true);
xmlhttp.send();