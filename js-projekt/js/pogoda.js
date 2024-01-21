const API_KEY = '324f21d4efc64630becabce803519e01';

async function getCities(query) {
    const apiUrl = `https://api.opencagedata.com/geocode/v1/json?q=${query}&key=${API_KEY}`;
    
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error('Błąd pobierania danych z API');
      }
  
      const data = await response.json();
      
      console.log('Sugestie z API:', data.results);
  
      const uniqueCities = Array.from(new Set(data.results
        .filter(result => result.components.city && /^[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ\s]+$/.test(result.components.city))
        .map(result => result.components.city)));
  
      return uniqueCities;
    } catch (error) {
      console.error(error);
      return [];
    }
  }
  
async function showSuggestions() {
  const input = document.getElementById('location');
  const suggestionsContainer = document.getElementById('suggestions-container');
  const userInput = input.value.toLowerCase();

  if (userInput.length < 3) {
    suggestionsContainer.style.display = 'none';
    return;
  }

  const cities = await getCities(userInput);
  const suggestionsHTML = cities.map(city => `<div class="autocomplete-suggestion" onclick="selectCity('${city}')">${city}</div>`).join('');

  suggestionsContainer.style.left = input.offsetLeft + 'px';
  suggestionsContainer.style.top = input.offsetTop + input.offsetHeight + 'px';

  suggestionsContainer.innerHTML = suggestionsHTML;
  suggestionsContainer.style.display = 'block';
}

  async function showSuggestions() {
    const input = document.getElementById('location');
    const suggestionsContainer = document.getElementById('suggestions-container');
    const userInput = input.value.toLowerCase();
  
    if (userInput.length < 3) {
      suggestionsContainer.style.display = 'none';
      return;
    }

    const cities = await getCities(userInput);
    const suggestionsHTML = cities.map(city => `<div class="autocomplete-suggestion" onclick="selectCity('${city}')">${city}</div>`).join('');
  
    suggestionsContainer.style.left = input.offsetLeft + 'px';
    suggestionsContainer.style.top = input.offsetTop + input.offsetHeight + 'px';
  
    suggestionsContainer.innerHTML = suggestionsHTML;
    suggestionsContainer.style.display = 'block';
  }

    function selectCity(city) {
        document.getElementById('location').value = city;
        document.getElementById('suggestions-container').style.display = 'none';
    }

    async function getWeatherByCity() {
        const selectedCity = document.getElementById('location').value;
        if (!selectedCity) {
            alert('Wprowadź nazwę miasta!');
            return;
        }
        getWeather(selectedCity);
    }

    async function getWeatherByLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                async position => {
                    const lat = position.coords.latitude;
                    const lon = position.coords.longitude;

                    const apiKey = 'f0f525a556d542cbbbd9b73060515256';

                    try {
                        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`);

                        if (!response.ok) {
                            throw new Error('Błąd pobierania danych pogodowych');
                        }

                        const weatherData = await response.json();
                        const cityName = weatherData.name;

                        getWeather(cityName);
                    } catch (error) {
                        alert(error.message);
                    }
                },
                error => {
                    alert(`Błąd geolokalizacji: ${error.message}`);
                }
            );
        } else {
            alert('Twoja przeglądarka nie obsługuje geolokalizacji');
        }
    }

    async function getWeather(city) {
        const apiKey = 'f0f525a556d542cbbbd9b73060515256';

        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}`);

            if (!response.ok) {
                throw new Error('Błąd pobierania danych pogodowych');
            }

            const weatherData = await response.json();

            const weatherInfoDiv = document.getElementById('weather-info');
            const planetInfoDiv = document.getElementById('planet-info');

            const temperature = weatherData.main.temp - 273.15;
            let climate, terrain, imageUrl, planetName, planetDescription;

            if (temperature < 0) {
                climate = "Zimno";
                terrain = "Lodowaty";
                imageUrl = "https://c4.wallpaperflare.com/wallpaper/900/711/645/star-wars-at-at-walker-hoth-star-wars-wallpaper-preview.jpg";
                planetName = "Hoth";
                planetDescription = "Planeta Hoth to zimowa kraina, z pokrytymi lodem i śniegiem obszarami. Znana z lodowych krajobrazów i występowania AT-AT Walkerów.<a href='https://starwars.fandom.com/wiki/Hoth'>Dowiedz się więcej</a>";
            } else if (temperature >= 0 && temperature <= 10) {
                climate = "Chłodno";
                terrain = "Równinny";
                imageUrl = "https://lumiere-a.akamaihd.net/v1/images/alderaan-main_f5b676cf.jpeg?region=0%2C104%2C1280%2C512";
                planetName = "Alderaan";
                planetDescription = planetDescription = "Planeta Alderaan to piękna kraina, pełna równin i zróżnicowanej przyrody. Znana z kultury i historii. <a href='https://starwars.fandom.com/wiki/Alderaan'>Dowiedz się więcej</a>";

            } else if (temperature > 10 && temperature <= 25) {
                climate = "Umiarkowanie ciepło";
                terrain = "Leśny";
                imageUrl = "https://c4.wallpaperflare.com/wallpaper/247/86/483/star-wars-star-wars-battlefront-endor-battle-of-endor-wallpaper-preview.jpg";
                planetName = "Endor";
                planetDescription = "Planeta Endor to leśna kraina, znana z bitwy o Endor i obecności Ewoków. Idealne miejsce na przygodę wśród drzew.<a href='https://starwars.fandom.com/wiki/Endor'>Dowiedz się więcej</a>";
            } else if (temperature > 25) {
                climate = "Gorąco";
                terrain = "Pustynny";
                imageUrl = "https://wallpapers.com/images/high/star-wars-landscape-1920-x-1080-et6iygoitkqu8vmy.webp";
                planetName = "Tatooine";
                planetDescription = "Planeta Tatooine to sucha i gorąca pustynia, znana z miasta Mos Eisley i występowania Jawas i Tusken Raiders.<a href='https://starwars.fandom.com/wiki/Tatooine'>Dowiedz się więcej</a>";
            } else {
                climate = "Klimat na planecie";
                terrain = "Teren na planecie";
                imageUrl = "https://i.imgur.com/JmDkJfv.jpeg";
                planetName = "Inna Planeta";
                planetDescription = "Opis dla innej planety. Dowiedz się więcej o tej fascynującej planecie!";
            }

            document.body.style.backgroundImage = `url('${imageUrl}')`;

            weatherInfoDiv.innerHTML = `<p>Miasto: ${city}</p>
                                       <p>Temperatura: ${temperature.toFixed(2)} °C</p>
                                       <p>Klimat: ${climate}</p>
                                       <p>Teren: ${terrain}</p>`;

            planetInfoDiv.innerHTML = `<p>W ${city} jest jak na planecie: ${planetName}</p>
                                       <p>${planetDescription}</p>`;
        } catch (error) {
            alert(error.message);
        }
    }
    
    function goToHomePage() {
        window.location.href = 'index.html';
      }