document.getElementById("autocomplete").addEventListener("click", startAuto);
var autocomplete;

// Google autocomplete api for search bar
function startAuto(){
    autocomplete = new google.maps.places.Autocomplete(
        (document.getElementById('autocomplete')), {
        types: ['(cities)']}
    );
    autocomplete.addListener('place_changed', placeSearch);
}

// Google Maps API - Open modal and returns a city and map based on users search. 
function placeSearch(){
    var place = autocomplete.getPlace();
    var lat = place.geometry.location.lat();
    var lng = place.geometry.location.lng();

    $('#modal-page').modal('show');
    $('#modal-auto-header').text(place.name);
    $('#modal-auto-country').text(place.formatted_address);
    
    autoMap(lat,lng);
}

// Google Maps API - Opens a map on the modal based on the city selected and returns tourist attractions
function autoMap(lat,lng) {
    var city = new google.maps.LatLng(lat,lng);
    map = new google.maps.Map(document.getElementById('mapAuto'), {
        center: city,
        zoom: 16
    });

    var hotels = {location: city,radius: '500',type: ['lodging']};
    var attractions = {location: city,radius: '500',type: ['museum']};
    var interests = {location: city,radius: '500',type: ['point_of_interest']};
 
    var service = new google.maps.places.PlacesService(map);
    service.nearbySearch(interests, callback);
    service.nearbySearch(attractions, attrResults);
    service.nearbySearch(hotels, hotelResults);
}

// Assign custom icon to markers on the map
function getIcon(type){
    switch (type){
        case "lodging":
        return urlIcon = "https://www.flaticon.com/svg/static/icons/svg/897/897061.svg";
        

        case "restaurant":
        return urlIcon = "https://www.flaticon.com/svg/static/icons/svg/3556/3556680.svg"; 
        

        case "bar":
        return urlIcon = "https://www.flaticon.com/svg/static/icons/svg/761/761767.svg"; 
        

        case "spa":
        return urlIcon = "https://www.flaticon.com/svg/static/icons/svg/2751/2751542.svg"; 
        

        case "night_club":
        return urlIcon = "https://www.flaticon.com/svg/static/icons/svg/3093/3093998.svg"; 
        
        case "shopping_mall":
        return urlIcon = "https://www.flaticon.com/svg/static/icons/svg/831/831209.svg";
        

        case "point_of_interest":
        return urlIcon = "https://www.flaticon.com/svg/static/icons/svg/883/883746.svg";
        

        default:
        return urlIcon = "https://www.flaticon.com/svg/static/icons/svg/944/944551.svg";
    }
}

// Google Maps API - Callback function that drops markers on the map which are tourist attractions in the city
function callback(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
            var place = results[i];
            var type = place.types[0];
            
            // Custom icons for markers on the map
            getIcon(type);

            var image = {
                url: urlIcon,
                size: new google.maps.Size(65, 65),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(17, 34),
                scaledSize: new google.maps.Size(25, 25),
            };

            var marker = new google.maps.Marker({
                map: map,
                animation: google.maps.Animation.DROP,
                position: place.geometry.location,
                name: place.name,
                address: place.vicinity,
                rating: place.rating,
                icon: image
            });

            var infowindow = new google.maps.InfoWindow({
                maxWidth: 300
            });

            // Open information window about marker on Google Map
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

// Google Place API - Using place ids this function returns information on the attractions used for the cards
function attrResults(results, status){
    if (status == google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 1; i < 4; i++) {
            var placeIds = results[i].place_id;
            var request = {
                placeId: placeIds,
                fields: ['name', 'rating', 'website', 'photo', 'vicinity']
            };
            var service = new google.maps.places.PlacesService(map);
            service.getDetails(request, attrCards);  
        }
    } 
}

// Google Place API - Using place ids this function returns information on the hotels used for the cards
function hotelResults(results, status){
    if (status == google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 1; i < 7; i++) {
            var placeIds = results[i].place_id;
            var request = {
                placeId: placeIds,
                fields: ['name', 'rating', 'website', 'photo', 'vicinity']
            };
            var service = new google.maps.places.PlacesService(map);
            service.getDetails(request, hotelCards);  
        }
    }    
}

