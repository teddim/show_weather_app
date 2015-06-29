function jsonFlickrFeed(data) {
  var url = data.items[4].media.m;
  url = url.split('_m').join('');
  console.log(url);
  $('html').css("background-image", "url(" + url + ")");

}
$(document).ready(function(){

    $.ajax({
    dataType: 'jsonp',
    url: "http://www.flickr.com/services/feeds/photos_public.gne?tags=spring_flowers&format=json",
    jsonpCallback: "jsonFlickrFeed",
    context: document.body
    }).done(function(data) {
    });

    $.ajax({
    // dataType: 'jsonp',
    url: "http://api.openweathermap.org/data/2.5/weather?q=boulder,co",
    context: document.body
    }).done(function(data) {
      console.log(data.weather[0].description);
      var weather = data.weather[0].description;
      $('.weather').append(weather);
    });

    $.ajax({
    url: "http://www.jsonip.com",
    context: document.body
    }).done(function(data) {
      console.log(data);

      $('.ip').append(data.ip);
    });

    $.ajax({
    url: "http://www.telize.com/geoip?",
    context: document.body
    }).done(function(data) {
      console.log(data);
      $('.long').append(data.longitude);
      $('.lat').append(data.latitude);
    });

    var frm = $('#location_form');
    frm.submit(function (ev) {
        $.ajax({
            type: frm.attr('method'),
            url: frm.attr('action'),
            data: frm.serialize(),
            success: function (data) {
              console.log("form:", data);
              var url = "http://api.openweathermap.org/data/2.5/weather?q=" + data;
                $.ajax({
                url: url,
                context: document.body
                }).done(function(data) {
                  var weather;
                  if (data.cod === "404") {
                    weather = "City Not Found";
                  } else {
                    weather = data.weather[0].description;
                  }
                  $('.weather').html(weather);
                });
            }
        });

        ev.preventDefault();
    });

})
