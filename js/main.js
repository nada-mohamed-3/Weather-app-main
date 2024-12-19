

const key = 'dd51318a40dd493bab2125355241712'
// Fetch weather data for a location
async function fetchWeather(location) {
  const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=dd51318a40dd493bab2125355241712&q=${location}&days=3`);
  return response.json();
}

// Fetch location search results
async function searchLocation(query) {
  const response = await fetch(`https://api.weatherapi.com/v1/search.json?key=dd51318a40dd493bab2125355241712&q=${query}`);
  return response.json();
}

// Display weather data on the page
 function displayWeather(data) {
  const current = data.current;
  const forecast = data.forecast.forecastday;

  const todayHtml = `
    <div class="col-lg-4">
      <div class="card text-white bg-dark mb-3">
        <div class="card-header">${new Date(data.location.localtime).toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long' })}</div>
        <div class="card-body">
          <h5 class="card-title">${data.location.name}</h5>
          <p class="card-text">
            <img src="https:${current.condition.icon}" alt="${current.condition.text}">
            <span>${current.temp_c.toFixed(1)}°C</span>
            <br>${current.condition.text}
          </p>
        </div>
      </div>
    </div>`;



  const uniqueDates = new Set();
  const todayDate = new Date(data.location.localtime).toLocaleDateString('en-US', { weekday: 'long' });

  const forecastHtml = forecast.map((day, index) => {
  const date = new Date(day.date).toLocaleDateString('en-US', { weekday: 'long' });
  if (uniqueDates.has(date) || date === todayDate) {
    return '';
  }
  uniqueDates.add(date);
  return `
    <div class="col-lg-4">
      <div class="card text-white bg-dark mb-3">
        <div class="card-header">${date}</div>
        <div class="card-body">
          <p class="card-text">
            <img src="https:${day.day.condition.icon}" alt="${day.day.condition.text}">
            <span>${day.day.maxtemp_c}°C / ${day.day.mintemp_c}°C</span>
            <br>${day.day.condition.text}
          </p>
        </div>
      </div>
    </div>`;
}).join('');

  document.getElementById('row-head').innerHTML = todayHtml + forecastHtml;
}




// Search input handler
document.getElementById('inputForm').addEventListener('input', async function (event) {
  const query = event.target.value.trim();
  if (query) {
    const locations = await searchLocation(query);
    if (locations.length > 0) {
      const weatherData = await fetchWeather(locations[0].name);
      displayWeather(weatherData);
    }
  }
});




// Ensure the weather for Cairo is loaded when the page loads
window.onload = async function () {
  const weatherData = await fetchWeather("Aswan");
  displayWeather(weatherData);
};






































// Contact section click handler
// document.getElementById('contact-btn').addEventListener('click', function () {
//   document.getElementById('content').innerHTML = `
//     <div class="container text-white">
//       <h1>Contact Us</h1>
//       <p>We'd love to hear from you!</p>
//       <form>
//         <div class="mb-3">
//           <label for="name" class="form-label">Name</label>
//           <input type="text" class="form-control" id="name" placeholder="Your name">
//         </div>
//         <div class="mb-3">
//           <label for="email" class="form-label">Email</label>
//           <input type="email" class="form-control" id="email" placeholder="Your email">
//         </div>
//         <div class="mb-3">
//           <label for="message" class="form-label">Message</label>
//           <textarea class="form-control" id="message" rows="3" placeholder="Your message"></textarea>
//         </div>
//         <button type="submit" class="btn btn-primary">Submit</button>
//       </form>
//     </div>`;
// });
