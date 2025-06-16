// Function to initialize the map
function init() {
    // Set up the map options
    var mapOptions = {
        center: new google.maps.LatLng(3.72803, 103.06422), // CFS IIUM
        mapTypeId: google.maps.MapTypeId.HYBRID,
        zoom: 15
    };

    // Create the map and assign it to the 'map' div
    var venueMap = new google.maps.Map(document.getElementById('map'), mapOptions);

    // List of locations
    var locations = [
        {lat: 3.72711, lng: 103.06401, title: "Masjid CFS IIUM"},
        {lat: 3.72432, lng: 103.05961, title: "Library Dar Al-Hikmah"},
        {lat: 3.72261, lng: 103.05989, title: "Mahallah Umamah"}
    ];

    // Pin locations
    for (var i = 0; i < locations.length; i++) {
        var loc = locations[i];
        var marker = new google.maps.Marker({
        position: new google.maps.LatLng(loc.lat, loc.lng),
        map: venueMap,
        title: loc.title});
    }
}

// Function to load the Google Maps API script
function loadScript() {
    var script = document.createElement('script');
    script.src = 'https://maps.googleapis.com/maps/api/js?sensor=false&callback=init';
    document.body.appendChild(script);
}

// Run loadScript when the window finishes loading
window.onload = loadScript;
