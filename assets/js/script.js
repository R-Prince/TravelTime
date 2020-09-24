document.getElementById("autocomplete").addEventListener("click", startAuto);

// Google autocomplete api for search bar
function startAuto(){
    autocomplete = new google.maps.places.Autocomplete(
        (document.getElementById('autocomplete')), {
        types: ['(cities)']}
    );
    autocomplete.addListener('place_changed', placeSearch);
};

// Google Maps API - Open modal and returns a city and map based on users search. 
function placeSearch(){
    var place = autocomplete.getPlace();
    var lat = place.geometry.location.lat();
    var lng = place.geometry.location.lng();

    $('#modal-page').modal('show');
    $('#modal-auto-header').text(place.name);
    $('#modal-auto-country').text(place.formatted_address);
    
    autoMap(lat,lng);
};

// Google Maps API - Opens a map on the modal based on the city selected
function autoMap(lat,lng) {
    var lat = lat;
    var lng = lng;
    var city = new google.maps.LatLng(lat,lng);

    map = new google.maps.Map(document.getElementById('mapAuto'), {
        center: city,
        zoom: 15
    });

    var resturants = {
        location: city,
        radius: '500',
        query: ['restaurant']
    };

    var hotels = {
        location: city,
        radius: '500',
        query: ['lodging']
    };

    var attractions = {
        location: city,
        radius: '500',
        query: ['tourist_attraction']
    };
    
    service = new google.maps.places.PlacesService(map);
    service.textSearch(resturants, callback);
    service.textSearch(attractions, callback);
    service.textSearch(hotels, hotelResults);
};

// Google Maps API - Callback function that drops markers on the map which are restuarants and attractions in the city
function callback(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
            var place = results[i];
            marker = new google.maps.Marker({
                map: map,
                animation: google.maps.Animation.DROP,
                position: place.geometry.location,
                name: place.name,
                address: place.formatted_address,
                rating: place.rating,
                icon: place.icon
            });

            var infowindow = new google.maps.InfoWindow({
                maxWidth: 300
            });

            marker.addListener('click', function() {
            infowindow.setContent(
                "<div><strong>" + 
                this.name + "</strong><br>" + 
                "<strong>Address: </strong>" + this.address + "<br>" + 
                "<strong>Rating: </strong>" + this.rating +
                "</div>"
                );
                infowindow.open(map, this);
            });
        }
    }    
}

// Google Place API - Using place ids this function returns information on the hotels used for the cards
function hotelResults(results, status){
    if (status == google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < 6; i++) {
            var placeIds = results[i].place_id;
            var request = {
                placeId: placeIds,
                fields: ['name', 'rating', 'website', 'photo', 'vicinity']
            }
            service = new google.maps.places.PlacesService(map);
            service.getDetails(request, hotelCards);   
        };
    };    
};

// Google Place API - This function uses the information returned from the search and creates html hotel cards
function hotelCards(results, status){
    if (status == google.maps.places.PlacesServiceStatus.OK) {
        var place = results;
        if (place.rating) {
            var ratingHtml = '';
            for (var i = 0; i < 5; i++) {
                if (place.rating < (i + 0.5)) {
                    ratingHtml += '<i class="far fa-star"></i>';
                } else {
                    ratingHtml += '<i class="fas fa-star"></i>';
                }
            }
        }
        $("#hotelCards").append(
        `<div class="col-12 col-lg-4 mb-3">
            <div class="card">
                <img src=${place.photos[0].getUrl({maxWidth: 300, maxHeight: 300})} class="card-img-top" alt="Image of the hotel">
                <div class="card-body text-center">
                    <ul class="card-list">
                        <li class="card-item font-weight-bolder">${place.name}</li>
                        <li  class="card-item">${place.vicinity}</li>  
                    </ul>
                    <hr class="card-hr">
                    <ul class="card-list">
                        <li class="card-item">${ratingHtml}</li>
                    </ul>
                        <a href=${place.website} target="_blank" class="btn btn-orange">Book Now</a>
                </div>
            </div>
        </div>`);
    }
}

// Remove previous HTML hotel cards, ready for the next search. 
function removeCards(){
    $("#hotelCards").empty();
    $('#quick-guide').empty();
    document.getElementById('autocomplete').value = '';
}

