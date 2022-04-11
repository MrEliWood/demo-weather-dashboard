// define variables
var searchButton = $('#searchButton');
var clearButton = $('#reset');

var today = $('#today');
var headline = $('#headline');
var mainIcon = $('#mainIcon');
var info = $('#info');
var searchDisplay = $('#searchHistory');

var day1 = $('.day1');
var day2 = $('.day2');
var day3 = $('.day3');
var day4 = $('.day4');
var day5 = $('.day5');

// set city to display before search
var city = 'New York'

// collect weather data and display on page
function getWeather() {

    var apiKey = '4cbbd8edff2f69559a34c2c07e801771';

    // today's weather
    var queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;

    fetch(queryURL)
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {

        var lat = data.coord.lat;
        var lon = data.coord.lon;

        var uvQuery = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}`;

        fetch(uvQuery)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {

            console.log(data);
            var uv = data.current.uvi;

            console.log(uv);

            $('#uv').text(uv);

            if (uv < 2) {
                $('#uv').addClass('safe');
            } else {
                $('#uv').addClass('danger');
            };

        })

        var temp = data.main.temp;
        var wind = data.wind.speed;
        var humidity = data.main.humidity;
        var iconCode = data.weather[0].icon;
        var description = data.weather[0].description;
        var iconURL = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

        headline.children('#city').text(city);
        headline.children('#currentDate').text(moment().format('dddd, MMM Do'));
        mainIcon.children('.description').text(description);
        mainIcon.children('img').attr({'src': iconURL, 'alt': description});
        info.children('.temp').text(`Temp: ${temp}`);
        info.children('.wind').text(`Wind: ${wind} MPH`);
        info.children('.humidity').text(`Humidity: ${humidity} %`);

    });

    // 5-day forecast
    var queryURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${apiKey}`;

    fetch(queryURL)
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {

        // day 1
        var temp = data.list[0].main.temp;
        var wind = data.list[0].wind.speed;
        var humidity = data.list[0].main.humidity;
        var iconCode = data.list[0].weather[0].icon;
        var description = data.list[0].weather[0].description;
        var iconURL = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

        day1.children('.description').text(description);
        day1.children('img').attr({'src': iconURL, 'alt': description});
        day1.children('.temp').text(`Temp: ${temp}`);
        day1.children('.wind').text(`Wind: ${wind} MPH`);
        day1.children('.humidity').text(`Humidity: ${humidity} %`);

        // day 2
        var date = moment().add(2, 'days').format('dddd');
        var temp = data.list[1].main.temp;
        var wind = data.list[1].wind.speed;
        var humidity = data.list[1].main.humidity;
        var iconCode = data.list[1].weather[0].icon;
        var description = data.list[1].weather[0].description;
        var iconURL = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

        day2.children('.description').text(description);
        day2.children('img').attr({'src': iconURL, 'alt': description});
        day2.children('.date').text(date);
        day2.children('.temp').text(`Temp: ${temp}`);
        day2.children('.wind').text(`Wind: ${wind} MPH`);
        day2.children('.humidity').text(`Humidity: ${humidity} %`);

        // day 3
        var date = moment().add(3, 'days').format('dddd');
        var temp = data.list[2].main.temp;
        var wind = data.list[2].wind.speed;
        var humidity = data.list[2].main.humidity;
        var iconCode = data.list[2].weather[0].icon;
        var description = data.list[2].weather[0].description;
        var iconURL = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

        day3.children('.description').text(description);
        day3.children('img').attr({'src': iconURL, 'alt': description});
        day3.children('.date').text(date);
        day3.children('.temp').text(`Temp: ${temp}`);
        day3.children('.wind').text(`Wind: ${wind} MPH`);
        day3.children('.humidity').text(`Humidity: ${humidity} %`);

        // day 4
        var date = moment().add(4, 'days').format('dddd');
        var temp = data.list[3].main.temp;
        var wind = data.list[3].wind.speed;
        var humidity = data.list[3].main.humidity;
        var iconCode = data.list[3].weather[0].icon;
        var description = data.list[3].weather[0].description;
        var iconURL = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

        day4.children('.description').text(description);
        day4.children('img').attr({'src': iconURL, 'alt': description});
        day4.children('.date').text(date);
        day4.children('.temp').text(`Temp: ${temp}`);
        day4.children('.wind').text(`Wind: ${wind} MPH`);
        day4.children('.humidity').text(`Humidity: ${humidity} %`);

        // day 5
        var date = moment().add(5, 'days').format('dddd');
        var temp = data.list[4].main.temp;
        var wind = data.list[4].wind.speed;
        var humidity = data.list[4].main.humidity;
        var iconCode = data.list[4].weather[0].icon;
        var description = data.list[4].weather[0].description;
        var iconURL = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

        day5.children('.description').text(description);
        day5.children('img').attr({'src': iconURL, 'alt': description});
        day5.children('.date').text(date);
        day5.children('.temp').text(`Temp: ${temp}`);
        day5.children('.wind').text(`Wind: ${wind} MPH`);
        day5.children('.humidity').text(`Humidity: ${humidity} %`);

    });

};

getWeather();

// display recent searches on the page
var searchHistory = localStorage.getItem('Recent Searches');
searchDisplay.append(searchHistory);

if (!searchHistory) {
    clearButton.hide();
};

// listen for enter key press for search button
$('#searchInput').on("keyup", function(event) {

    if (event.keyCode === 13) {
        
      event.preventDefault();
      searchButton.click();

    }

});

// listen for search button click
searchButton.click(function(event) {

    event.preventDefault();

    // generate weather report
    city = $('#searchInput').val().trim();

    if (!city) {
        return;
    } else {
        getWeather();
    };

    // save search to local storage
    var searchHistory = localStorage.getItem('Recent Searches');

    if (!searchHistory) {
        searchDisplay.append(`<button>${city}</button>`);
        localStorage.setItem('Recent Searches', `<button>${city}</button>`);
        clearButton.show();
    } else {
        searchDisplay.append(`<button>${city}</button>`);
        searchHistory += `<button>${city}</button>`
        localStorage.setItem('Recent Searches', searchHistory);
        clearButton.show();
    };

    $('#searchInput').val("");

});

// listen for recent search button clicks
var recentButton = $('button');

recentButton.click(function(event) {

    // generate weather report
    city = $(event.target).text()
    getWeather();

});

// clear recent searches button
clearButton.click(function() {

    localStorage.removeItem('Recent Searches');
    searchDisplay.children().remove();
    clearButton.hide();
    
});