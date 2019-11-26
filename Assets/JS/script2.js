
$(document).ready(function () {
    // =========================GLOBAL VARIBLES===========================
    var APIkey = "1fb03cd6dac17b324934023f63ff9654";
    var cities = [];
    var curretResultsDiv = $("#current-weather-div");
    var fiveDayDiv = $("#fiveday-results-container");


    // ============================================================
    // =========================FUNCTIONS===========================
    // ============================================================

    function displayCurrentWeather() {
        //======Varibles======
        var cityNameDiv = $("<h3>");
        var iconImg = $("<img>")
        var tempDiv = $("<div>");
        var humidityDiv = $("<div>");
        var windSpeedDiv = $("<div>");

        var cityCurrent = $(this).attr("data-city");
        console.log("this was city's weather was requested: " + cityCurrent);

        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityCurrent + "&units=imperial&appid=" + APIkey;

        // Clear currentResultsDiv
        curretResultsDiv.empty();

        // Ajax call
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (a) { 
            console.log(a); //console response from ajax

            // Store city name 
            var cityName = a.name;
            cityNameDiv.text(cityName + " (" + moment().format('l') + ")");
            curretResultsDiv.append(cityNameDiv);

            // Display Icon
            var iconPull = a.weather[0].icon;
            console.log(iconPull);
            iconImg.attr("src", "http://openweathermap.org/img/w/" + iconPull + ".png");
            cityNameDiv.append(iconImg);

            // Store temperature
            var temp = a.main.temp;
            var tempRounded = temp.toFixed(1);
            tempDiv.text("Temperature: " + tempRounded + " °F");
            curretResultsDiv.append(tempDiv);

            // Store humidity
            var humidity = a.main.humidity;
            humidityDiv.text("Humidity: " + humidity + "%");
            curretResultsDiv.append(humidityDiv);

            //  Store wind speed
            var windSpeed = a.wind.speed;
            var windRounded = windSpeed.toFixed(1);
            windSpeedDiv.text("Wind Speed: " + windRounded + " MPH");
            curretResultsDiv.append(windSpeedDiv);

            // function to make ajax call for UVindex
            function UVIndexFunc() {
                // store lattitude from previous ajax call
                var lat = a.coord.lat;
                console.log("This is the latitiude: " + lat);

                // store lattitude from previous ajax call
                var long = a.coord.lon;
                console.log("This is the longitiude: " + long);

                // =======Varibles=======
                var uvIndexDiv = $("<div>");
                var badgeSpan = $("<span>");
                badgeSpan.addClass("badge badge-danger");
                // badgeSpan.parent().attr("id", "bagdeParent");
                // badgeSpan.parent().css("display", "inline-block")

                var queryURLUV = "https://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + long + "&appid=" + APIkey;

                // Ajax call
                $.ajax({
                    url: queryURLUV,
                    method: "GET"
                }).then(function (uvResponse) {
                    console.log(uvResponse);

                    // Display UV information
                    var uvResult = uvResponse.value;
                    badgeSpan.text(uvResult);
                    uvIndexDiv.append(badgeSpan);
                    curretResultsDiv.append("UV Index: ", uvIndexDiv);
                    // curretResultsDiv.append(uvIndexDiv);
                })

            }
            UVIndexFunc();
        })
    }



    function displayFiveDay() {
        // Clear fiveDayDiv
        fiveDayDiv.empty();

        // =======Varibles=======
        var cityFive = $(this).attr("data-city");
        console.log("this was city's weather was requested: " + cityFive);
        var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityFive + "&units=imperial&appid=" + APIkey;
        var m = 0;
        var n = 0;
        var o = 4;
        var p = 0;

        // Ajax call
        $.ajax({
            url: queryURL,
            method: "GET",
        }).then(function (a) {
            console.log(a);

            // loop through each day
            for (var i = 0; i < 40; i += 8) {
                console.log("i = " + i);
                n += 8;
                console.log("n = " + n);
                p++;
                console.log("p = " + p);


                // =======Varibles=======
                var dateH5 = $("<h5>");
                var iconImg = $("<img>");
                var b = a.list[o];

                var miniWeatherDiv = $("<div>");
                miniWeatherDiv.addClass("card");

                var miniWeatherBody = $("<div>");
                miniWeatherBody.addClass("card-body");

                // Display date
                var date = moment().add(p, 'days').calendar('L');
                console.log("Five day forcast date is: " + date);
                dateH5.text(date);
                miniWeatherBody.append(dateH5);


                // Display icon
                var iconPull = b.weather[0].icon;
                console.log("o = " + o);
                console.log(iconPull);
                iconImg.attr("src", "http://openweathermap.org/img/w/" + iconPull + ".png");
                miniWeatherBody.append(iconImg);

                o += 8;
                console.log("o = " + o);

                // Store temperature and humidity for every 3 hours in day
                var tempArray = [];
                var humArray = [];

                // variables to store totals
                var sumTemp = 0;
                var sumHum = 0;

                // for loop to generate five day weather
                for (m; m < n; m++) {

                    // Hold 3 hour temperature information in array
                    var thisTemp = a.list[m].main.temp;
                    tempArray.push(thisTemp);
                    console.log("Here is the tempArray: " + tempArray);

                    // Hold 3 hour humidity information in array
                    var thisHum = a.list[m].main.humidity;
                    humArray.push(thisHum);
                    console.log("Here is the humArray: " + humArray);

                    console.log("This is maybe m: " + m);
                    // if statement to collect information for every day inorder to get average
                    if (m === 7 || m === 15 || m === 23 || m === 31 || m === 39) {
                        // empty div
                        miniWeatherDiv.empty();
                        var tempFiveDiv = $("<div>");
                        var humidityFiveDiv = $("<div>");

                        console.log("I'm in the if statement!!!");
                        // get total of humidity and temperature
                        for (var k = 0; k < 8; k++) {
                            sumTemp += tempArray[k];
                            console.log("SumTemp = " + sumTemp);
                            sumHum += humArray[k];
                            console.log("SumHum = " + sumHum);
                        }

                        // get and store average of temperature
                        var tempAvg = sumTemp / tempArray.length;
                        console.log("tempAvg = " + tempAvg);
                        // round to 1 decimal
                        var tempRounded = tempAvg.toFixed(1);

                        // get and store average of humdity
                        var humAvg = sumHum / humArray.length;
                        console.log("humAvg = " + humAvg);
                        // round to 1 decimal
                        var humidityRounded = humAvg.toFixed(1);

                        // append information to page
                        tempFiveDiv.text("Temperature: " + tempRounded + " °F");
                        humidityFiveDiv.text("Humidity: " + humidityRounded + "%");
                        miniWeatherBody.append(tempFiveDiv);
                        miniWeatherBody.append(humidityFiveDiv);
                        console.log("This is inside miniWeatherBody: " + JSON.stringify(miniWeatherBody));
                        miniWeatherDiv.append(miniWeatherBody);
                        console.log("This is inside miniWeatherDiv: " + JSON.stringify(miniWeatherDiv));
                        fiveDayDiv.append(miniWeatherDiv);

                        // Reset Arrays
                        tempArray = [];
                        humArray = [];
                        // reset variables for
                        sumTemp = 0;
                        sumHum = 0;

                        console.log("Leaving the IF statement");
                    }
                }
            }
        })
    }

    function startup() {
        // Array that holds strings from localStorage
        var last = JSON.parse(localStorage.getItem("City"));
        console.log("We found this array in localStorage: ", last);

        // var lastCity = last[last.length-1];
        // console.log(lastCity);

        //loop through cities array
        for (var i = 0; i < last.length; i++) {
            // varible to create button
            var resultButton = $("<button>");
            // add class and attribute
            resultButton.addClass("city-button list-group-item");
            resultButton.attr("data-city", last[i]);
            // display city name on button
            resultButton.text(last[i]);
            // put button in div to move button to next line
            var newButtonDiv = $("<div>");
            $(newButtonDiv).append(resultButton);
            $("#city-buttons-lastdiv").prepend(newButtonDiv);
        }
    }


    // Render buttons
    function renderButtons() {
        //empty cities before adding new cities
        $("#city-buttons-div").empty();

        // var cities = JSON.parse(localStorage.getItem("City"));
        // console.log("We found this array in localStorage: ", cities);

        //loop through cities array
        for (var i = 0; i < cities.length; i++) {
            // varible to create button
            var resultButton = $("<button>");
            // add class and attribute
            resultButton.addClass("city-button list-group-item");
            resultButton.attr("data-city", cities[i]);
            // display city name on button
            resultButton.text(cities[i]);
            // put button in div to move button to next line
            var newButtonDiv = $("<div>");
            $(newButtonDiv).append(resultButton);
            $("#city-buttons-div").prepend(newButtonDiv);
        }
    }

    //Function that stores userInput
    $(".add-city").on("click", function (event) {
        event.preventDefault();
        console.log("I was pressed");
        //Grab userInput
        var city = $("#userInput").val().trim();
        console.log("The user wants to know weather information for " + city + ".");
        //put city into cities array
        cities.push(city);
        console.log(cities);
        // Save button text to localStorage
        localStorage.setItem("City", JSON.stringify(cities));
        renderButtons();
        // something to reset userinput box
    });


    // Adding a click event listener to all elements with a class of "movie-btn"
    $(document).on("click", ".city-button", displayCurrentWeather);
    $(document).on("click", ".city-button", displayFiveDay);



    // display localstorage after page loads
    startup();
    // renderButtons();
});


