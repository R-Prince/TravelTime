
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
  modalAttractions(51.509865,-0.118092)
    
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
  modalAttractions(21.17429, -86.84656)

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
  modalAttractions(36.393154, 25.461510)
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
  modalAttractions(27.994402, -81.760254)
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
  modalAttractions(17.99702, -76.79358)
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
  modalAttractions(-8.409518, 115.188919)
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


    