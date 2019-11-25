$(document).ready(function(){
    //create an array to hold previous city searches
    var previousCitySearches =[];
    //create a variable to hold current search input as a string
    var currentCitySearch ="";
    //create variables to target html elements
    var cityUserInput = $("#city-input");
    var cityInputButton = $("#city-input-button");
    var cityTodaysHumidity = $("#todays-humidity");
    var cityTodaysTemperature = $("#todays-temperature");
    var cityTodaysWindSpeed = $("#todays-wind-speed");
    var cityTodaysUVIndex = $("#todays-uv-index");
    var dayOneDisplayDiv = $("#day-one-display");
    var dayTWoDisplayDiv = $("#day-two-display");
    var dayThreeDisplayDiv = $("#day-three-display");
    var dayFourDisplayDiv = $("#day-four-display");
    var dayFiveDisplayDiv = $("#day-five-display");
    var mainCityInfoDiv = $("#main-city-info");
    var previousCitySearchesDiv = $("#previous-searches");

    //create variable for query URL in AJAX call, this is the one for the weather icons
    var IconURL= "https://openweathermap.org/img.wn";
    var IconURLsuffix = "@2x.png";

    //create functions for each part of the applications functionality

    //this function clears the previous seach info

    function clearDailyForecast() {
        mainCityInfoDiv.empty();
        dayOneDisplayDiv.empty();
        dayTWoDisplayDiv.empty();
        dayThreeDisplayDiv.empty();
        dayFourDisplayDiv.empty();
        dayFiveDisplayDiv.empty();
    };
    /*this function stores the content of previousCitySearches in local storage
    and loops through the array to create a new div with content set as the user's previous entry which is then appended onto the secion */
    function getPreviousCities() {
        previousCitySearches =JSON.parse(localStorage.getItem("city"))
        if (previousCitySearches === null) {
            return
        }
        previousCitySearches= previousCitySearches.reverse();

        previousCitySearchesDiv.empty();

        for (var i =0; i < previousCitySearches.length;i++) {
            
            var newPreviousCityDiv = $("<div>");
            newPreviousCityDiv = newPreviousCityDiv.attr("class","previous-searches=-button")
            newPreviousCityDiv.html(previousCitySearches[i])
            
            previousCitySearchesDiv.append(newPreviousCityDiv);
        }

    };


      function todaysWeather(cityName) {
          var weatherURL = "https://api.openweathermap.org/data/2.5/weather?q=";
          var uviURL  = "https://api.openweathermap.org/data/2.5/uvi?";
          var fiveDayURL = "https://api.openweathermap.org/data/2.5/forecast?";
          var apiKey = "appid=d2d1ec657659b9babb2a73150c4ac485";
          var queryURL = weatherURL + cityName + "&" + apiKey;
          var lat = "";
          var long = "";
          var cityID = "";
          var cityNameText = "";
          
          //AJAX call to get today's weather data
          
          $.ajax({
              url: queryURL,
              method: "GET"
              
            }).then (function (response) {
                console.log(response);
                var tempF = (response.main.temp -273.15) * 1.80 + 32;
                
                cityTodaysTemperature.text("Temperature: " + tempF.toFixed(2))

                cityTodaysWindSpeed.text("Humidity: " + response.main.humidity + "%");

                cityTodaysWindSpeed.text("Wind Speed: " + response.wind.speed);


                lat = "&lat=" + response.coords.lat;
                long = "&lon" + response.coods.lon;
                cityID = "&id=" + response.id;

                cityNameText = response.name;

                var todaysDate = new Date(response.dt *1000);
                var todaysMonth = todaysDate.getMonth();
                var todaysDay = todaysDate.getDay();
                var todaysYear = todaysDate.getFullYear();

                var formattedToday = cityNameText + " (" + todaysMonth + "/" + todaysDay + "/" + todaysYear + ")";

                var todaysIcon = response.weather[0].icon;
                var todaysIconURL = IconURL + todaysIcon + IconURLsuffix;

                var todaysIconElement = $("<img>")
                todaysIconElement.attr("src", todaysIconURL)
                todaysIconElement.attr("class", "todays-icon")

                $("main-city-info").append(formattedToday);
                $("main-city-info").append(todaysIconElement);
    


                
                
            })
            
        };







});