
document.getElementById("autocomplete").addEventListener("click", startAuto);

function startAuto(){
    autocomplete = new google.maps.places.Autocomplete(
        (document.getElementById('autocomplete')), {
        types: ['(cities)']}
    );

    autocomplete.addListener('place_changed', placeSearch)
        
}

function placeSearch(){
    var place = autocomplete.getPlace();
    var lat = place.geometry.location.lat();
    var lng = place.geometry.location.lng()

    console.log(place);

    modalAttractions(lat,lng);

    $('#modal-auto-info').modal('show')
    $('#modal-auto-header').text(place.name);
    $('#modal-auto-country').text(place.formatted_address);


    function modalAttractions(a,b){
        var map;
        var service;
        var marker = [];

        function autoMap() {
            var lat = a;
            var lng = b;
            var city = new google.maps.LatLng(lat,lng);

            map = new google.maps.Map(document.getElementById('mapAuto'), {
                center: city,
                zoom: 15
            });

            var request = {
                location: city,
                radius: '500',
                query: ['restaurant', 'tourist_attraction']
            };

            var requestHotel = {
                location: city,
                radius: '500',
                query: 'lodging'
            }

            service = new google.maps.places.PlacesService(map);
            service.textSearch(request, callback);
            service.textSearch(requestHotel, callbackHotel);
            
        }

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
                        rating: place.rating
                    })

                    const infowindow = new google.maps.InfoWindow({
                        maxWidth: 300
                    });
                    marker.addListener('click', function() {
                    infowindow.setContent(
                        "<div><strong>" + 
                        this.name + "</strong><br>" + 
                        "<strong>Address: </strong>" + this.address + "<br>" + 
                        "<strong>Rating: </strong>" + this.rating +
                        "</div>"
                    )
                    infowindow.open(map, this);
                    });
                }
            }
    
        } 

        function callbackHotel(results, status) {
            if (status == google.maps.places.PlacesServiceStatus.OK) {
                var placeIdOne = results[0].place_id;
                var placeIdTwo = results[1].place_id;
                var placeIdThree = results[2].place_id;
                var placeIdFour = results[3].place_id;
                var placeIdFive = results[4].place_id;
                var placeIdSix = results[5].place_id;
            }

            var requestOne = {
                placeId: placeIdOne,
                fields: ['name', 'rating', 'website', 'photo', 'vicinity']
            };

            var requestTwo = {
                placeId: placeIdTwo,
                fields: ['name', 'rating', 'website', 'photo', 'vicinity']
            };

            var requestThree = {
                placeId: placeIdThree,
                fields: ['name', 'rating', 'website', 'photo', 'vicinity']
            };

                var requestFour = {
                placeId: placeIdFour,
                fields: ['name', 'rating', 'website', 'photo', 'vicinity']
            };

                var requestFive = {
                placeId: placeIdFive,
                fields: ['name', 'rating', 'website', 'photo', 'vicinity']
            };

                var requestSix = {
                placeId: placeIdSix,
                fields: ['name', 'rating', 'website', 'photo', 'vicinity']
            };

            service = new google.maps.places.PlacesService(map);
            service.getDetails(requestOne, callbackPlaceOne);
            service.getDetails(requestTwo, callbackPlaceTwo);
            service.getDetails(requestThree, callbackPlaceThree);
            service.getDetails(requestFour, callbackPlaceFour);
            service.getDetails(requestFive, callbackPlaceFive);
            service.getDetails(requestSix, callbackPlaceSix);
            
            function callbackPlaceOne(results, status){
                if (status == google.maps.places.PlacesServiceStatus.OK) {
                    var place = results;
                    $('#autoHotelNameOne').text(place.name);
                    $('#autoHotelAddressOne').text(place.vicinity);
                    $('#autoHotelBookOne').attr("href", place.website);
                    $('#autoHotelImageOne').attr("src", place.photos[0].getUrl({maxWidth: 300, maxHeight: 300}));
                    if (place.rating) {
                        var ratingHtml = '';
                        for (var i = 0; i < 5; i++) {
                            if (place.rating < (i + 0.5)) {
                                ratingHtml += '<i class="far fa-star"></i>'
                            } else {
                                ratingHtml += '<i class="fas fa-star"></i>'
                            }
                            $('#autoHotelRatingOne').html(ratingHtml);
                        }
                    } 
                }
            }

            function callbackPlaceTwo(results, status){
                if (status == google.maps.places.PlacesServiceStatus.OK) {
                    var place = results;
                    $('#autoHotelNameTwo').text(place.name);
                    $('#autoHotelAddressTwo').text(place.vicinity);
                    $('#autoHotelBookTwo').attr("href", place.website);
                    $('#autoHotelImageTwo').attr("src", place.photos[0].getUrl({maxWidth: 300, maxHeight: 300}));
                    if (place.rating) {
                        var ratingHtml = '';
                        for (var i = 0; i < 5; i++) {
                            if (place.rating < (i + 0.5)) {
                                ratingHtml += '<i class="far fa-star"></i>'
                            } else {
                                ratingHtml += '<i class="fas fa-star"></i>'
                            }
                            $('#autoHotelRatingTwo').html(ratingHtml);
                        }
                    } 
                }
            }

            function callbackPlaceThree(results, status){
                if (status == google.maps.places.PlacesServiceStatus.OK) {
                    var place = results;
                    $('#autoHotelNameThree').text(place.name);
                    $('#autoHotelAddressThree').text(place.vicinity);
                    $('#autoHotelBookThree').attr("href", place.website);
                    $('#autoHotelImageThree').attr("src", place.photos[0].getUrl({maxWidth: 300, maxHeight: 300}));
                    if (place.rating) {
                        var ratingHtml = '';
                        for (var i = 0; i < 5; i++) {
                            if (place.rating < (i + 0.5)) {
                                ratingHtml += '<i class="far fa-star"></i>'
                            } else {
                                ratingHtml += '<i class="fas fa-star"></i>'
                            }
                            $('#autoHotelRatingThree').html(ratingHtml);
                        }
                    } 
                }
            }

            function callbackPlaceFour(results, status){
                if (status == google.maps.places.PlacesServiceStatus.OK) {
                    var place = results;
                    $('#autoHotelNameFour').text(place.name);
                    $('#autoHotelAddressFour').text(place.vicinity);
                    $('#autoHotelBookFour').attr("href", place.website);
                    $('#autoHotelImageFour').attr("src", place.photos[0].getUrl({maxWidth: 300, maxHeight: 300}));
                    if (place.rating) {
                        var ratingHtml = '';
                        for (var i = 0; i < 5; i++) {
                            if (place.rating < (i + 0.5)) {
                                ratingHtml += '<i class="far fa-star"></i>'
                            } else {
                                ratingHtml += '<i class="fas fa-star"></i>'
                            }
                            $('#autoHotelRatingFour').html(ratingHtml);
                        }
                    } 
                }
            }
        
            function callbackPlaceFive(results, status){
                if (status == google.maps.places.PlacesServiceStatus.OK) {
                    var place = results;
                    $('#autoHotelNameFive').text(place.name);
                    $('#autoHotelAddressFive').text(place.vicinity);
                    $('#autoHotelBookFive').attr("href", place.website);
                    $('#autoHotelImageFive').attr("src", place.photos[0].getUrl({maxWidth: 300, maxHeight: 300}));
                    if (place.rating) {
                        var ratingHtml = '';
                        for (var i = 0; i < 5; i++) {
                            if (place.rating < (i + 0.5)) {
                                ratingHtml += '<i class="far fa-star"></i>'
                            } else {
                                ratingHtml += '<i class="fas fa-star"></i>'
                            }
                            $('#autoHotelRatingFive').html(ratingHtml);
                        }
                    } 
    
                }
            }

            function callbackPlaceSix(results, status){
                if (status == google.maps.places.PlacesServiceStatus.OK) {
                    var place = results;
                    $('#autoHotelNameSix').text(place.name);
                    $('#autoHotelAddressSix').text(place.vicinity);
                    $('#autoHotelBookSix').attr("href", place.website);
                    $('#autoHotelImageSix').attr("src", place.photos[0].getUrl({maxWidth: 300, maxHeight: 300}));
                    if (place.rating) {
                        var ratingHtml = '';
                        for (var i = 0; i < 5; i++) {
                            if (place.rating < (i + 0.5)) {
                                ratingHtml += '<i class="far fa-star"></i>'
                            } else {
                                ratingHtml += '<i class="fas fa-star"></i>'
                            }
                            $('#autoHotelRatingSix').html(ratingHtml);
                        }
                    } 
        
                }
            }
            
    
        } 
        autoMap();
    }
        
}

