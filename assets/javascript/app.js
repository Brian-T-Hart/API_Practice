var clicks = 0;
  var city = "";
  var state = "";
  var APIKey = "fca2f1b7b00d12acd9b02cd47d5cd0f3";
  var tzAPIKey = "WYSMLFFHV5MT";
  // var longitude = -117.9;
  // var latitude = 33.92;

  $(document).ready(function() {
    event.preventDefault();
    if (clicks === 0) {
      city = "Brea";
      state = "California";
      var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "," + state + "&appid=" + APIKey;

      $.ajax({
          url: queryURL,
          method: "GET"
        }).done(function(response) {
          console.log(response);
          var k = response.main.temp;
          var x = (9/5) * (k - 273) + 32;
          var temp = Math.round(x);
          $('#cityDisplay').html(response.name);
          $('#tempDisplay').html(temp + '&#8457');
          $('#humidityDisplay').html(response.main.humidity + '%');
          $('#windDisplay').html(response.wind.speed);
      });
    }
    else {
      console.log('city is not Brea!');
    }
  });

$("#submitButton").click(function() {
      event.preventDefault();
      clicks++;
      city = $('#cityName').val();
      state = $('#stateName').val();
      var search = city + state;
      var map = '<iframe width="600" height="450" frameborder="0" style="border:0" src="https://www.google.com/maps/embed/v1/place?key=AIzaSyDVZWMtxcCp39mek9w3shj-1r735OwHvak&q=' + search + '" allowfullscreen></iframe>';
      $('#map').html(map);

      queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "," + state + "&appid=" + APIKey;

      $.ajax({
      url: queryURL,
      method: "GET"
    }).done(function(response) {
      console.log(response);
      var k = response.main.temp;
      var x = (9/5) * (k - 273) + 32;
      var temp = Math.round(x);
      latitude = response.coord.lat;
      longitude = response.coord.lon;
      console.log('latitude = ' + latitude);
      console.log('longitude = ' + longitude);
      var tzqueryURL = "http://api.timezonedb.com/v2/get-time-zone?key=WYSMLFFHV5MT&format=json&by=position&lat=" + latitude + "&lng=" + longitude;
      console.log(tzqueryURL);
      $('#cityDisplay').html(response.name);
      $('#tempDisplay').html(temp + '(F)');
      $('#humidityDisplay').html(response.main.humidity + '%');
      $('#windDisplay').html(response.wind.speed);
      $('#cityName').val("");
      $('#stateName').val("");

      
      // $.ajax({
      // url: tzqueryURL,
      // method: "GET"
      // }).done(function(tzresponse) {
      // console.log(tzresponse);
      // console.log(tzresponse.timestamp);
      // console.log(tzresponse.formatted);
      // var timeStamp = moment.unix(tzresponse.timestamp).format('h:mm:ss A');
      // console.log('timeStamp = ' + timeStamp);
      // var e = new Date();
      // console.log(e);
      
      // }); 
  });
});
function displayTime() {
  setInterval(function currentTime() {
  var t = moment().format('h:mm:ss A');
  $('#timeDisplay').html(t);
        }, 1000);
  };

displayTime();