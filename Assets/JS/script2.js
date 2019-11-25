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

    



});