const API_BASE_URL = 'https://api.openweathermap.org/';

document.getElementById('weather-submit').addEventListener('click', (event) => {
  event.preventDefault();

  document.getElementById('error-msg').innerHTML = '';
  const value = document.getElementById('weather-input').value;

  if (value === '') {
    handleError('Type a city first.');
    return;
  }

  /* Current Weather Conditions */
  const url = API_BASE_URL + 'data/2.5/weather?q=' +
    value +
    ',US&units=imperial' +
    '&APPID=' +
    window.API_KEY;
  fetch(url)
    .then((response) => response.json())
    .then((json) => {
      if (json.cod === '404') throw 'City not found.  Try again.';

      document.getElementById('city-header').innerHTML =
        'Weather in <b>' + json.name + '</b>';

      let liveResults =
        '<h3 class="text-muted pt-3">Live Weather Conditions</h3>';
      liveResults +=
        '<div class="rounded bg-light card p-4 my-4 align-items-center">';
      for (let i = 0; i < json.weather.length; i++) {
        liveResults +=
        '<img src="' + API_BASE_URL + 'img/w/' +
          json.weather[i].icon +
          '.png"/>';
      }
      liveResults += '<h2><b>' + json.main.temp + ' &deg;F</b></h2>';
      liveResults += '<div class="card yellow-card p-3 my-2">';
      liveResults += '<h4>Additional Information</h4>';
      liveResults += '<ul>';
      liveResults += '<li>Description: ';
      for (let i = 0; i < json.weather.length; i++) {
        liveResults += json.weather[i].description;
        if (i !== json.weather.length - 1) liveResults += ', ';
      }
      liveResults += '<li>Feels like: ' + json.main.feels_like + ' &deg;F</li>';
      liveResults += '<li>Humidity: ' + json.main.humidity + ' %</li>';
      liveResults += '<li>Wind speed: ' + json.wind.speed + ' mph</li>';
      liveResults += '</ul>';
      liveResults += '</div>';
      liveResults += '</div>';

      document.getElementById('live-results').innerHTML = liveResults;
    })
    .catch((errorMsg) => {
      handleError(errorMsg);
      return;
    });

  /* 5-day / 3-hour Forecast */
  const url2 = API_BASE_URL + 'data/2.5/forecast?q=' +
    value +
    ', US&units=imperial' +
    '&APPID=' +
    window.API_KEY;
  fetch(url2)
    .then((response) => response.json())
    .then((json) => {
      if (json.cod === '404') throw 'City not found.  Try again.';

      let forecastResults =
        '<h3 class="text-muted pt-5">5-Day / 3-Hour Forecast</h3>';

      for (let i = 0; i < json.list.length; i++) {
        forecastResults +=
          '<div class="card bg-light text-center align-items-center p-4 my-4">';
        forecastResults +=
          '<h4 class="my-2">' +
          moment(json.list[i].dt_txt).format('dddd, MMM D @ h a') +
          '</h4>';
        forecastResults +=
          '<img src="' + API_BASE_URL + 'img/w/' +
          json.list[i].weather[0].icon +
          '.png"/>';
        forecastResults +=
          '<h2><b>' + json.list[i].main.temp + ' &deg;F</b></h2>';
        forecastResults += '<div class="card yellow-card p-4 my-2">';
        forecastResults += '<h4>Additional Information</h4>';
        forecastResults += '<ul>';
        forecastResults +=
          '<li>Feels like: ' + json.list[i].main.feels_like + ' &deg;F</li>';
        forecastResults +=
          '<li>Humidity: ' + json.list[i].main.humidity + ' %</li>';
        forecastResults +=
          '<li>Wind speed: ' + json.list[i].wind.speed + ' mph</li>';
        forecastResults += '</ul>';
        forecastResults += '</div>';
        forecastResults += '</div>';
      }
      document.getElementById('forecast-results').innerHTML = forecastResults;
    })
    .catch((errorMsg) => {
      handleError(errorMsg);
      return;
    });
});

const handleError = (errorMsg) => {
  document.getElementById('error-msg').innerHTML = errorMsg;
  document.getElementById('city-header').innerHTML = '';
  document.getElementById('live-results').innerHTML = '';
  document.getElementById('forecast-results').innerHTML = '';
};
