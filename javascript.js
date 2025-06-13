const searchBox = document.getElementById("searchbox");
const resultsList = document.getElementById("results");
const resultsCard = document.querySelector(".results-card");

searchBox.addEventListener("input", function () {
  const keyword = searchBox.value.trim().toLowerCase();

  if (!keyword) {
    resultsCard.style.display = "none";
    resultsList.innerHTML = "";
    return;
  }

  fetch("events.json")
    .then(response => {
      if (!response.ok) {
        throw new Error("Network error");
      }
      return response.json();
    })
    .then(events => {
      const filtered = events.filter(event =>
        event.title.toLowerCase().includes(keyword)
      );

      resultsList.innerHTML = "";

      if (filtered.length > 0) {
          resultsCard.style.display = "block";
          filtered.forEach(event => {
          const li = document.createElement("li");
          li.innerHTML = "<strong>" + event.title + "</strong><br>" + event.date + " | " + event.venue;
          resultsList.appendChild(li);
        });
      } else {
        resultsList.innerHTML = "<li>No events found.</li>";
      }
    })
    .catch(error => {
      resultsCard.style.display = "block";
      resultsList.innerHTML = "<li>Error loading events.</li>";
      console.error("Fetch error:", error);
    });
});

    window.addEventListener("DOMContentLoaded", () => {
    resultsCard.style.display = "none";
    resultsList.innerHTML = "";
    searchBox.value = "";
    });
