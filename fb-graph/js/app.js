dojo.require("esri.map");
//map;
function init() {
    map = new esri.Map("map", {
        center: [-140, 50],
        zoom: 3,
        basemap: "streets"
      });
    dojo.connect(map, 'onLoad', function (map) {});
}
dojo.addOnLoad(init);
function search(){
    var searchText = $('#searchText').val();
    var url = 'https://graph.facebook.com/search?q='+searchText+'&type=place&access_token=AAAAAAITEghMBAPKgxS8untlBWAXyTZBX90jx2V7P1LyMd5RN5KDp7XWZCOyxMVR8GGZB81osGM1ZArkdU2GJYAAmMmLD3jeZCnhySW8ZBDkYx9EWncyK54';
    $.getJSON(url, function(data){
        $.each(data.data, function(key, val) {
            //val.location.latitude+':'+val.location.longitude
            //var map = $('#map').first();
            var pointSymbol = new esri.symbol.SimpleMarkerSymbol(esri.symbol.SimpleMarkerSymbol.STYLE_SQUARE, 7,
              new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID,
              new dojo.Color([255, 0, 0]), 1),
              new dojo.Color([255, 0, 0, 0.75]));
            var attributes = {"Lat":val.location.latitude,"Lon":val.location.longitude,"name":val.name};
            var infoTemplate = new esri.InfoTemplate("My Point","Latitude: ${Lat} <br/>Longitude: ${Lon}<br/>Name: ${name}");

            var wmPoint = ToWebMercator(val.location.latitude, val.location.longitude);

            var graphic = new esri.Graphic(new esri.geometry.Point(wmPoint,new esri.SpatialReference({ wkid: 102100 })),pointSymbol,attributes,infoTemplate);
            map.graphics.add(graphic);
        });
    });
}
function ToWebMercator(lon, lat){
    var num = lat * 0.017453292519943295;
    var x = 6378137.0 * num;
    var a = lon * 0.017453292519943295;
    lat = x;
    lon = 3189068.5 * Math.log((1.0 + Math.sin(a)) / (1.0 - Math.sin(a)));
    return [lat, lon];
}