// Section: Modal Information

// Modal: Sydney
$(".feature-sydney").click(function(){
  $('#modal-header').text("sydney");
  $('#modal-country').text("Australia");
  $('#language-item').text("English");
  $('#currency-item').text("Australian Dollar");
  $('#temp-item').text(" 22");
  $('#airport-item').text("Sydney Airport (SYD)");
  $('#guide-item').text("Sydney is a very livable city with magnificent nature and vibrant cultural life. It is home to the largest fish market in the world and is also considered to be the most densely populated city in the entire continent.");
  $('#modal-image').attr("src","https://images.unsplash.com/photo-1550954992-8e4ae3f6897b?ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80")
  modalAttractions(-33.8688197, 151.2092955)
    
});

// Modal: Venice
$(".feature-venice").click(function(){
  $('#modal-header').text("venice");
  $('#modal-country').text("italy");
  $('#language-item').text(" Italian");
  $('#currency-item').text(" Euros");
  $('#temp-item').text(" 22");
  $('#airport-item').text(" Treviso Airport (TSF)");
  $('#guide-item').text("The image of a dazzling city built on water has captured the imagination of writers, travellers, and city planners the world over. St Petersburg in Russia was modelled on it, Venezuela was named after it. Venice has a special place in the world’s collective heart and imagination.");
  $('#modal-image').attr("src","https://images.unsplash.com/photo-1512813195386-6cf811ad3542?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80")
  modalAttractions(45.4408474, 12.3155151)

});