// Google Place API - This function uses the information returned from the search and creates html hotel cards
function hotelCards(results, status){
    if (status == google.maps.places.PlacesServiceStatus.OK) {
        var place = results;
        // Check if rating is available
        if(place.rating) {var ratingHtml = '';
            for (var i = 0; i < 5; i++) {
                if (place.rating < (i + 0.5)) {
                    ratingHtml += '<i class="far fa-star"></i>';
                } else {
                    ratingHtml += '<i class="fas fa-star"></i>';
                }
            }
        } else{
            var ratingHtml = "Not Available";
        }
        
        // Check if a google photo is available if not return generic image
        if(("photos" in place) == true){
            var image = place.photos[0].getUrl({maxWidth: 300, maxHeight: 300});
        } else{
            var image = "https://images.unsplash.com/photo-1496417263034-38ec4f0b665a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1502&q=80";
        }

        // Check if a google website is available if not return generic image
        if(("website" in place) == true){
            var website = place.website;
        } else{
            var website = "https://r-prince.github.io/TravelTime/";
        }
        
        $("#hotelCards").append(
        `<div class="col-12 col-lg-4 mb-3">
            <div class="card">
                <img src=${image} class="hotel-image img-fluid card-img-top" alt="Image of the hotel">
                <div class="card-body text-center">
                    <ul class="card-list">
                        <li class="card-item font-weight-bolder">${place.name}</li>
                        <li  class="card-item">${place.vicinity}</li>  
                    </ul>
                    <hr class="card-hr">
                    <ul class="card-list">
                        <li class="card-item">${ratingHtml}</li>
                    </ul>
                        <a href=${website} target="_blank" class="btn btn-orange">Visit Website</a>
                </div>
            </div>
        </div>`);
    }
}

// Google Place API - This function uses the information returned from the search and creates html attraction cards
function attrCards(results, status){
    if (status == google.maps.places.PlacesServiceStatus.OK) {
        var place = results;
        if(place.rating) {var ratingHtml = '';
            for (var i = 0; i < 5; i++) {
                if (place.rating < (i + 0.5)) {
                    ratingHtml += '<i class="far fa-star"></i>';
                } else {
                    ratingHtml += '<i class="fas fa-star"></i>';
                }
            }
        } else{
            var ratingHtml = "Not Available";
        }

        // Check if a google photo is available if not return generic image
        if(("photos" in place) == true){
            var image = place.photos[0].getUrl({maxWidth: 300, maxHeight: 300});
        } else{
            var image = "https://images.unsplash.com/photo-1416397202228-6b2eb5b3bb26?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1494&q=80";
        }

        // Check if a google website is available if not return generic image
        if(("website" in place) == true){
            var website = place.website;
        } else{
            var website = "https://r-prince.github.io/TravelTime/";
        }
        
        $("#attractionCards").append(
        `<div class="col-12 col-lg-4 mb-3">
            <div class="card">
                <img src=${image} class="hotel-image img-fluid card-img-top" alt="Image of the attraction">
                <div class="card-body text-center">
                    <ul class="card-list">
                        <li class="card-item font-weight-bolder">${place.name}</li>
                        <li  class="card-item">${place.vicinity}</li>  
                    </ul>
                    <hr class="card-hr">
                    <ul class="card-list">
                        <li class="card-item">${ratingHtml}</li>
                    </ul>
                        <a href=${website} target="_blank" class="btn btn-orange">Visit Website</a>
                </div>
            </div>
        </div>`);
    }
}

