// require('dotenv').config();

// define variables
var searchButton = $('#searchButton');
var clearButton = $('#reset');

var searchDisplay = $('#searchHistory');
var searchHistory = JSON.parse(localStorage.getItem('WD Search History'));
var searchPanelStatus = JSON.parse(localStorage.getItem('WD Search Panel Status'));

var lat;
var lng;
var cityState = 'New York, NY';

var userSearch;

var googleApiKey = process.env.GOOGLE_API_KEY;
var weatherApiKey = process.env.WEATHER_API_KEY;

// remember search panel position
if (searchPanelStatus == 'hidden') {
	$('#citySelect').css('animation', 'none');
	$('#city').css('animation', 'none');
	hideSearch();
}

// add saved searches to the page
function displaySearches() {
	searchDisplay.children().remove();

	if (!searchHistory) {
		return;
	} else {
		for (let i = 0; i < searchHistory.length; i++) {
			searchDisplay.append(`<button>${searchHistory[i]}</button>`);
		}
	}
}

displaySearches();

// hide clear recent searches
if (!searchHistory) {
	clearButton.hide();
}

// save search to local storage
function saveSearch() {
	if (searchHistory && window.innerWidth > 1400) {
		searchHistory = searchHistory.filter(function (value) {
			return value !== cityState;
		});

		if (searchHistory.length == 8) {
			searchHistory.pop();
			searchHistory.unshift(cityState);
			localStorage.setItem('WD Search History', JSON.stringify(searchHistory));
			displaySearches();
			clearButton.show();
		} else {
			searchHistory.unshift(cityState);
			localStorage.setItem('WD Search History', JSON.stringify(searchHistory));
			displaySearches();
			clearButton.show();
		}
	} else if (window.innerWidth > 1400) {
		searchHistory = [cityState];
		localStorage.setItem('WD Search History', JSON.stringify([cityState]));
		displaySearches();
		clearButton.show();
	}
}

// set background images
function setBackground(section, container, description) {
	// rain
	if (description == 'light rain' || description == 'moderate rain' || description == 'heavy intensity rain' || description == 'very heavy rain' || description == 'extreme rain' || description == 'freezing rain' || description == 'light intensity shower rain' || description == 'shower rain' || description == 'heavy intensity shower rain' || description == 'ragged shower rain') {
		$(container).attr('class', `${section} rain`);
	}

	// drizzle
	else if (description == 'light intensity drizzle' || description == 'drizzle' || description == 'heavy intensity drizzle' || description == 'light intensity drizzle rain' || description == 'drizzle rain' || description == 'heavy intensity drizzle rain' || description == 'shower rain and drizzle' || description == 'heavy shower rain and drizzle' || description == 'shower drizzle') {
		$(container).attr('class', `${section} drizzle`);
	}

	// thunderstorm
	else if (description == 'thunderstorm with light rain' || description == 'thunderstorm with rain' || description == 'thunderstorm with heavy rain' || description == 'light thunderstorm' || description == 'thunderstorm' || description == 'heavy thunderstorm' || description == 'ragged thunderstorm' || description == 'thunderstorm with light drizzle' || description == 'thunderstorm with drizzle' || description == 'thunderstorm with heavy drizzle') {
		$(container).attr('class', `${section} thunderstorm`);
	}

	// snow
	else if (description == 'light snow' || description == 'snow' || description == 'Heavy snow') {
		$(container).attr('class', `${section} snow`);
	}

	// sleet
	else if (description == 'sleet' || description == 'light shower sleet' || description == 'shower sleet' || description == 'light rain and snow' || description == 'rain and snow') {
		$(container).attr('class', `${section} sleet`);
	}

	// shower snow
	else if (description == 'light shower snow' || description == 'shower snow' || description == 'heavy shower snow') {
		$(container).attr('class', `${section} showerSnow`);
	}

	// atmosphere
	else if (description == 'mist') {
		$(container).attr('class', `${section} mist`);
	} else if (description == 'smoke') {
		$(container).attr('class', `${section} smoke`);
	} else if (description == 'haze') {
		$(container).attr('class', `${section} haze`);
	} else if (description == 'sand/ dust whirls' || description == 'sand' || description == 'dust') {
		$(container).attr('class', `${section} sand`);
	} else if (description == 'fog') {
		$(container).attr('class', `${section} fog`);
	} else if (description == 'volcanic ash') {
		$(container).attr('class', `${section} ash`);
	} else if (description == 'squalls') {
		$(container).attr('class', `${section} squalls`);
	} else if (description == 'tornado') {
		$(container).attr('class', `${section} tornado`);
	}

	// clear sky
	else if (description == 'clear sky') {
		$(container).attr('class', `${section} clearSky`);
	}

	// clouds
	else if (description == 'few clouds') {
		$(container).attr('class', `${section} fewClouds`);
	} else if (description == 'scattered clouds') {
		$(container).attr('class', `${section} scatteredClouds`);
	} else if (description == 'broken clouds') {
		$(container).attr('class', `${section} brokenClouds`);
	} else if (description == 'overcast clouds') {
		$(container).attr('class', `${section} overcastClouds`);
	}
}

