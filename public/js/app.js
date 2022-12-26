function getWeather() {
  const address = document.getElementById("addressInput").value;
  const responseElement = document.getElementById("response");
  responseElement.innerText = "Fetching weather info...";
  fetch(`/weather?address=${address}`).then((response) => {
    response.json().then((data) => {
      let output;
      if (data.error) output = "Error: " + data.error;
      else
        output = `Current weather in ${data.placeName} is ${data.description}. It is currently ${data.temp} degrees and it feels like ${data.feels_like} degrees`;

      responseElement.innerText = output;
    });
  });
}