// Remove previous HTML hotel cards, ready for the next search. 
function removeCards(){
    $("#hotelCards").empty();
    $("#attractionCards").empty();
    $('#quick-guide').empty();
    $('#topPicks').empty();
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
        <img id="modal-image" src="..." alt="image of city center" class="img-fluid">
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
    </div>`);
});

$('.top-picks').click(function(){
    for (var i = 0; i < 3; i++) {
        $('#topPicks').append(
            `<div class="col-12 col-lg-4 mb-3">
                <div class="card">
                    <img src="..." class="hotel-image img-fluid card-img-top${i}" alt="Image of the hotel">
                    <div class="card-body text-center">
                        <ul class="card-list">
                            <li class="card-item hotelName${i} font-weight-bolder"></li>
                            <li  class="card-item hotelAddress${i}"></li>  
                        </ul>
                        <hr class="card-hr">
                        <ul class="card-list">
                            <li class="hotelText card-item">TRAVEL TIME PICK <i class="fas fa-medal"></i></li>
                            <li class="card-item"><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i></li>
                        </ul>
                            <a href="" target="_blank" class="hotelWebsite${i} btn btn-orange">Book Now</a>
                    </div>
                </div>
            </div>`
        );
    }
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
    $('#modal-image').attr("src","https://images.unsplash.com/photo-1520175480921-4edfa2983e0f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1494&q=80");
    $('.card-img-top0').attr("src","https://images.unsplash.com/photo-1572166292333-4dd297b6409d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80");
    $('.card-img-top1').attr("src","https://images.unsplash.com/photo-1594560913036-d15f23f8a91c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1498&q=80");
    $('.card-img-top2').attr("src","https://images.unsplash.com/photo-1556455420-3305b8256448?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80");
    $('.hotelName0').text("Ca'Pagan");
    $('.hotelName1').text("Palazzo Veneziano");
    $('.hotelName2').text("H10 Palazzo Canova");
    $('.hotelAddress0').text("Calle de le Carozze");
    $('.hotelAddress1').text("Fondamenta Zattere Al Ponte");
    $('.hotelAddress2').text("744 Riva del Vin, San Polo");
    $('.hotelWebsite0').attr("href","https://www.capagan.com/?utm_source=google&utm_medium=organic&utm_campaign=GoogleMyBusiness");
    $('.hotelWebsite1').attr("href","https://www.blastnessbooking.com/reservations/risultato.html?lingua_int=eng&id_albergo=16429&id_stile=14017&id_gruppo=18451&dc_gruppo=2543&dc=6131&gg=25&mm=9&aa=2020&a_date=25%2F09%2F2020&notti_1=1&tot_camere=1&tot_adulti=2&tot_bambini=0&generic_codice=&_gfc_cli=16010414769248914&_ga=2.267384142.1792683260.1601041491-662343565.1601041491");
    $('.hotelWebsite2').attr("href","https://www.h10hotels.com/en/venice-hotels/h10-palazzo-canova/rooms");
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
  $('#modal-image').attr("src","https://images.unsplash.com/photo-1528800223624-764941bb49db?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1466&q=80");
  $('.card-img-top0').attr("src","https://images.unsplash.com/photo-1570213489059-0aac6626cade?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80");
  $('.card-img-top1').attr("src","https://images.unsplash.com/photo-1560662105-57f8ad6ae2d1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80");
  $('.card-img-top2').attr("src","https://images.unsplash.com/photo-1529290130-4ca3753253ae?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1510&q=80");
  $('.hotelName0').text("Meriton Suites");
  $('.hotelName1').text("Shangri-La Hotel");
  $('.hotelName2').text("Sydney Boutique Hotel");
  $('.hotelAddress0').text("528 Kent St, Sydney");
  $('.hotelAddress1').text("176 Cumberland St, The Rocks");
  $('.hotelAddress2').text("114 Darlinghurst Rd, Darlinghurst");
  $('.hotelWebsite0').attr("href","https://www.meritonsuites.com.au/");
  $('.hotelWebsite1').attr("href","https://www.shangri-la.com/en/sydney/shangrila/reservations/select-room-rate/?hotel=Shangri-La%20Hotel%2C%20Sydney&hotelCode=SLSN&timeZone=%2B10&city=Sydney&checkInDate=2020-09-26&checkOutDate=2020-09-27&rooms=%5B%7B%22adultNum%22%3A1%2C%22childNum%22%3A0%7D%5D&confirmationNo=&specialCode=&specialCodeType=&country=&specialCodeToken=");
  $('.hotelWebsite2').attr("href","https://hotels.cloudbeds.com/reservation/CCGWUs#checkin=2020-09-25&checkout=2020-09-26");
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
  $('#modal-image').attr("src","https://images.unsplash.com/photo-1477173860144-6f21cf27086a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80");
  $('.card-img-top0').attr("src","https://images.unsplash.com/photo-1571275293295-7a6d0d4dadd6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1502&q=80");
  $('.card-img-top1').attr("src","https://images.unsplash.com/photo-1522010848282-9923b63eebaa?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1370&q=80");
  $('.card-img-top2').attr("src","https://images.unsplash.com/photo-1551530417-b5695ae086e5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1506&q=80");
  $('.hotelName0').text("Sheraton Centre");
  $('.hotelName1').text("Hyatt Regency Toronto");
  $('.hotelName2').text("InterContinental Toronto");
  $('.hotelAddress0').text("123 Queen St W, Toronto");
  $('.hotelAddress1').text("370 King St W, Toronto");
  $('.hotelAddress2').text("225 Front St W, Toronto");
  $('.hotelWebsite0').attr("href","https://www.marriott.com/reservation/rateListMenu.mi?defaultTab=standard");
  $('.hotelWebsite1').attr("href","https://www.hyatt.com/en-US/hotel/canada/hyatt-regency-toronto/torrt?src=corp_lclb_gmb_seo_nam_torrt");
  $('.hotelWebsite2').attr("href","https://www.ihg.com/intercontinental/hotels/us/en/toronto/yyztc/hoteldetail?cm_mmc=GoogleMaps-_-IC-_-CA-_-YYZTC");
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
  $('#modal-image').attr("src","https://images.unsplash.com/photo-1530187589563-1ff5b061d4f9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1469&q=80");
  $('.card-img-top0').attr("src","https://images.unsplash.com/photo-1445019980597-93fa8acb246c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1506&q=80");
  $('.card-img-top1').attr("src","https://images.unsplash.com/photo-1570057633591-255115b592fb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1436&q=80");
  $('.card-img-top2').attr("src","https://images.unsplash.com/photo-1416331108676-a22ccb276e35?ixlib=rb-1.2.1&auto=format&fit=crop&w=1494&q=80");
  $('.hotelName0').text("Atlanticview Boutique Hotel");
  $('.hotelName1').text("Radisson Blu Hotel Waterfront");
  $('.hotelName2').text("The Bay Hotel");
  $('.hotelAddress0').text("31 Francolin Rd, Camps Bay");
  $('.hotelAddress1').text("100 Beach Road, Granger Bay");
  $('.hotelAddress2').text("69 Victoria Rd, Camps Bay");
  $('.hotelWebsite0').attr("href","https://bookings.frontdeskanywhere.net/bookings/#/account/F140409G");
  $('.hotelWebsite1').attr("href","https://www.radissonhotels.com/en-us/booking/room-display?hotelCode=CPTZA&checkInDate=2020-09-25&checkOutDate=2020-09-26&adults%5B%5D=1&children%5B%5D=0&searchType=lowest&promotionCode=");
  $('.hotelWebsite2').attr("href","https://app.secure-reservations.com/vnlthebayhotel/properties/bayhoteldirect?_ga=2.162432060.1868858890.1601043390-791293503.1601043390&check_in_date=25-09-2020&check_out_date=26-09-2020&number_adults=2");
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
  $('#modal-image').attr("src","https://images.unsplash.com/photo-1544030134-c0883e9e4046?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1567&q=80");
  $('.card-img-top0').attr("src","https://images.unsplash.com/photo-1544030134-c0883e9e4046?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1567&q=80");
  $('.card-img-top1').attr("src","https://images.unsplash.com/photo-1489171078254-c3365d6e359f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1489&q=80");
  $('.card-img-top2').attr("src","https://images.unsplash.com/photo-1567368882212-7ed94545636f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1490&q=80");
  $('.hotelName0').text("Central Plaza");
  $('.hotelName1').text("Hotel du Théâtre");
  $('.hotelName2').text("The Dolder Grand");
  $('.hotelAddress0').text("Central 1, 8001 Zürich");
  $('.hotelAddress1').text("Seilergraben 69, 8001 Zürich");
  $('.hotelAddress2').text("Kurhausstrasse 65, 8032 Zürich");
  $('.hotelWebsite0').attr("href","https://gc.synxis.com/rez.aspx?Hotel=71148&Start=availresults&arrive=2017%2F12%2F14&depart=2017%2F12%2F15&promo=&locale=de-DE&_ga=2.213332372.1852704977.1601043763-939721344.1601043763");
  $('.hotelWebsite1').attr("href","https://gc.synxis.com/rez.aspx?chain=6357&template=FASSBIND&locale=en-US&hotel=67163&start=availresults&shell=FASSBIND&adult=2&nights=2&arrive=09/26/2020");
  $('.hotelWebsite2').attr("href","https://www.thedoldergrand.com/");
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
  $('#modal-image').attr("src","https://images.unsplash.com/photo-1580816256869-3e870e8b948f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1567&q=80");
  $('.card-img-top0').attr("src","https://images.unsplash.com/photo-1578338131652-dcca32ab1d36?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80");
  $('.card-img-top1').attr("src","https://images.unsplash.com/photo-1541480551145-2370a440d585?ixlib=rb-1.2.1&auto=format&fit=crop&w=1498&q=80");
  $('.card-img-top2').attr("src","https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80");
  $('.hotelName0').text("Almaha Marrakech");
  $('.hotelName1').text("Sofitel Marrakech Lounge");
  $('.hotelName2').text("Hotel La Maison Arabe");
  $('.hotelAddress0').text("55 Derb Ben Zina، Marrakesh");
  $('.hotelAddress1').text("Quartier De, Rue Haroun Errachid");
  $('.hotelAddress2').text("Derb Assehbi, Marrakesh");
  $('.hotelWebsite0').attr("href","https://direct-book.com/properties/AlmahaMarrakechSPADirect?checkInDate=2020-09-25&checkOutDate=2020-09-26&utm_source=GoogleHotelAds&locale=fr&currency=MAD&items[0][adults]=2&items[0][children]=0&items[0][infants]=0");
  $('.hotelWebsite1').attr("href","https://all.accor.com/ssr/app/accor/rates/3569/index.en.shtml?dateIn=2020-09-30&nights=8&compositions=1&stayplus=false");
  $('.hotelWebsite2').attr("href","https://app.thebookingbutton.com/properties/lamaisonarabedirect?locale=fr&check_in_date=25-09-2020&check_out_date=26-09-2020&number_adults=2");
});

// Open side nav bar.
function openNav() {
  document.getElementById("mySidenav").style.width = "fit-content";
  document.getElementById("main").style.marginLeft = "20vw";
}

//Set the width of the side navigation to 0 and the left margin of the page content to 0.
function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
  document.getElementById("main").style.marginLeft = "0";
}
