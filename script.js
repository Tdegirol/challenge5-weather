var searchBtn = document.getElementById('search-btn');
var cityTime = document.getElementById('city-name');
var currentWeather = document.getElementById('current-weather');
var weatherDescription = document.getElementById('weather-description');
var key = 'f53703d5e99cbe9749b4266f3eae5885';
var day1 = document.getElementById('day1');
var day2 = document.getElementById('day2');
var day3 = document.getElementById('day3');
var day4 = document.getElementById('day4');
var day5 = document.getElementById('day5');
var searchHistory = document.getElementById('city-list');

//function to get API dependent on user selection
function getApi(city) {
  var city = document.getElementById('city-search').value;
  var cityApi = 'https://api.openweathermap.org/geo/1.0/direct?q=' + city + '&limit=3&appid='+key;
  fetch(cityApi)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      var cityWeather = 'https://api.openweathermap.org/data/2.5/onecall?lat='+data[0].lat+'&lon='+data[0].lon+'&units=imperial&appid='+key;
      var cityName = data[0].name;
      //acquire current date
      var today = new Date();
      var dd = String(today.getDate()).padStart(2, '0');
      var mm = String(today.getMonth() + 1).padStart(2, '0');
      var yyyy = today.getFullYear();
      var today = mm + '/' + dd + '/' + yyyy;
      cityTime.textContent=cityName +' Current Conditions '+ today;
      //end acquire current date
      //set forecast dates

      var forecastDates = [];
      for (i=1; i<6; i++){
        var dayDate = new Date();
        dayDate.setDate(dayDate.getDate()+i);
        var dd = String(dayDate.getDate()).padStart(2,'0');
        var mm = String(dayDate.getMonth()+1).padStart(2,'0');
        var yyyy = dayDate.getFullYear();
        var dayDate = mm+'/'+dd+'/'+yyyy;
        forecastDates.push(dayDate);
      }
      day1.textContent=forecastDates[0];
      day2.textContent=forecastDates[1];
      day3.textContent=forecastDates[2];
      day4.textContent=forecastDates[3];
      day5.textContent=forecastDates[4];
      // end set forecast dates

      //create new search buttons & assign localStorage
      localStorage.setItem(cityName,JSON.stringify(cityName));
      var historyBtn = document.createElement("button");
      historyBtn.style.width = '250px';
      historyBtn.style.height = '25px';
      historyBtn.style.border = 'black 2px';
      historyBtn.style.margin = '5px';
      historyBtn.style.backgroundColor = 'grey';
      searchHistory.appendChild(historyBtn);
      historyBtn.innerHTML=cityName;

      //start current conditions
      fetch(cityWeather)
      .then(function(responseWeather){
        return responseWeather.json();
      })
      .then(function(dataWeather){
        var img = new Image(50,50);
        img.src = 'https://openweathermap.org/img/wn/'+dataWeather.current.weather[0].icon+'@2x.png'
        currentWeather.appendChild(img);
        weatherDescription.textContent = dataWeather.current.weather[0].description;
      
        var currtemp = 'Temperature: ' + dataWeather.current.temp + ' deg F';
        var temp = document.createElement('li');
        temp.appendChild(document.createTextNode(currtemp));
        currentWeather.appendChild(temp);

        var currwind = 'Wind Speed: ' + dataWeather.current.wind_speed + ' MPH';
        var wind = document.createElement('li');
        wind.appendChild(document.createTextNode(currwind));
        currentWeather.appendChild(wind);

        var currhumidity = 'Humidity: ' + dataWeather.current.humidity + '%';
        var humidity = document.createElement('li');
        humidity.appendChild(document.createTextNode(currhumidity));
        currentWeather.appendChild(humidity);

        var currUV = 'UV Index: ' + dataWeather.current.uvi;
        var UV = document.createElement('li');
        UV.appendChild(document.createTextNode(currUV));
        currentWeather.appendChild(UV);
        if (dataWeather.current.uvi < 4){
          UV.style.backgroundColor = "green";
        }
        else if(dataWeather.current.uvi >= 7.5){
          UV.style.backgroundColor = 'red';
        }
        else{
          UV.style.backgroundColor = 'yellow';
        }
      });
      //end current conditions
      var forecast = 'https://api.openweathermap.org/data/2.5/forecast?lat='+data[0].lat+'&lon='+data[0].lon+'&units=imperial&appid='+key+'&cnt=5';
      fetch(forecast)
      .then(function(responseForecast){
        return responseForecast.json();
      })
      .then(function(dataForecast){
        console.log(dataForecast);
        var forecastWeather=[day1,day2,day3,day4,day5];

        for (x=0; x<5; x++){
          var img = new Image(50,50);
          img.src = 'https://openweathermap.org/img/wn/'+dataForecast.list[0].weather[0].icon+'@2x.png'
          forecastWeather[x].appendChild(img);
          var forecastDescription = dataForecast.list[x].weather[0].description;
          var description = document.createElement('li');
          description.appendChild(document.createTextNode(forecastDescription));
          forecastWeather[x].appendChild(description);

          var forecastTemp = 'Temperature: ' + dataForecast.list[x].main.temp + ' deg F';
          var temp = document.createElement('li');
          temp.appendChild(document.createTextNode(forecastTemp));
          forecastWeather[x].appendChild(temp);

          var forecastWind = 'Wind Speed: ' + dataForecast.list[x].wind.speed + ' MPH';
          var wind = document.createElement('li');
          wind.appendChild(document.createTextNode(forecastWind));
          forecastWeather[x].appendChild(wind);

          var forecastHumidity = 'Humidity: ' + dataForecast.list[x].main.humidity + '%';
          var humidity = document.createElement('li');
          humidity.appendChild(document.createTextNode(forecastHumidity));
          forecastWeather[x].appendChild(humidity);
          console.log(forecastWeather)
        }
      })
    });

}
searchBtn.addEventListener('click', getApi);

//load in existing cities searched for use again
window.onload = function(){
  cityList = JSON.parse(localStorage.getItem('cityList')); //get data from storage
  if (cityList !== null) { //if data exist
    loadHistoryButtons();
    }
   else { //if nothing exist in storage, keep todos array empty
    cityList = [];
  }
}
function loadHistoryButtons(){
  for (i=0; i<localStorage.length; i++){
    var historyBtn = document.createElement("button");
    historyBtn.style.width = '250px';
    historyBtn.style.height = '25px';
    historyBtn.style.border = 'black 2px';
    historyBtn.style.margin = '5px';
    historyBtn.style.backgroundColor = 'grey';
    searchHistory.appendChild(historyBtn);
    historyBtn.innerHTML=localStorage.key(i);
  }
}