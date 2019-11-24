$(document).ready(function(){  
            
            
    $("#searchBtn").click(function(){
        event.preventDefault();
        //here the value of the input element is stored as a variable
        var userLocation = $("input:text").val().trim();
        
        
        
        var APIKey = "166a433c57516f51dfab1f7edaed8413";
        
        // Here we are building the URL we need to query the database
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?" +
        "q=" + userLocation +"&units=imperial&appid=" + APIKey;
        
        // Here we run our AJAX call to the OpenWeatherMap API
        $.ajax({
            url: queryURL,
            method: "GET"
        })
        // We store all of the retrieved data inside of an object called "response"
        .then(function(response) {
            
            // Log the queryURL
            console.log(queryURL);
            
            // Log the resulting object
            console.log(response); 
            //log the current temp
            console.log(response.main.temp)
            //log lay
            console.log(response.weather[0].icon); 
            console.log(userLocation)
            
            
        });
    });
});