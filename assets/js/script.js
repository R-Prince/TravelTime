//Google Place API 
var map, places, infoWindow;
var markers = [];
var autocomplete;
var countryRestrict = {'country': 'us'};
var MARKER_PATH = 'https://developers.google.com/maps/documentation/javascript/images/marker_green';
var hostnameRegexp = new RegExp('^https?://.+?/');

function initMap() {
    const worldCenter = {lat: 15, lng: 0};
    map = new google.maps.Map(document.getElementById('map'), {
    zoom: 2,
    center: worldCenter,
    mapTypeControl: false,
    panControl: false,
    zoomControl: false,
    streetViewControl: false
    });

    infoWindow = new google.maps.InfoWindow({
        content: document.getElementById('info-content')
    });
    autocomplete = new google.maps.places.Autocomplete(
        (document.getElementById('autocomplete')), {
        types: ['(cities)']}
    );
    places = new google.maps.places.PlacesService(map);
    autocomplete.addListener('place_changed', onPlaceChanged);
}
    
function onPlaceChanged() {
    var place = autocomplete.getPlace();
    if (place.geometry) {
        map.panTo(place.geometry.location);
        map.setZoom(15);
        search();
    } else {
        document.getElementById('autocomplete').placeholder = 'Enter a city';
    }
};

// Search for attractions in the selected city, within the viewport of the map.
function search() {
    var search = {
        bounds: map.getBounds(),
        types: ['tourist_attraction']
    };
    places.nearbySearch(search, function(results, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
        clearResults();
        clearMarkers();
        // Create a marker for each attraction found, and
        // assign a letter of the alphabetic to each marker icon.
        for (var i = 0; i < results.length; i++) {
        var markerLetter = String.fromCharCode('A'.charCodeAt(0) + (i % 26));
        var markerIcon = MARKER_PATH + markerLetter + '.png';
        // Use marker animation to drop the icons incrementally on the map.
        markers[i] = new google.maps.Marker({
        position: results[i].geometry.location,
        animation: google.maps.Animation.DROP,
        icon: markerIcon
    });
    // If the user clicks a marker, show the details of that attraction
    // in an info window.
    markers[i].placeResult = results[i];
    google.maps.event.addListener(markers[i], 'click', showInfoWindow);
    setTimeout(dropMarker(i), i * 100);
    addResult(results[i], i);
    }
    }
    });
};

function clearMarkers() {
    for (var i = 0; i < markers.length; i++) {
        if (markers[i]) {
        markers[i].setMap(null);}
    }
    markers = [];
};

function dropMarker(i) {
    return function() {
    markers[i].setMap(map);
    };
};

function addResult(result, i) {
    var results = document.getElementById('results');
    var markerLetter = String.fromCharCode('A'.charCodeAt(0) + (i % 26));
    var markerIcon = MARKER_PATH + markerLetter + '.png';

    var tr = document.createElement('tr');
    tr.style.backgroundColor = (i % 2 === 0 ? '#F0F0F0' : '#FFFFFF');
    tr.onclick = function() {
    google.maps.event.trigger(markers[i], 'click');
    };

    var iconTd = document.createElement('td');
    var nameTd = document.createElement('td');
    var icon = document.createElement('img');
    icon.src = markerIcon;
    icon.setAttribute('class', 'placeIcon');
    icon.setAttribute('className', 'placeIcon');
    var name = document.createTextNode(result.name);
    iconTd.appendChild(icon);
    nameTd.appendChild(name);
    tr.appendChild(iconTd);
    tr.appendChild(nameTd);
    results.appendChild(tr);
};

function clearResults() {
    var results = document.getElementById('results');
    while (results.childNodes[0]) {
        results.removeChild(results.childNodes[0]);
    }
};

// Get the place details for an attraction. Show the information in an info window,
// anchored on the marker for the attraction that the user selected.
function showInfoWindow() {
    var marker = this;
    places.getDetails({placeId: marker.placeResult.place_id},
    function(place, status) {
        if (status !== google.maps.places.PlacesServiceStatus.OK) {
            return;
        }
        infoWindow.open(map, marker);
        buildIWContent(place);
        });
    };

    // Load the place information into the HTML elements used by the info window.
    function buildIWContent(place) {
        document.getElementById('iw-icon').innerHTML = '<img class="attraction-icon"' + 'src="' + place.icon + '"/>';
        document.getElementById('iw-url').innerHTML = '<b><a href="' + place.url + '">' + place.name + '</a></b>';
        document.getElementById('iw-address').textContent = place.vicinity;

        if (place.formatted_phone_number) {
            document.getElementById('iw-phone-row').style.display = '';
            document.getElementById('iw-phone').textContent = place.formatted_phone_number;
        } else {
          document.getElementById('iw-phone-row').style.display = 'none';
        }
    
        if (place.rating) {
          var ratingHtml = '';
          for (var i = 0; i < 5; i++) {
            if (place.rating < (i + 0.5)) {
              ratingHtml += '&#10025;';
            } else {
              ratingHtml += '&#10029;';
            }
            document.getElementById('iw-rating-row').style.display = '';
            document.getElementById('iw-rating').innerHTML = ratingHtml;
            }
        } else {
          document.getElementById('iw-rating-row').style.display = 'none';
        }
        if (place.website) {
          var fullUrl = place.website;
          var website = hostnameRegexp.exec(place.website);
          if (website === null) {
            website = 'http://' + place.website + '/';
            fullUrl = website;
        
          document.getElementById('iw-website-row').style.display = '';
          document.getElementById('iw-website').textContent = website;
        } else {
          document.getElementById('iw-website-row').style.display = 'none';
        }    
    }
};

