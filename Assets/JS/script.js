$(document).ready(function(){  
            
            
    $("#searchBtn").click(function(){
        event.preventDefault();
        //here the value of the input element is stored as a variable
        var userLocation = $("input:text").val().trim();
        
        
        
         var APIKey = "d2d1ec657659b9babb2a73150c4ac485";
        
        // Here we are building the URL we need to query the database
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?" +
        "q=" + userLocation +"&units=imperial&appid=" + APIKey;
        
        // Here we run our AJAX call to the OpenWeatherMap API for current weather
        $.ajax({
            url: queryURL,
            method: "GET"
        })
        // We store all of the retrieved data inside of an object called "response"
        .then(function(response) {
            

            
            // Log the resulting object
            console.log(response);
            //log the city name
            console.log(response.name); 
            //log the current temp
              console.log(response.main.temp);
             //log the humidity
            console.log(response.main.humidity);
            //log the wind speed
            console.log(response.wind.speed);
            
          
           
            
            
        });
        /*Ajax call for the 5 day forecast
        $.ajax({

        url: "https://api.openweathermap.org/data/2.5/forecast?q="  + userLocation +"&units=imperial&appid=" + APIKey,
        method: "GET"
        })
        .then(function(response) {
            console.log(response);
        });*/
        //Ajax call for the UV Index*/
        $.ajax({
            url:"http://api.openweathermap.org/data/2.5/uvi?&appid=" + APIKey +"&lat=39.29&lon=76.61",
            method: "GET"
        }).then(function(response) {
            console.log(response);
        });
    
        

         
    });
    });
// icon url http://openweathermap.org/img/wn/10d@2x.png