// Modal: Toronto
$(".feature-toronto").click(function(){
  $('#modal-header').text("toronto");
  $('#modal-country').text("canada");
  $('#language-item').text(" English");
  $('#currency-item').text(" Canadian Dollar");
  $('#temp-item').text(" 30");
  $('#airport-item').text(" Saint Catherines Airport (YCM)");
  $('#guide-item').text("If you’re planning a visit to Canada you’ll more likely than not be visiting Toronto. Because that’s the city from which you visit Niagra Falls, right? Well, yes, that is correct, but there is so much more to Toronto that its proximity to the spectacular waterfalls.");
  $('#modal-image').attr("src","https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=722&q=80")
  modalAttractions(43.653226, -79.3831843)
});

// Modal: Cape Town
$(".feature-cape").click(function(){
  $('#modal-header').text("Cape Town");
  $('#modal-country').text("south africa");
  $('#language-item').text(" English");
  $('#currency-item').text(" South African Rand");
  $('#temp-item').text(" 32");
  $('#airport-item').text(" Cape Town International Airport (CPT)");
  $('#guide-item').text("Awarded by New York Times as the best place in the world to visit in 2014, Cape Town is a beautiful port city located on the Southwest coast of Africa.  Famous for the Table Mountain, where at least two couples get hitched every month, and for the Castle of Good Hope that is the oldest colonial building in this part of Africa.");
  $('#modal-image').attr("src","https://images.unsplash.com/photo-1542391085-dd1c64a52bd5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80")
  modalAttractions(-33.9248685, 18.4240553)
});

// Modal: Zurich
$(".feature-kingston").click(function(){
  $('#modal-header').text("zurich");
  $('#modal-country').text("Switzerland");
  $('#language-item').text(" German");
  $('#currency-item').text(" Swiss Franc");
  $('#temp-item').text(" 19");
  $('#airport-item').text(" Zurich Airport (ZRH)");
  $('#guide-item').text("Home to many world’s major banks, lakes, mountains and parks, Zurich is a top tourist spot for many visitors. This charming city is also known as a global centre for banking and, therefore, attracts a lot of business clientele. Zurich has over 100 company hotels that are perfect for overnight stays. However, it is an expensive city, but the experience is more than worth it.");
  $('#modal-image').attr("src","https://images.unsplash.com/photo-1519046904884-53103b34b206?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80")
  modalAttractions(47.3768866, 8.541694)
});

// Modal: Marrakech
$(".feature-marrakech").click(function(){
  $('#modal-header').text("marrakech");
  $('#modal-country').text("morocco");
  $('#language-item').text(" Arabic");
  $('#currency-item').text(" Moroccan Dirham");
  $('#temp-item').text(" 27");
  $('#airport-item').text(" Marrakech Menara Airport (RAK)");
  $('#guide-item').text("The bustling Moroccan city of Marrakech will have you smiling ’til it hurts, licking your lips at the mouth watering food, scratching your head at the confusion, and shaking your head at how the madness just seems to work.");
  $('#modal-image').attr("src","https://images.unsplash.com/photo-1544959068-7c75914bf21e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=667&q=80")
  modalAttractions(31.6294723, -7.981084500000001)
});


