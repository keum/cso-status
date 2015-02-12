var map, layerControl, rsidebar, lsidebar, drawControl, drawnItems = null;
var autocompdata = [];

$(document).ready(function() {

    var map = L.map('map', {maxZoom: 22}).setView([47.619124, -122.3272], 12);

    var featureLayer = L.mapbox.featureLayer()
        .loadURL('/data_display/cso_test_file.geojson')
       .addTo(map);

    featureLayer.eachLayer(function(layer) {

    // here you call `bindPopup` with a string of HTML you create - the feature
    // properties declared above are available under `layer.feature.properties`
    .bindPopup('<table><tr><td><strong>'+feature.properties.CSO_TagName+' '+feature.properties.DSN+' '+feature.properties.Name+'</strong></td></tr><tr><td>'+feature.properties.description+': '+feature.properties.Time_stamp+'</td></tr></table>')
 });



    var southWest = L.latLng(48.039701, -122.409571),
    northEast = L.latLng(48.040085, -122.405913),
    bounds = L.latLngBounds(southWest, northEast);

    //var tileLayer = L.tileLayer('/gisdata/tiles/langley-2nd-street-2014/{z}/{x}/{y}.png', {foo: 'bar', tms: true, minZoom:1, maxZoom:22, bounds:bounds}).addTo(map);

    layerControl = L.control.layers({
        'Base Map': L.mapbox.tileLayer('examples.map-i87786ca').addTo(map),
        'Grey Map': L.mapbox.tileLayer('examples.map-20v6611k')
    }, {
       // "Quadcopter Stitch": tileLayer,
        "CSO Status": featureLayer
    },{'collapsed': false});

    layerControl.addTo(map);

/*
    // Test getting layers
    $.getJSON( "/gisdata/geojson/filelist.json").done(function( data ) {
        proj4defs = data;
        $.each( data, function( key, val ) {
            for( var indx = 0; indx < val.length; indx ++ ){
                var filename = val[indx];
                autocompdata.push({label:filename,value:filename})
            }
        });
        $( "#projection" ).autocomplete({
            source: autocompdata,
            minLength: 0,
            select: function( event, ui ) {
                var filename = ui.item.value;
                var featureLayer = L.mapbox.featureLayer()
                    .loadURL('/gisdata/geojson/'+filename)
                    .addTo(map);
                layerControl.addOverlay(featureLayer,filename);
                // Try to remove from autocomplete list
                for( var indx = 0; indx < autocompdata.length; indx++ ){
                    if (autocompdata[indx].value == filename) {
                        var index = autocompdata.indexOf(filename);
                        autocompdata.splice(indx, 1);
                        $( "#projection" ).autocomplete( "option", "source", autocompdata);

                    }
                }
                return false;
            }
        }).val('');
        $('#projection').on( 'click', function(evt){
             $( "#projection" ).autocomplete(  "search", "" );
        });
    }).fail(function( jqxhr, textStatus, error ) {
        var err = textStatus + ", " + error;
        console.log( "Request Failed: " + err );
    });
*/
});
