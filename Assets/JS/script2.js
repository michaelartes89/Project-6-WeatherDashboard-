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

    //create variable for query URL for AJAX call, this is the one for the weather icons
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

      function callWeatherData(event) {
          event.preventDefault();
          clearDailyForecast();

          var thisButtonsCity =$(this).text();
          todaysWeather(thisButtonsCity);
      };
      
      function storeData(event) {
          event.preventDefault();
          currentCitySearch = cityUserInput.val();

          if (currentCitySearch === "") {
              alert("please put in a valid city")
              return 
          }

          previousCitySearches.push(currentCitySearch);
          
          localStorage.setItem("city", JSON.stringify(previousCitySearches))
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
    
            });

            //sets UV index for today from seperate API
            setTimeout(function (){
                var completeUviURL = uviURL + apiKey + lat + long;
                $.ajax({
                    url:completeUviURL,
                    method: "GET"
                }).then(function (response) {
                    cityTodaysUVIndex.text("UV Index: " + response.value);

                })
            },500);


            //sets the 5-day forecast data
            setTimeout(function() {
                var completeIdURL =fiveDayURL + apiKey + cityID;
                $.ajax({
                    url: completeIdURL,
                    method: "GET"
                }).then(function (response) {
                    //defining dates
                    var date1 = new Date(response.list[3].dt *1000);
                    var date2 = new Date(response.list[11].dt *1000);
                    var date3 = new Date(response.list[19].dt *1000);
                    var date4 = new Date(response.list[27].dt *1000);
                    var date5 = new Date(response.list[35].dt *1000);
                    //defining months
                    var month1 = date1.getMonth();
                    var month2 = date2.getMonth();
                    var month3 = date3.getMonth();
                    var month4 = date4.getMonth();
                    var month5 = date5.getMonth();

                    //defining all the year
                    var year = date1.getFullYear();
                    //setting date format
                    var formattedDate1 = month1 + "/" + day1 + "/" + year;
                    var formattedDate2 = month2 + "/" + day2 + "/" + year;
                    var formattedDate1 = month3 + "/" + day3 + "/" + year;
                    var formattedDate1 = month4 + "/" + day4 + "/" + year;
                    var formattedDate1 = month5 + "/" + day5 + "/" + year;

                    // get icons
                    var icon1 = response.list[3].weather[0].icon;
                    var icon2 = response.list[11].weather[0].icon;
                    var icon3 = response.list[19].weather[0].icon;
                    var icon4 = response.list[27].weather[0].icon;
                    var icon5 = response.list[35].weather[0].icon;
                    
                    //setting the URL
                    var icon1URL = IconURL + icon1 + IconURLsuffix
                    var icon2URL = IconURL + icon2 + IconURLsuffix
                    var icon3URL = IconURL + icon3 + IconURLsuffix
                    var icon4URL = IconURL + icon4 + IconURLsuffix
                    var icon5URL = IconURL + icon5 + IconURLsuffix

                    //creating img elements for icons
                    var img1Element = $("<img>").attr("src", icon1URL);
                    var img2Element = $("<img>").attr("src", icon2URL);
                    var img3Element = $("<img>").attr("src", icon3URL);
                    var img4Element = $("<img>").attr("src", icon4URL);
                    var img5Element = $("<img>").attr("src", icon5URL);

                    //get temp and convert to fahrenheit

                    var tempF1 = math.round((response.list[3].main.temp - 273.15) * 1.80 + 32);
                    var tempF2 = math.round((response.list[11].main.temp - 273.15) * 1.80 + 32);
                    var tempF3 = math.round((response.list[19].main.temp - 273.15) * 1.80 + 32);
                    var tempF4 = math.round((response.list[27].main.temp - 273.15) * 1.80 + 32);
                    var tempF5 = math.round((response.list[35].main.temp - 273.15) * 1.80 + 32);
                    

                    //get humidity
                    var humidity1 = response.list[3].main.humidity;
                    var humidity2 = response.list[11].main.humidity;
                    var humidity3 = response.list[19].main.humidity;
                    var humidity4 = response.list[27].main.humidity;
                    var humidity5 = response.list[35].main.humidity;

                    //append the date to the cards

                    dayOneDisplayDiv.append(formattedDate1 + "<br>");
                    dayTwoisplayDiv.append(formattedDate2 + "<br>");
                    dayThreeDisplayDiv.append(formattedDate3 + "<br>");
                    dayFourDisplayDiv.append(formattedDate4 + "<br>");
                    dayFiveDisplayDiv.append(formattedDate5 + "<br>");

                    //append images to the cards

                    dayOneDisplayDiv.append(img1Element);
                    dayTWoDisplayDiv.append(img2Element);
                    dayThreeDisplayDiv.append(img3Element);
                    dayFourDisplayDiv.append(img4Element);
                    dayFiveDisplayDiv.append(img5Element);

                    //append teperatures to the cards 

                    dayOneDisplayDiv.append("<br>" + "Temperature: " + tempF1 + "<br>");
                    dayTwoDisplayDiv.append("<br>" + "Temperature: " + tempF2 + "<br>");
                    dayThreeDisplayDiv.append("<br>" + "Temperature: " + tempF3 + "<br>");
                    dayFourDisplayDiv.append("<br>" + "Temperature: " + tempF4 + "<br>");
                    dayFiveDisplayDiv.append("<br>" + "Temperature: " + tempF5 + "<br>");

                    //append humiditty to the cards
                    
                    dayOneDisplayDiv.append("Humidity: " + humidity1 + "%");
                    dayTWoDisplayDiv.append("Humidity: " + humidity2 + "%");
                    dayThreeDisplayDiv.append("Humidity: " + humidity3 + "%");
                    dayFourDisplayDiv.append("Humidity: " + humidity4 + "%");
                    dayFiveDisplayDiv.append("Humidity: " + humidity5 + "%");



                    

                })

            },500);
                
            
        };







});