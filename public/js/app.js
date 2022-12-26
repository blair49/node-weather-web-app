function getWeather() {
  const address = document.getElementById("addressInput").value;
  const responseElement = document.getElementById("response");
  responseElement.innerText = "Fetching weather info...";
  fetch(`/weather?address=${address}`).then((response) => {
    response.json().then((data) => {
      let output;
      if (data.error) output = "Error: " + data.error;
      else
        output = `Location: ${data.placeName} Temp: ${data.temp} Description: ${data.description}`;

      responseElement.innerText = output;
    });
  });
}
