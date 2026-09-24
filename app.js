let locationBtn = document.getElementById("locationBtn");
let locationModal = document.getElementById("locationModal");
let closeLocation = document.getElementById("closeLocation");
let differentLocationBtn = document.getElementById("differentLocationBtn");
let locationSearch = document.getElementById("locationSearch");
let backToLocation = document.getElementById("backToLocation");
let locationInput = document.getElementById("locationInput");
let locationResults = document.getElementById("locationResults");
let currentLocationBtn = document.getElementById("currentLocationBtn");
let detectedLocation = document.getElementById("detectedLocation");
let detectedAddress = document.getElementById("detectedAddress");
let closeDetectedLocation = document.getElementById("closeDetectedLocation");

locationBtn.addEventListener("click", () => {
  locationModal.classList.add("active");
  console.log(locationBtn);
});

closeLocation.addEventListener("click", () => {
  locationModal.classList.remove("active");
  console.log(closeLocation);
});

locationModal.addEventListener("click", (e) => {
  if (e.target === locationModal) {
    locationModal.classList.remove("active");
  }
});

// search  //

differentLocationBtn.addEventListener("click", () => {
  locationSearch.classList.add("active");
  locationInput.focus();
});

/* back  */
backToLocation.addEventListener("click", () => {
  locationSearch.classList.remove("active");
});

currentLocationBtn.addEventListener("click", () => {
  if (!navigator.geolocation) {
    alert("Geolocation is not supported.");

    return;
  }

  detectedLocation.classList.add("active");

  detectedAddress.textContent = "Detecting location...";

  navigator.geolocation.getCurrentPosition(
    async (position) => {
      const latitude = position.coords.latitude;

      const longitude = position.coords.longitude;

      console.log("Latitude:", latitude);
      console.log("Longitude:", longitude);

      try {
        const url = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`;

        const response = await fetch(url);

        const data = await response.json();

        console.log("API Response:", data);

        const city =
          data.city ||
          data.locality ||
          data.principalSubdivision ||
          "Unknown City";

        const postcode = data.postcode || "";

        const finalAddress = postcode ? `${city}, ${postcode}` : city;

        detectedAddress.textContent = finalAddress;

        localStorage.setItem("deliveryAddress", finalAddress);

        const addressText = document.getElementById("addressText");

        if (addressText) {
          addressText.textContent = finalAddress;
        }
      } catch (error) {
        console.log("API Error:", error);

        detectedAddress.textContent = "Unable to detect address.";
      }
    },

    (error) => {
      console.log("Location Error:", error);

      detectedAddress.textContent = "Location permission denied.";
    },
  );
});

/* =================================
   BACK BUTTON
================================= */

if (closeDetectedLocation) {
  closeDetectedLocation.addEventListener("click", () => {
    detectedLocation.classList.remove("active");
  });
}

/* serach location */

locationInput.addEventListener("input", async () => {
  let query = locationInput.value.trim();

  if (query.length < 3) {
    locationResults.innerHTML = "";

    return;
  }

  try {
    let url = `https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&limit=5&q=${encodeURIComponent(query)}`;

    let response = await fetch(url);

    let data = await response.json();

    locationResults.innerHTML = "";

    data.forEach((location) => {
      let div = document.createElement("div");

      div.className = "location-result";

      div.innerHTML = `
                
                <strong>
                    ${location.display_name}
                </strong>

                <span>
                    ${location.type}
                </span>

            `;

      /* =========================
                     SELECT LOCATION
                  ========================= */

      div.addEventListener("click", () => {
        console.log("Selected Location:", location);

        /* Get address */

        let address = location.address || {};

        /* Get city */

        let city =
          address.city ||
          address.town ||
          address.village ||
          address.suburb ||
          "";

        /* Get pincode */

        let postcode = address.postcode || "";

        /* Final address */

        let finalAddress = postcode ? `${city}, ${postcode}` : city;

        console.log("Final Address:", finalAddress);

        /* =========================
                           UPDATE NAVBAR
                        ========================= */

        if (addressText) {
          addressText.textContent = finalAddress;
        }

        /* =========================
                           SAVE LOCATION
                        ========================= */

        localStorage.setItem("deliveryAddress", finalAddress);

        /* =========================
                           CLOSE SEARCH
                        ========================= */

        locationSearch.classList.remove("active");

        /* =========================
                           CLOSE LOCATION DRAWER
                        ========================= */

        locationModal.classList.remove("active");

        /* Clear results */

        locationResults.innerHTML = "";

        locationInput.value = "";
      });

      locationResults.appendChild(div);
    });
  } catch (error) {
    console.log("Location Search Error:", error);
  }
});
