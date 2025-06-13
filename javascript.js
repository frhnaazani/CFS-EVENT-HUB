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

  const xhr = new XMLHttpRequest();
  xhr.open("GET", "events.json", true);

  xhr.onload = function () {
    if (xhr.status === 200) {
      const events = JSON.parse(xhr.responseText);
      const filtered = events.filter(event =>
        event.title.toLowerCase().includes(keyword)
      );

      resultsList.innerHTML = "";

      if (filtered.length > 0) {
        resultsCard.style.display = "block";
        filtered.forEach(event => {
          const li = document.createElement("li");
          li.innerHTML =
            "<strong>" + event.title + "</strong><br>" +
            event.date + " | " + event.venue;
          resultsList.appendChild(li);
        });
      } else {
        resultsCard.style.display = "block";
        resultsList.innerHTML = "<li>No events found.</li>";
      }
    } else {
      resultsCard.style.display = "block";
      resultsList.innerHTML = "<li>Error loading events.</li>";
    }
  };

  xhr.onerror = function () {
    resultsCard.style.display = "block";
    resultsList.innerHTML = "<li>Request failed.</li>";
  };

  xhr.send();
});

window.addEventListener("DOMContentLoaded", () => {
  resultsCard.style.display = "none";
  resultsList.innerHTML = "";
  searchBox.value = "";
});
