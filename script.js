const form = document.getElementById('locationForm');
const destinationInput = document.getElementById('destination');
const resultDiv = document.getElementById('result');
const verdictEl = document.getElementById('verdict');
const weatherDetailsEl = document.getElementById('weatherDetails');

const API_KEY = '5df6be9063f048b9c7c6533dcc46e333
'; // Replace with your actual OpenWeatherMap API key

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const location = destinationInput.value.trim();

  if (!location) return;

  try {
    verdictEl.textContent = 'Checking weather...';
    weatherDetailsEl.textContent = '';
    resultDiv.classList.remove('hidden');

    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}&units=metric`
    );

    if (!res.ok) throw new Error('Failed to fetch weather data.');

    const data = await res.json();
    const weather = data.weather[0].main;
    const temp = data.main.temp;
    const city = data.name;

    // Logic for the "should I go out?"
    let verdict;
    if (['Rain', 'Thunderstorm', 'Drizzle'].includes(weather)) {
      verdict = 'Nope. Stay in or grab an umbrella ☔';
    } else if (['Snow'].includes(weather)) {
      verdict = 'Bundle up, it’s snowy outside ❄️';
    } else if (['Clear'].includes(weather)) {
      verdict = 'Go for it! Perfect weather ☀️';
    } else if (['Clouds'].includes(weather)) {
      verdict = 'Chill weather, might be a good time to go out 🌥️';
    } else {
      verdict = 'Not sure, but maybe check outside for real? 🤷‍♀️';
    }

    verdictEl.textContent = verdict;
    weatherDetailsEl.textContent = `Current weather in ${city}: ${weather}, ${temp}°C`;
  } catch (error) {
    verdictEl.textContent = 'Could not fetch weather. Try again.';
    weatherDetailsEl.textContent = error.message;
  }
});
