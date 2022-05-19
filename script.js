//add an array/object with each city & its longitude and latitude to enter into the api for whichever city is selected

//function to get API dependent on user selection
function getApi() {
  var cityApi = 'https://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.04&units=imperial&appid=f53703d5e99cbe9749b4266f3eae5885';

  fetch(cityApi)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      console.log(data);
    });
}
getApi();
// fetchButton.addEventListener('click', getApi);