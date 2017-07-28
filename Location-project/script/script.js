
$(document).ready(function(){
  $("#btnPrompt").on("click", function(){
    $(".prompt").toggle();
  });
  $(".close-btn").on("click", function(){
    $(".prompt").css("display", "none");
  });
  $(".find-location").hover(function(){
    $(this).css("background-color", "#0c99c8")
    $(".hide-menu").css("display", "block");
    console.log("find-location");
  });
  $(".hide-menu").mouseleave(function(event) {
    $(this).css("display", "none");
    $(".find-location").css("background-color", "#04264c");
  });
  $("nav").mouseleave(function(){
    $(".find-location").css("background-color", "#04264c");
    $(".hide-menu").css("display", "none");
  });
});

function initMap() {
  var locations = [
    ['Da Lat', 11.94646, 108.44193, 6],
    ['Nha Trang', 12.24507, 109.19432, 5],
    ['Tuy Hoa', 13.09546, 109.32094, 4],
    ['Buon Me Thuoc', 12.66747, 108.03775, 3],
    ['Pleiku', 13.98333, 108, 2],
    ['Quy Nhon', 13.77648, 109.22367, 1]
  ];
  var name, address;
  var map = new google.maps.Map(document.getElementById('googleMap'), {
    zoom: 7,
    center: new google.maps.LatLng(13.09546, 109.32094),
    mapTypeId: google.maps.MapTypeId.ROADMAP
  });
  var infowindow = new google.maps.InfoWindow();
  var markers, i;

  for (i = 0; i < locations.length; i++) {
    markers = new google.maps.Marker({
      position: new google.maps.LatLng(locations[i][1], locations[i][2]),
      map: map,
      animation: google.maps.Animation.BOUNCE

    });

    google.maps.event.addListener(markers, 'click', (function(marker, i) {
      return function() {
        infowindow.setContent(locations[i][0]);
        infowindow.open(map, markers);
      }
    })(markers, i));
  }

  var input = document.getElementById('locationTextField');
  var searchBox = new google.maps.places.SearchBox(input);
  console.log(searchBox);
  var markers = [];
  searchBox.addListener('places_changed', function() {
    var places = searchBox.getPlaces();
    console.log(places);

    if (places.length == 0) {
      return;
    }

    // Clear out the old markers.
    markers.forEach(function(marker) {
      marker.setMap(null);
    });
    markers = [];

    // For each place, get the icon, name and location.
    var bounds = new google.maps.LatLngBounds();
    places.forEach(function(place) {
      if (!place.geometry) {
        console.log("Returned place contains no geometry");
        return;
      }
      // Create a marker for each place.
      markers.push(new google.maps.Marker({
        map: map,
        title: place.name,
        animation: google.maps.Animation.BOUNCE,
        position: place.geometry.location
      }));
      name = place.name;
      address = place.formatted_address;
      if (place.geometry.viewport) {
        // Only geocodes have viewport.
        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }
    });

    map.fitBounds(bounds);
    var html1 = "", html3 = "",html2 = "";
        html1 += "<div class='location-detail'>";
        html1 += "<div class='row'>";
        html1 += "<div class='col-md-7 name-location'>";
        html2 += " </div>";
        html2 += "<div class='col-md-7 address-location col-md-offset-1'>";
        html3 += "</div>";
        html3 += "<div class='col-md-6 see-map col-md-offset-2'>";
        html3 += " <p>See Location</p><span><i>01</i></span>";
        html3 += "</div>";
        html3 += "</div>";
        html3 += "</div>";
    $("div.location-info").append(html1 + "<p>" + name + "</p>" + html2 + "<p>" + address + "</p>" + html3);
  });
}
