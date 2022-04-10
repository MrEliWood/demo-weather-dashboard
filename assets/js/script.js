var city = $('#searchInput').val();
var searchButton = $('#searchButton');

var today = $('#today')

var day1 = $('#day1')
var day2 = $('#day2')
var day3 = $('#day3')
var day4 = $('#day4')
var day5 = $('#day5')

function getWeather() {

    if (city === "") {city = 'Bellevue'};

    var apiKey = '4cbbd8edff2f69559a34c2c07e801771';
    var queryURL = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;

    fetch(queryURL)
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        console.log(data);

        var temp = data.main.temp;
        var wind = data.wind.speed;
        var humidity = data.main.humidity;
        var uv = data.main.temp;

        today.children('#city').text(city);
        today.children('.temp').text(`Temp: ${temp}`);
        today.children('.wind').text(`Wind: ${wind} MPH`);
        today.children('.humidity').text(`Humidity: ${humidity} %`);
        today.children('.uv').text(`UV Index: ${(uv / 50).toFixed(2)}`);

    });

};

getWeather();