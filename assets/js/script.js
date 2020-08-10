function initMap() {
  const myLatLng = {lat: 15, lng: 0};
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 2,
    center: myLatLng
  });

}