// Remove user input from contact form.
function removeText(){
    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
    document.getElementById('number').value = '';
    document.getElementById('enquiry').value = '';    
}

// Modal: Add quick guide HTML for Travel Time picks
$(".guide-html").click(function(){
   $('#quick-guide').append(` <div class="row mt-4 container">
    <div class="col-12 col-lg-8 mb-4">
        <div class="carousel slide" data-ride="carousel">
            <div class="carousel-inner">
                <div class="carousel-item active">
                    <img id="modal-image1" src="..." alt="image of city center" class="img-fluid">
                </div>
                <div class="carousel-item">
                    <img id="modal-image2" src="..." alt="image of city center" class="img-fluid">
                </div>
                <div class="carousel-item">
                    <img id="modal-image3" src="..." alt="image of city center" class="img-fluid">
                </div>
            </div>
        </div>   
    </div>
    <div class="col-12 col-lg-4">
        <h5 class="modal-guide">Quick Guide</h5>
        <ul class="quick-list">
            <li class="quick-item"><i class="quick-icon far fa-comments"></i><span id="language-item"></span></li>
            <li class="quick-item"><i class="quick-icon fas fa-hand-holding-usd"></i><span id="currency-item"></span></li>
            <li class="quick-item"><i class="quick-icon fas fa-temperature-low"></i><span id="temp-item"></span></li>
            <li class="quick-item"><i class="quick-icon fas fa-plane-departure"></i><span id="airport-item"></span></li>
            <li id="guide-item" class="quick-item"></li>
        </ul>
    </div>
    </div>`)
});

// Modal: Venice
$(".feature-venice").click(function(){ 
  $('#modal-page').modal('show');
  autoMap(45.4408474, 12.3155151);
  $('#modal-auto-header').text("venice");
  $('#modal-auto-country').text("italy");
  $('#language-item').text(" Italian");
  $('#currency-item').text(" Euros");
  $('#temp-item').text(" 22");
  $('#airport-item').text(" Treviso Airport (TSF)");
  $('#guide-item').text("The image of a dazzling city built on water has captured the imagination of writers, travellers, and city planners the world over. St Petersburg in Russia was modelled on it, Venezuela was named after it. Venice has a special place in the world’s collective heart and imagination.");
  $('#modal-image1').attr("src","https://images.unsplash.com/photo-1520175480921-4edfa2983e0f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1494&q=80");
  $('#modal-image2').attr("src","https://images.unsplash.com/photo-1523270805298-a339734e463e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80");
  $('#modal-image3').attr("src","https://images.unsplash.com/photo-1536183638923-a000c24b1645?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1418&q=80");
});

// Modal: Sydney
$(".feature-sydney").click(function(){
  $('#modal-page').modal('show');
  autoMap(-33.8688197, 151.2092955);
  $('#modal-auto-header').text("sydney");
  $('#modal-auto-country').text("Australia");
  $('#language-item').text("English");
  $('#currency-item').text("Australian Dollar");
  $('#temp-item').text(" 22");
  $('#airport-item').text("Sydney Airport (SYD)");
  $('#guide-item').text("Sydney is a very livable city with magnificent nature and vibrant cultural life. It is home to the largest fish market in the world and is also considered to be the most densely populated city in the entire continent.");
  $('#modal-image1').attr("src","https://images.unsplash.com/photo-1528800223624-764941bb49db?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1466&q=80");
  $('#modal-image2').attr("src","https://images.unsplash.com/photo-1566155676296-132ad1edce95?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80");
  $('#modal-image3').attr("src","https://images.unsplash.com/photo-1556763947-80fd07e395ad?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1490&q=80");
});

// Modal: Toronto
$(".feature-toronto").click(function(){
  $('#modal-page').modal('show');
  autoMap(43.653226, -79.3831843);
  $('#modal-auto-header').text("toronto");
  $('#modal-auto-country').text("canada");
  $('#language-item').text(" English");
  $('#currency-item').text(" Canadian Dollar");
  $('#temp-item').text(" 30");
  $('#airport-item').text(" Saint Catherines Airport (YCM)");
  $('#guide-item').text("If you’re planning a visit to Canada you’ll more likely than not be visiting Toronto. Because that’s the city from which you visit Niagra Falls, right? Well, yes, that is correct, but there is so much more to Toronto that its proximity to the spectacular waterfalls.");
  $('#modal-image1').attr("src","https://images.unsplash.com/photo-1477173860144-6f21cf27086a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80");
  $('#modal-image2').attr("src","https://images.unsplash.com/photo-1541781286675-7b70223358d1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1494&q=80");
  $('#modal-image3').attr("src","https://images.unsplash.com/photo-1550958940-1b59399ca81b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1489&q=80");
});

