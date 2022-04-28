// define variables
var searchButton = $('#searchButton');
var clearButton = $('#reset');

var today = $('#today');
var headline = $('#headline');
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

            // change theme based on sunrise and sunset
            var sunrise = data.current.sunrise;
            var sunset = data.current.sunset;
            var currentTime = Date.now();

            if (currentTime < sunrise && currentTime > sunset) {
                $('body').css('background-color', 'var(--dark')
                $('#citySelect').addClass('nightMode');
                document.documentElement.style.setProperty('--overlay', 'rgba(0, 0, 0, 0.5)'); 
            };

            var uv = data.current.uvi;

            $('#uv').text(uv);

            if (uv < 2) {
                $('#uv').addClass('safe');
            } else {
                $('#uv').addClass('danger');
            };

        })

        var temp = Math.round(data.main.temp);
        var wind = Math.round(data.wind.speed);
        var humidity = Math.round(data.main.humidity);
        var iconCode = data.weather[0].icon;
        var description = data.weather[0].description;
        var iconURL = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

        $('#city').text(city);
        today.children('.description').text(description);
        today.children('img').attr({'src': iconURL, 'alt': description});
        $('#todayTempNum').text(`${temp}°`);
        $('#todayWindNum').text(`${wind}`);
        $('#todayHumidityNum').text(`${humidity}`);

        // background photos
        if (description == 'clear sky') {
            $('body').attr('class', 'clearSky')
        } else if (description == 'mist') {
            $('body').attr('class', 'mist')
        } else if (description == 'few clouds') {
            $('body').attr('class', 'fewClouds')
        } else if (description == 'scattered clouds') {
            $('body').attr('class', 'scatteredClouds')
        } else if (description == 'broken clouds') {
            $('body').attr('class', 'brokenClouds')
        } else if (description == 'overcast clouds') {
            $('body').attr('class', 'overcastClouds')
        } else if (description == 'light intensity drizzle') {
            $('body').attr('class', 'lightIntensityDrizzle')
        } else if (description == 'light rain') {
            $('body').attr('class', 'lightRain')
        } else if (description == 'moderate rain') {
            $('body').attr('class', 'moderateRain')
        }

    });

    // 5-day forecast
    var queryURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${apiKey}`;

    fetch(queryURL)
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {

        // day 1
        var temp = Math.round(data.list[0].main.temp);
        var wind = Math.round(data.list[0].wind.speed);
        var humidity = Math.round(data.list[0].main.humidity);
        var iconCode = data.list[0].weather[0].icon;
        var description = data.list[0].weather[0].description;
        var iconURL = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

        day1.children('.description').text(description);
        day1.children('img').attr({'src': iconURL, 'alt': description});
        $('#day1TempNum').text(`${temp}°`);
        $('#day1WindNum').text(`${wind}`);
        $('#day1HumidityNum').text(`${humidity}`);

        if (description == 'clear sky') {
            $('#day1').attr('class', 'dayCard clearSky')
        } else if (description == 'mist') {
            $('#day1').attr('class', 'dayCard mist')
        } else if (description == 'few clouds') {
            $('#day1').attr('class', 'dayCard fewClouds')
        } else if (description == 'scattered clouds') {
            $('#day1').attr('class', 'dayCard scatteredClouds')
        } else if (description == 'broken clouds') {
            $('#day1').attr('class', 'dayCard brokenClouds')
        } else if (description == 'overcast clouds') {
            $('#day1').attr('class', 'dayCard overcastClouds')
        } else if (description == 'light intensity drizzle') {
            $('#day1').attr('class', 'dayCard lightIntensityDrizzle')
        } else if (description == 'light rain') {
            $('#day1').attr('class', 'dayCard lightRain')
        } else if (description == 'moderate rain') {
            $('#day1').attr('class', 'dayCard moderateRain')
        }

        // day 2
        var date = moment().add(2, 'days').format('dddd');
        var temp = Math.round(data.list[1].main.temp);
        var wind = Math.round(data.list[1].wind.speed);
        var humidity = Math.round(data.list[1].main.humidity);
        var iconCode = data.list[1].weather[0].icon;
        var description = data.list[1].weather[0].description;
        var iconURL = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

        day2.children('.description').text(description);
        day2.children('img').attr({'src': iconURL, 'alt': description});
        day2.children('.date').text(date);
        $('#day2TempNum').text(`${temp}°`);
        $('#day2WindNum').text(`${wind}`);
        $('#day2HumidityNum').text(`${humidity}`);

        if (description == 'clear sky') {
            $('#day2').attr('class', 'dayCard clearSky')
        } else if (description == 'mist') {
            $('#day2').attr('class', 'dayCard mist')
        } else if (description == 'few clouds') {
            $('#day2').attr('class', 'dayCard fewClouds')
        } else if (description == 'scattered clouds') {
            $('#day2').attr('class', 'dayCard scatteredClouds')
        } else if (description == 'broken clouds') {
            $('#day2').attr('class', 'dayCard brokenClouds')
        } else if (description == 'overcast clouds') {
            $('#day2').attr('class', 'dayCard overcastClouds')
        } else if (description == 'light intensity drizzle') {
            $('#day2').attr('class', 'dayCard lightIntensityDrizzle')
        } else if (description == 'light rain') {
            $('#day2').attr('class', 'dayCard lightRain')
        } else if (description == 'moderate rain') {
            $('#day2').attr('class', 'dayCard moderateRain')
        }

        // day 3
        var date = moment().add(3, 'days').format('dddd');
        var temp = Math.round(data.list[2].main.temp);
        var wind = Math.round(data.list[2].wind.speed);
        var humidity = Math.round(data.list[2].main.humidity);
        var iconCode = data.list[2].weather[0].icon;
        var description = data.list[2].weather[0].description;
        var iconURL = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

        day3.children('.description').text(description);
        day3.children('img').attr({'src': iconURL, 'alt': description});
        day3.children('.date').text(date);
        $('#day3TempNum').text(`${temp}°`);
        $('#day3WindNum').text(`${wind}`);
        $('#day3HumidityNum').text(`${humidity}`);

        if (description == 'clear sky') {
            $('#day3').attr('class', 'dayCard clearSky')
        } else if (description == 'mist') {
            $('#day3').attr('class', 'dayCard mist')
        } else if (description == 'few clouds') {
            $('#day3').attr('class', 'dayCard fewClouds')
        } else if (description == 'scattered clouds') {
            $('#day3').attr('class', 'dayCard scatteredClouds')
        } else if (description == 'broken clouds') {
            $('#day3').attr('class', 'dayCard brokenClouds')
        } else if (description == 'overcast clouds') {
            $('#day3').attr('class', 'dayCard overcastClouds')
        } else if (description == 'light intensity drizzle') {
            $('#day3').attr('class', 'dayCard lightIntensityDrizzle')
        } else if (description == 'light rain') {
            $('#day3').attr('class', 'dayCard lightRain')
        } else if (description == 'moderate rain') {
            $('#day3').attr('class', 'dayCard moderateRain')
        }

        // day 4
        var date = moment().add(4, 'days').format('dddd');
        var temp = Math.round(data.list[3].main.temp);
        var wind = Math.round(data.list[3].wind.speed);
        var humidity = Math.round(data.list[3].main.humidity);
        var iconCode = data.list[3].weather[0].icon;
        var description = data.list[3].weather[0].description;
        var iconURL = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

        day4.children('.description').text(description);
        day4.children('img').attr({'src': iconURL, 'alt': description});
        day4.children('.date').text(date);
        $('#day4TempNum').text(`${temp}°`);
        $('#day4WindNum').text(`${wind}`);
        $('#day4HumidityNum').text(`${humidity}`);

        if (description == 'clear sky') {
            $('#day4').attr('class', 'dayCard clearSky')
        } else if (description == 'mist') {
            $('#day4').attr('class', 'dayCard mist')
        } else if (description == 'few clouds') {
            $('#day4').attr('class', 'dayCard fewClouds')
        } else if (description == 'scattered clouds') {
            $('#day4').attr('class', 'dayCard scatteredClouds')
        } else if (description == 'broken clouds') {
            $('#day4').attr('class', 'dayCard brokenClouds')
        } else if (description == 'overcast clouds') {
            $('#day4').attr('class', 'dayCard overcastClouds')
        } else if (description == 'light intensity drizzle') {
            $('#day4').attr('class', 'dayCard lightIntensityDrizzle')
        } else if (description == 'light rain') {
            $('#day4').attr('class', 'dayCard lightRain')
        } else if (description == 'moderate rain') {
            $('#day4').attr('class', 'dayCard moderateRain')
        }

        // day 5
        var date = moment().add(5, 'days').format('dddd');
        var temp = Math.round(data.list[4].main.temp);
        var wind = Math.round(data.list[4].wind.speed);
        var humidity = Math.round(data.list[4].main.humidity);
        var iconCode = data.list[4].weather[0].icon;
        var description = data.list[4].weather[0].description;
        var iconURL = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

        day5.children('.description').text(description);
        day5.children('img').attr({'src': iconURL, 'alt': description});
        day5.children('.date').text(date);
        $('#day5TempNum').text(`${temp}°`);
        $('#day5WindNum').text(`${wind}`);
        $('#day5HumidityNum').text(`${humidity}`);

        if (description == 'clear sky') {
            $('#day5').attr('class', 'dayCard clearSky')
        } else if (description == 'mist') {
            $('#day5').attr('class', 'dayCard mist')
        } else if (description == 'few clouds') {
            $('#day5').attr('class', 'dayCard fewClouds')
        } else if (description == 'scattered clouds') {
            $('#day5').attr('class', 'dayCard scatteredClouds')
        } else if (description == 'broken clouds') {
            $('#day5').attr('class', 'dayCard brokenClouds')
        } else if (description == 'overcast clouds') {
            $('#day5').attr('class', 'dayCard overcastClouds')
        } else if (description == 'light intensity drizzle') {
            $('#day5').attr('class', 'dayCard lightIntensityDrizzle')
        } else if (description == 'light rain') {
            $('#day5').attr('class', 'dayCard lightRain')
        } else if (description == 'moderate rain') {
            $('#day5').attr('class', 'dayCard moderateRain')
        }

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