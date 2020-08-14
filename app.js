window.addEventListener('load', () => {
  let long;
  let lat;
  const temperatureDescription = document.querySelector(
    '.temperature-description'
  );
  const temperatureDegree = document.querySelector('.temperature-degree');
  const locationTimezone = document.querySelector('.location-timezone');
  const temperatureSection = document.querySelector('.temperature');
  const temperatureSpan = document.querySelector('.temperature span');

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      long = position.coords.longitude;
      lat = position.coords.latitude;

      const proxy = 'https://cors-anywhere.herokuapp.com/';
      const api = `${proxy}https://api.darksky.net/forecast/fd9d9c6418c23d94745b836767721ad1/${lat},${long}`;

      fetch(api)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          const { temperature, summary, icon } = data.currently;

          // Set DOM Elements from the API
          temperatureDegree.textContent = temperature;
          temperatureDescription.textContent = summary;
          locationTimezone.textContent = data.timezone;

          // FORMULA FOR CELSIUS
          let celsius = (temperature - 32) * (5 / 9);

          // Set Icon
          setIcons(icon, document.querySelector('.icon'));

          // Change temperature to Celsius/Fahrenheit
          temperatureSection.addEventListener('click', () => {
            if (temperatureSpan.textContent === 'F') {
              temperatureSpan.textContent = 'C';
              temperatureDegree.textContent = Math.floor(celsius);
            } else {
              temperatureSpan.textContent = 'F';
              temperatureDegree.textContent = temperature;
            }
          });
        });
    });
  } else {
    h1.textContent = 'This is not working in your browser';
  }

  const setIcons = (icon, iconID) => {
    const skycons = new Skycons({ color: 'white' });
    const currentIcon = icon.replace(/-/g, '_').toUpperCase();
    skycons.play();
    return skycons.set(iconID, Skycons[currentIcon]);
  };
});
