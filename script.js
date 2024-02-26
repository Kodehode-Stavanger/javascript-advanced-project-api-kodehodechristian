document.addEventListener("DOMContentLoaded", function () {
  
  // API endpoints array

  const endpoints = [
    { name: "Joyful prayers", endpoint: "v1/joyful" },
    { name: "Glorious prayers", endpoint: "v1/glorious" },
    { name: "Sorrowful prayers", endpoint: "v1/sorrowful" },
    { name: "Luminous prayers", endpoint: "v1/luminous" },
  ];

  // Image array

  const endpointImages = {
    "v1/joyful": "HolyMary.jpg",
    "v1/glorious": "HolyJesus.jpg",
    "v1/sorrowful": "HolyMary.jpg",
    "v1/luminous": "HolyJesus.jpg",
  };

  const endpointSelector = document.getElementById("apiEndpointSelector");
  const fetchPrayerButton = document.getElementById("fetchPrayer");
  const prayerDisplay = document.getElementById("prayerDisplay");

  // Populate dropdown

  endpoints.forEach(function (endpoint) {
    let option = new Option(endpoint.name, endpoint.endpoint);
    endpointSelector.add(option);
  });

  // Fetch data / Set picture

  fetchPrayerButton.addEventListener("click", function () {
    const selectedEndpoint = endpointSelector.value;
    const apiUrl = `https://the-rosary-api.vercel.app/${selectedEndpoint}`;

    async function getPrayerData() {
      try {
        const result = await fetch(apiUrl);
        const data = await result.json();
        generatePrayer(data);
        setBackgroundImage(selectedEndpoint);
      } catch (error) {
        console.log(error);
        const errorMsg = document.createElement("p");
        errorMsg.style.color = "red";
        errorMsg.textContent = error.message;
        prayerDisplay.append(errorMsg);
      }
    }

    getPrayerData();
  });

  // Image function

  function setBackgroundImage(selectedEndpoint) {
    const blessedDiv = document.getElementById("blessedDiv");
    const imageUrl = endpointImages[selectedEndpoint];
    const img = new Image();
    img.src = imageUrl;
    img.onload = function () {
      blessedDiv.style.backgroundImage = `url('${imageUrl}')`;
      blessedDiv.style.backgroundPosition = "center";
      blessedDiv.style.height = `${img.height}px`;
      blessedDiv.style.width = `${img.width}px`;
    };
  }

  // Title, Verse, Fruit, Prayer text creation & appending

  function generatePrayer(data) {
    // Clear previous content
    while (prayerDisplay.firstChild) prayerDisplay.firstChild.remove();
    
    // Element creation
    data.forEach((prayer) => {
      const prayerSection = document.createElement("section");
      const title = document.createElement("h2");
      const verse = document.createElement("p");
      const fruit = document.createElement("p");
      const text = document.createElement("p");
      // Styling of elements
      prayerSection.style.marginBottom = "20px";
      title.style.marginBottom = "10px";
      title.textContent = prayer.title;
      verse.textContent = `Verse: ${prayer.verse}`;
      fruit.textContent = `${prayer.fruit}`;
      text.textContent = prayer.text;

      prayerSection.append(title, verse, fruit, text);
      prayerDisplay.append(prayerSection);
    });
  }
});