// Section: Modal 

// Modal: London
$(".feature-london").click(function(){
  $('#modal-header').text("london");
  $('#modal-country').text("England");
  $('#language-item').text("English");
  $('#currency-item').text("Pound Sterling");
  $('#temp-item').text("15");
  $('#airport-item').text("London Heathrow Airport");
  $('#guide-item').text("London is the capital and largest city of England and the United Kingdom, and is the largest urban area in Greater London. The River Thames travels through the city. London is the biggest city in western Europe, and the world's largest financial centre. ... London was founded by the Romans.");
  $('#modal-image').attr("src","https://images.unsplash.com/photo-1550954992-8e4ae3f6897b?ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80")
});

// Modal: Cancun
$(".feature-cancun").click(function(){
  $('#modal-header').text("cancun");
  $('#modal-country').text("mexico");
  $('#language-item').text(" Spanish");
  $('#currency-item').text(" Peso");
  $('#temp-item').text(" 30");
  $('#airport-item').text(" Cancun International Airport");
  $('#guide-item').text("Cancun is considered to be the heart of the Mexican Caribbean and year on year thousands of visitors who come to the Yucatan Peninsula end up right here! The gorgeous beaches, great weather, and amazingly clear and clean waters are huge pulls for many tourists.");
  $('#modal-image').attr("src","https://images.unsplash.com/photo-1512813195386-6cf811ad3542?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80")
});

// Modal: Santorini
$(".feature-santorini").click(function(){
  $('#modal-header').text("santorini");
  $('#modal-country').text("greece");
  $('#language-item').text(" Greek");
  $('#currency-item').text(" Euro");
  $('#temp-item').text(" 28");
  $('#airport-item').text(" Santorini (Thira) National Airport");
  $('#guide-item').text("When you close your eyes and dream of your Greek Island getaway do you imagine being perched on a cliff, looking out over the dazzling blue ocean, cool wine in hand, with blindingly white-washed houses behind you? Santorini is the one for you. Sure, you get this on the other islands that make up the Cyclades, but Santorini is the cream of the crop. When the ever-brilliant sunsets light up the cliffs and the buildings you may just think you’ve died and gone to heaven.");
  $('#modal-image').attr("src","https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=722&q=80")
});

// Modal: Florida
$(".feature-florida").click(function(){
  $('#modal-header').text("florida");
  $('#modal-country').text("america");
  $('#language-item').text(" English (US)");
  $('#currency-item').text(" US Dollar");
  $('#temp-item').text(" 32");
  $('#airport-item').text(" Tampa International Airport");
  $('#guide-item').text("Florida, otherwise known as the Sunshine State, is world-renowned for its year-round warm temperatures and attracts millions of visitors from all over the globe every year. Whilst the world-class theme parks – including Walt Disney World Resort, Universal Orlando Resort, SeaWorld Orlando and Discovery Cove - remain a major draw for holiday makers, the rest of the state has plenty to offer too.  With prices now comparable to other short and mid-haul package holiday destinations, what used to be a dream can now be turned into an exciting reality.");
  $('#modal-image').attr("src","https://images.unsplash.com/photo-1542391085-dd1c64a52bd5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80")
});

// Modal: Kingston
$(".feature-kingston").click(function(){
  $('#modal-header').text("kingston");
  $('#modal-country').text("jamaica");
  $('#language-item').text(" Jamaican");
  $('#currency-item').text(" Jamaican Dollar");
  $('#temp-item').text(" 36");
  $('#airport-item').text(" Norman Manley International Airport");
  $('#guide-item').text("Probably the Caribbean’s best known country, Jamaica is known all over the world through the musical icon of Bob Marley. Music is life here in this tropical garden paradise, and the connection between the culture and nature is visceral. Dance the night away in one of Kingston dance halls or the epic beach parties of Negril.");
  $('#modal-image').attr("src","https://images.unsplash.com/photo-1519046904884-53103b34b206?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80")
});

// Modal: Bali
$(".feature-bali").click(function(){
  $('#modal-header').text("bali");
  $('#modal-country').text("idoneisa");
  $('#language-item').text(" Indonesian");
  $('#currency-item').text(" Indonesian rupiah");
  $('#temp-item').text(" 27");
  $('#airport-item').text(" Ngurah Rai International Airport");
  $('#guide-item').text("Bali – the predominantly Buddhist island of Indonesia has a personality of its own compared to the others. Here you’ll find temples as beautiful as the people, intricate offerings laid out on the street only to be trampled by passing traffic, and multiple religious holidays every year. This is the ‘real’ Bali. The other side of Bali is that which has succumbed to rampant tourism – ‘Westerners Gone Wild’ strips of debauched behaviour and sunburnt skin.");
  $('#modal-image').attr("src","https://images.unsplash.com/photo-1544959068-7c75914bf21e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=667&q=80")
});