function getWeather() {
	var weatherQuery = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&units=imperial&appid=${weatherApiKey}`;

	fetch(weatherQuery)
		.then(function (response) {
			return response.json();
		})
		.then(function (data) {
			// current weather
			var currentTemp = Math.round(data.current.temp);
			var currentWind = Math.round(data.current.wind_speed);
			var currentHumidity = Math.round(data.current.humidity);
			var currentDescription = data.current.weather[0].description;
			var currentIconCode = data.current.weather[0].icon;
			var currentIconURL = `https://openweathermap.org/img/wn/${currentIconCode}@2x.png`;
			var uv = data.current.uvi;
			var uvStatus;

			$('#city').text(cityState);
			$('#todayHeader').children('.description').text(currentDescription);
			$('#todayHeader').children('img').attr({ src: currentIconURL, alt: currentDescription });
			$('#todayTempNum').text(`${currentTemp}°`);
			$('#todayWindNum').text(`${currentWind}`);
			$('#todayHumidityNum').text(`${currentHumidity}`);

			// current uv data
			$('#uv').text(uv);

			if (uv < 2) {
				$('#uv').addClass('uvSafe');
				uvStatus = 'Safe';
			} else if (uv < 6) {
				$('#uv').addClass('uvModerate');
				uvStatus = 'Moderate';
			} else if (uv < 8) {
				$('#uv').addClass('uvHigh');
				uvStatus = 'High';
			} else if (uv < 11) {
				$('#uv').addClass('uvVeryHigh');
				uvStatus = 'Very High';
			} else {
				$('#uv').addClass('uvExtreme');
				uvStatus = 'Extreme';
			}

			$('#uvStatus').text(uvStatus);

			// set body background
			setBackground('', 'body', currentDescription.toLowerCase());

			for (let i = 1; i < 6; i++) {
				// 5 day forecast
				var forecastTemp = Math.round(data.daily[i].temp.day);
				var forecastWind = Math.round(data.daily[i].wind_speed);
				var forecastHumidity = Math.round(data.daily[i].humidity);
				var forecastDescription = data.daily[i].weather[0].description;
				var forecastIconCode = data.daily[i].weather[0].icon;
				var forecastIconURL = `https://openweathermap.org/img/wn/${forecastIconCode}@2x.png`;

				$(`#day${i}TempNum`).text(`${forecastTemp}°`);
				$(`#day${i}WindNum`).text(`${forecastWind}`);
				$(`#day${i}HumidityNum`).text(`${forecastHumidity}`);
				$(`#day${i}Description`).text(forecastDescription);
				$(`#day${i}Icon`).attr({ src: forecastIconURL, alt: forecastDescription });

				// set forecast background
				setBackground('dayCard', `#day${i}`, forecastDescription.toLowerCase());

				// set weekday
				if (i > 1) {
					setDay = moment().add(i, 'days').format('dddd');
					$(`#day${i}Date`).text(setDay);
				}
			}
		});

	// refresh data after 15 minutes on the page
	var countDown = 900;

	minusInterval = setInterval(function () {
		countDown--;

		if (countDown === 0) {
			clearInterval(minusInterval);
			getWeather();
		}
	}, 1000);
}