// Google Maps API Top Attractions results: Modal Recommedations
function modalAttractions(a,b){
    var map;
    var service;
    var marker = [];

    function modalMap() {
        var lat = a;
        var lng = b;
        var city = new google.maps.LatLng(lat,lng);

        map = new google.maps.Map(document.getElementById('mapModal'), {
            center: city,
            zoom: 15
        });

        var request = {
            location: city,
            radius: '500',
            query: ['restaurant', 'tourist_attraction']
        };

        var requestHotel = {
            location: city,
            radius: '500',
            query: 'lodging'
        }

        service = new google.maps.places.PlacesService(map);
        service.textSearch(request, callback);
        service.textSearch(requestHotel, callbackHotel);
        
    }

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
                    rating: place.rating
                })

                const infowindow = new google.maps.InfoWindow({
                    maxWidth: 300
                });
                marker.addListener('click', function() {
                infowindow.setContent(
                    "<div><strong>" + 
                    this.name + "</strong><br>" + 
                    "<strong>Address: </strong>" + this.address + "<br>" + 
                    "<strong>Rating: </strong>" + this.rating +
                    "</div>"
                )
                infowindow.open(map, this);
                });
            }
        }
  
    } 

    function callbackHotel(results, status) {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
            var placeIdOne = results[0].place_id;
            var placeIdTwo = results[1].place_id;
            var placeIdThree = results[2].place_id;
            var placeIdFour = results[3].place_id;
            var placeIdFive = results[4].place_id;
            var placeIdSix = results[5].place_id;
        }

        var requestOne = {
            placeId: placeIdOne,
            fields: ['name', 'rating', 'website', 'photo', 'vicinity']
        };

        var requestTwo = {
            placeId: placeIdTwo,
            fields: ['name', 'rating', 'website', 'photo', 'vicinity']
        };

        var requestThree = {
            placeId: placeIdThree,
            fields: ['name', 'rating', 'website', 'photo', 'vicinity']
        };

            var requestFour = {
            placeId: placeIdFour,
            fields: ['name', 'rating', 'website', 'photo', 'vicinity']
        };

            var requestFive = {
            placeId: placeIdFive,
            fields: ['name', 'rating', 'website', 'photo', 'vicinity']
        };

            var requestSix = {
            placeId: placeIdSix,
            fields: ['name', 'rating', 'website', 'photo', 'vicinity']
        };

        service = new google.maps.places.PlacesService(map);
        service.getDetails(requestOne, callbackPlaceOne);
        service.getDetails(requestTwo, callbackPlaceTwo);
        service.getDetails(requestThree, callbackPlaceThree);
        service.getDetails(requestFour, callbackPlaceFour);
        service.getDetails(requestFive, callbackPlaceFive);
        service.getDetails(requestSix, callbackPlaceSix);
        
        function callbackPlaceOne(results, status){
            if (status == google.maps.places.PlacesServiceStatus.OK) {
                var place = results;
                $('#hotelNameOne').text(place.name);
                $('#hotelAddressOne').text(place.vicinity);
                $('#hotelBookOne').attr("href", place.website);
                $('#hotelImageOne').attr("src", place.photos[0].getUrl({maxWidth: 300, maxHeight: 300}));
                if (place.rating) {
                    var ratingHtml = '';
                    for (var i = 0; i < 5; i++) {
                        if (place.rating < (i + 0.5)) {
                            ratingHtml += '<i class="far fa-star"></i>'
                        } else {
                            ratingHtml += '<i class="fas fa-star"></i>'
                        }
                        $('#hotelRatingOne').html(ratingHtml);
                    }
                } 
            }
        }

        function callbackPlaceTwo(results, status){
            if (status == google.maps.places.PlacesServiceStatus.OK) {
                var place = results;
                $('#hotelNameTwo').text(place.name);
                $('#hotelAddressTwo').text(place.vicinity);
                $('#hotelBookTwo').attr("href", place.website);
                $('#hotelImageTwo').attr("src", place.photos[0].getUrl({maxWidth: 300, maxHeight: 300}));
                if (place.rating) {
                    var ratingHtml = '';
                    for (var i = 0; i < 5; i++) {
                        if (place.rating < (i + 0.5)) {
                            ratingHtml += '<i class="far fa-star"></i>'
                        } else {
                            ratingHtml += '<i class="fas fa-star"></i>'
                        }
                        $('#hotelRatingTwo').html(ratingHtml);
                    }
                } 
            }
        }

        function callbackPlaceThree(results, status){
            if (status == google.maps.places.PlacesServiceStatus.OK) {
                var place = results;
                $('#hotelNameThree').text(place.name);
                $('#hotelAddressThree').text(place.vicinity);
                $('#hotelBookThree').attr("href", place.website);
                $('#hotelImageThree').attr("src", place.photos[0].getUrl({maxWidth: 300, maxHeight: 300}));
                if (place.rating) {
                    var ratingHtml = '';
                    for (var i = 0; i < 5; i++) {
                        if (place.rating < (i + 0.5)) {
                            ratingHtml += '<i class="far fa-star"></i>'
                        } else {
                            ratingHtml += '<i class="fas fa-star"></i>'
                        }
                        $('#hotelRatingThree').html(ratingHtml);
                    }
                } 
            }
        }

        function callbackPlaceFour(results, status){
            if (status == google.maps.places.PlacesServiceStatus.OK) {
                var place = results;
                $('#hotelNameFour').text(place.name);
                $('#hotelAddressFour').text(place.vicinity);
                $('#hotelBookFour').attr("href", place.website);
                $('#hotelImageFour').attr("src", place.photos[0].getUrl({maxWidth: 300, maxHeight: 300}));
                if (place.rating) {
                    var ratingHtml = '';
                    for (var i = 0; i < 5; i++) {
                        if (place.rating < (i + 0.5)) {
                            ratingHtml += '<i class="far fa-star"></i>'
                        } else {
                            ratingHtml += '<i class="fas fa-star"></i>'
                        }
                        $('#hotelRatingFour').html(ratingHtml);
                    }
                } 
            }
        }
    
        function callbackPlaceFive(results, status){
            if (status == google.maps.places.PlacesServiceStatus.OK) {
                var place = results;
                $('#hotelNameFive').text(place.name);
                $('#hotelAddressFive').text(place.vicinity);
                $('#hotelBookFive').attr("href", place.website);
                $('#hotelImageFive').attr("src", place.photos[0].getUrl({maxWidth: 300, maxHeight: 300}));
                if (place.rating) {
                    var ratingHtml = '';
                    for (var i = 0; i < 5; i++) {
                        if (place.rating < (i + 0.5)) {
                            ratingHtml += '<i class="far fa-star"></i>'
                        } else {
                            ratingHtml += '<i class="fas fa-star"></i>'
                        }
                        $('#hotelRatingFive').html(ratingHtml);
                    }
                } 
 
            }
        }

        function callbackPlaceSix(results, status){
            if (status == google.maps.places.PlacesServiceStatus.OK) {
                var place = results;
                $('#hotelNameSix').text(place.name);
                $('#hotelAddressSix').text(place.vicinity);
                $('#hotelBookSix').attr("href", place.website);
                $('#hotelImageSix').attr("src", place.photos[0].getUrl({maxWidth: 300, maxHeight: 300}));
                if (place.rating) {
                    var ratingHtml = '';
                    for (var i = 0; i < 5; i++) {
                        if (place.rating < (i + 0.5)) {
                            ratingHtml += '<i class="far fa-star"></i>'
                        } else {
                            ratingHtml += '<i class="fas fa-star"></i>'
                        }
                        $('#hotelRatingSix').html(ratingHtml);
                    }
                } 
    
            }
        }
        
  
    } 
    modalMap();
}

/* Image Slider for Landing Page */

$(function () {
    var image = $('.callout-container')

    var backgrounds = [
      'url(https://images.unsplash.com/photo-1501721836078-1a3678487370?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80) no-repeat center', 
      'url(https://images.unsplash.com/photo-1563293815-7d1c589bd909?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1502&q=80) no-repeat center'];
    var current = 0;

    function nextBackground() {
        image.css('background',
        backgrounds[current = ++current % backgrounds.length])

        setTimeout(nextBackground, 6000);
    }
    setTimeout(nextBackground, 6000);
    image.css('background', backgrounds[0])
});
    