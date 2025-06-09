// filter //
    const searchBox = document.getElementById("searchbox");
    const resultsList = document.getElementById("results");
    const resultsCard = document.querySelector(".results-card");

    searchBox.addEventListener("input", searchEvents);

    function searchEvents() {
    const keyword = searchBox.value.toLowerCase();

    fetch("events.json")
        .then(response => {
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        return response.json();
        })
        .then(events => {
        const filtered = events.filter(event =>
            event.title.toLowerCase().includes(keyword)
        );

        resultsList.innerHTML = "";

        if (filtered.length > 0) {
            resultsCard.style.display = "block"; // Show results
            for (let i = 0; i < filtered.length; i++) {
                    let event = filtered[i];
                    let li = document.createElement("li");
                    li.innerHTML = "<strong>" + event.title + "</strong><br>" + event.date + " | " + event.venue;
                    resultsList.appendChild(li);
            }
        } else {
            resultsList.innerHTML = "<li>No events found.</li>";
        }
        })
        
        .catch(error => {
        resultsCard.style.display = "block";
        resultsList.innerHTML = "<li>Error loading events.</li>";
        console.error("Fetch error:", error);
        });
    }
