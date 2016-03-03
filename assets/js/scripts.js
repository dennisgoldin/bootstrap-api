$(function () {
  'use strict';

  //  console.log("Testing JavaScript functionality.");

  initialize();  // init mutiple Google Maps

  $('.clickEvent a').click(function (e) {
    e.preventDefault()
    $(this).tab('show')
  })

// initial mutiple Google Maps
function initialize()
{
    var durham = new google.maps.LatLng(35.994,-78.898);
    var apex = new google.maps.LatLng(35.732,-78.850);
    var landstuhl = new google.maps.LatLng(49.412,7.572);

    var myOptions1 =
    {
        zoom: 15,
        center: durham,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    var myOptions2 =
    {
        zoom: 15,
        center: apex,
        mapTypeId: google.maps.MapTypeId.HYBRID
    };

    var myOptions3 =
    {
        zoom: 15,
        center: landstuhl,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    var myMap1 = new google.maps.Map(document.getElementById("map1"), myOptions1);
    var myMap2 = new google.maps.Map(document.getElementById("map2"), myOptions2);
    var myMap3 = new google.maps.Map(document.getElementById("map3"), myOptions3);


    var myMarker1 = new google.maps.Marker(
    {
        position: durham,
        map: myMap1,
        title:"Durham"
    });

    var myMarker2 = new google.maps.Marker(
    {
        position: apex,
        map: myMap2,
        title:"Apex"
    });

    var myMarker3 = new google.maps.Marker(
    {
        position: landstuhl,
        map: myMap3,
        title:"Landstuhl"
    });
  }

// Open Weather Map API Current Weather - need to pair with correct template
// var apiString = "http://api.openweathermap.org/data/2.5/weather?" +
//                 "id=4464368" +    // Durham, NC, US
//                 "&cnt=1" +        // 1 record from 5 Day, 3 Hour Forecast
//                 "&APPID=82f61d5df7730f4b96d58ed8e8aa6b63";

  // Open Weather Map API Forecast
  var apiString = "http://api.openweathermap.org/data/2.5/forecast/daily?" +
                  "id=4464368" +    // Durham, NC, US
                  "&cnt=1" +        // 1 record from 5 Day, 3 Hour Forecast
                  "&APPID=82f61d5df7730f4b96d58ed8e8aa6b63";

  $.getJSON((apiString), function (value) {

    // console.log(apiString);
    // console.log(value);

    var myUserTemp = _.template("<%- m.name %> "
                              + "<%- m.date %> "
                              + "<%- m.count %> "
                              + "<%- m.dayTemp %> "
                              + "<%- m.minTemp %> "
                              + "<%- m.maxTemp %> "
                              + "<%- m.pressure %> "
                              + "<%- m.humity %> "
                              + "<%- m.weatherType %> "
                              + "<%- m.weatherDesc %> ", {variable: "m"});

    console.log(myUserTemp({ name: value.city.name }));
    console.log(myUserTemp({ name: value.list[0].dt }));
    console.log(myUserTemp({ name: value.cnt }));
    console.log(myUserTemp({ name: value.list[0].temp.min }));
    console.log(myUserTemp({ name: value.list[0].temp.max }));
    console.log(myUserTemp({ name: value.list[0].temp.day }));
    console.log(myUserTemp({ name: value.list[0].pressure }));
    console.log(myUserTemp({ name: value.list[0].humidity }));
    console.log(myUserTemp({ name: value.list[0].weather[0].main }));
    console.log(myUserTemp({ name: value.list[0].weather[0].description }));

    var minTemp = myUserTemp({ name: value.list[0].temp.min});
    $(".minTemp").html(parseInt(minTemp.split(".")[1], 10) + "&deg;F");
    var maxTemp = myUserTemp({ name: value.list[0].temp.max});
    $(".maxTemp").html(parseInt(maxTemp.split(".")[1], 10) + "&deg;F");
    var dayTemp = myUserTemp({ name: value.list[0].temp.day});
    $(".dayTemp").html(parseInt(dayTemp.split(".")[1], 10) + "&deg;F");
    var pressure = myUserTemp({ name: value.list[0].pressure});
    $(".pressure").html(pressure.split(".")[1]+ "hPa");
    $(".humidity").html(myUserTemp({ name: value.list[0].humidity}) + "%");
    $(".weatherType").html(myUserTemp({ name: value.list[0].weather[0].main}));
    $(".weatherDesc").html(myUserTemp({ name: value.list[0].weather[0].description}));
  });   // end JSON


});  // End of file.
