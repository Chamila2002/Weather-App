const apiKey = "65d0a017350d528055e57ea7edde218f";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?&appid=&units=metric&q=bangalore";

async function checkWeather(){
  const response = await fetch(apiUrl + `&appid=${apiKey}`);
  var data = await response.json();

  console.log(data);
}
checkWeather();


 