// Modal: Cape Town
$(".feature-cape").click(function(){
  $('#modal-page').modal('show');
  autoMap(-33.9248685, 18.4240553);
  $('#modal-auto-header').text("Cape Town");
  $('#modal-auto-country').text("south africa");
  $('#language-item').text(" English");
  $('#currency-item').text(" South African Rand");
  $('#temp-item').text(" 32");
  $('#airport-item').text(" Cape Town International Airport (CPT)");
  $('#guide-item').text("Awarded by New York Times as the best place in the world to visit in 2014, Cape Town is a beautiful port city located on the Southwest coast of Africa.  Famous for the Table Mountain, where at least two couples get hitched every month, and for the Castle of Good Hope that is the oldest colonial building in this part of Africa.");
  $('#modal-image1').attr("src","https://images.unsplash.com/photo-1530187589563-1ff5b061d4f9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1469&q=80");
  $('#modal-image2').attr("src","https://images.unsplash.com/photo-1522406207105-f182bbb0b380?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80");
  $('#modal-image3').attr("src","https://images.unsplash.com/photo-1560173931-92117e84b893?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1549&q=80");
});

// Modal: Zurich
$(".feature-zurich").click(function(){
  $('#modal-page').modal('show');
  autoMap(47.3768866, 8.541694);
  $('#modal-auto-header').text("zurich");
  $('#modal-auto-country').text("Switzerland");
  $('#language-item').text(" German");
  $('#currency-item').text(" Swiss Franc");
  $('#temp-item').text(" 19");
  $('#airport-item').text(" Zurich Airport (ZRH)");
  $('#guide-item').text("Home to many world’s major banks, lakes, mountains and parks, Zurich is a top tourist spot for many visitors. This charming city is also known as a global centre for banking and, therefore, attracts a lot of business clientele. Zurich has over 100 company hotels that are perfect for overnight stays. However, it is an expensive city, but the experience is more than worth it.");
  $('#modal-image1').attr("src","https://images.unsplash.com/photo-1544030134-c0883e9e4046?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1567&q=80");
  $('#modal-image2').attr("src","https://images.unsplash.com/photo-1557934447-52c74b70fee8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80");
  $('#modal-image3').attr("src","https://images.unsplash.com/photo-1567156628531-95047dde50d8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1567&q=80");
});

// Modal: Marrakech
$(".feature-marrakech").click(function(){
  $('#modal-page').modal('show');
  autoMap(31.6294723, -7.981084500000001);
  $('#modal-auto-header').text("marrakech");
  $('#modal-auto-country').text("morocco");
  $('#language-item').text(" Arabic");
  $('#currency-item').text(" Moroccan Dirham");
  $('#temp-item').text(" 27");
  $('#airport-item').text(" Marrakech Menara Airport (RAK)");
  $('#guide-item').text("The bustling Moroccan city of Marrakech will have you smiling ’til it hurts, licking your lips at the mouth watering food, scratching your head at the confusion, and shaking your head at how the madness just seems to work.");
  $('#modal-image1').attr("src","https://images.unsplash.com/photo-1580816256869-3e870e8b948f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1567&q=80");
  $('#modal-image2').attr("src","https://images.unsplash.com/photo-1572282924904-41bacfbd86a5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1412&q=80");
  $('#modal-image3').attr("src","https://images.unsplash.com/photo-1535191059345-c16453b851b2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1489&q=80");
});

/* Image Slider for Landing Page */
$(function () {
    var image = $('.callout-container');

    var backgrounds = [
      'url(https://images.unsplash.com/photo-1499678329028-101435549a4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80) no-repeat center', 
      'url(https://images.unsplash.com/photo-1486067068780-e5b81db649e7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1508&q=80) no-repeat center'];
    var current = 0;

    function nextBackground() {
        image.css('background',
        backgrounds[current = ++current % backgrounds.length]);

        setTimeout(nextBackground, 6000);
    }
    setTimeout(nextBackground, 6000);
    image.css('background', backgrounds[0]);
});
    