// get location from user search
function searchLocation() {
	var encodedAddress = encodeURIComponent(userSearch).replace(/%20/g, '+');
	var addressQuery = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${googleApiKey}`;

	fetch(addressQuery)
		.then(function (response) {
			return response.json();
		})
		.then(function (data) {
			city = data.results[0].address_components[0].short_name;
			state = data.results[0].address_components[2].short_name;
			lat = data.results[0].geometry.location.lat;
			lng = data.results[0].geometry.location.lng;
			// cityState = `${city}, ${state}`;
			cityState = data.results[0].formatted_address.replace(', USA', '');

			getWeather();
			saveSearch();
		});
}

// Geolocation
function currentLocation() {
	function success(position) {
		lat = position.coords.latitude;
		lng = position.coords.longitude;

		// get city from lat/lng
		var coordQuery = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${googleApiKey}`;
		fetch(coordQuery)
			.then(function (response) {
				return response.json();
			})
			.then(function (data) {
				cityState = data.results[9].formatted_address.replace(', USA', '');

				saveSearch();
				getWeather();
			});
	}

	function error() {
		$('#locationPin').css('opacity', '0.5');
		$('#locationPin').css('cursor', 'default');
		$('#locationPinLabel').text('Current location unavailable');

		if (!searchHistory) {
			userSearch = 'New York';
			searchLocation();
		} else {
			userSearch = searchHistory[0];
			searchLocation();
			console.log(userSearch, searchHistory);
		}
	}

	if (!navigator.geolocation) {
		if (!searchHistory) {
			cityState = 'New York';
			searchLocation();
		} else {
			cityState = searchHistory[0];
			searchLocation();
			console.log(cityState, searchHistory);
		}
	} else {
		navigator.geolocation.getCurrentPosition(success, error);
	}
}

// listen for search button click
searchButton.click(function (event) {
	event.preventDefault();

	// generate weather report
	userSearch = $('#searchInput').val().trim();

	if (!userSearch) {
		return;
	} else {
		searchLocation();
		$('#searchInput').val('');
	}
});

// listen for enter key press for search button
$('#searchInput').on('keyup', function (event) {
	if (event.keyCode === 13) {
		event.preventDefault();
		searchButton.click();
	}
});

// listen for recent search button clicks
$('#searchHistory').click(function (event) {
	// generate weather report
	userSearch = $(event.target).text();
	searchLocation();
});

// clear recent searches button
clearButton.click(function () {
	localStorage.removeItem('WD Search History');
	searchDisplay.children().remove();
	searchHistory = [];
	clearButton.hide();
});

// hide and show the search panel
function hideSearch() {
	if (window.innerWidth < 1400) {
		$('#citySelect').css('transform', 'translateY(-100%)');
		$('#today').css('top', '15vh');
		$('#today').css('height', '65vh');
	} else {
		$('#citySelect').css('transform', 'translateX(-100%)');
		$('#today').css('left', '0%');
		$('#todayBody').css('margin-left', '60px');
		$('#today h4').css('margin-left', '60px');
	}

	$('#city').css('color', 'white');

	// hide and show button animation
	$('#showButton').css('display', 'block');
	$('#hideButton').css('display', 'none');

	// remember position
	localStorage.setItem('WD Search Panel Status', JSON.stringify('hidden'));
}

$('#hideButton').click(function (event) {
	event.preventDefault();
	$('#showButton').css('animation', 'none');
	hideSearch();
});

$('#showButton').click(function (event) {
	event.preventDefault();

	if (window.innerWidth < 1400) {
		$('#citySelect').css('transform', 'translateY(0%)');
		$('#today').css('top', '30vh');
		$('#today').css('height', '50vh');
	} else {
		$('#citySelect').css('transform', 'translateX(0%)');
		$('#today').css('left', '25%');
		$('#todayBody').css('margin-left', '0px');
		$('#today h4').css('margin-left', '0px');
	}

	$('#city').css('color', 'var(--Dark)');

	// hide and show button animation
	$('#hideButton').css('animation', 'none');
	$('#hideButton').css('display', 'block');
	$('#showButton').css('display', 'none');

	localStorage.removeItem('WD Search Panel Status');
});

// location pin clicks
$('#locationPin').click(function (event) {
	event.preventDefault();
	currentLocation();
});

// location pin hover
$('#locationPin').mouseover(function () {
	$('#locationPinLabel').css('opacity', '0.9');
});

$('#locationPin').mouseout(function () {
	$('#locationPinLabel').css('opacity', '0');
});

// fetch api keys and geolocation
// fetch('/apikeys')
// 	.then(function (response) {
// 		return response.json();
// 	})
// 	.then(function (data) {
// 		googleApiKey = data[0].googleApiKey;
// 		weatherApiKey = data[0].weatherApiKey;

// 		currentLocation();
// 	})
// 	.catch(function () {
// 		alert('Unable to load weather data.');
// 	});
