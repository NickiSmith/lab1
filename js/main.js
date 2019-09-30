/* Leaflet Lab Map (Lab 1) */

//function to instantiate the Leaflet map
function createMap() {  
    
    //create Stamen Terrain base tilelayer
    var terrain = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}{r}.{ext}', {
        attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &mdash; Observation Data provided by <a href="https://ebird.org/home">eBird</a>  -- origami bird by Symbolon from the Noun Project',
        subdomains: 'abcd',
        minZoom: 0,
        maxZoom: 18,
        ext: 'png'
    })
    
    var toner = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}{r}.{ext}', {
        attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &mdash; Observation Data provided by <a href="https://ebird.org/home">eBird</a>  -- origami bird by Symbolon from the Noun Project',
        subdomains: 'abcd',
        minZoom: 0,
        maxZoom: 18,
        ext: 'png'
    })
    
    //create test marker layer
     var Alexandria=L.marker([38.80472, -77.04722]).bindPopup('Alexandria'),
Allentown=L.marker([40.60833, -75.49056]).bindPopup('Allentown'),
Arlington=L.marker([38.89028, -77.08444]).bindPopup('Arlington'),
Athens=L.marker([33.96083, -83.37806]).bindPopup('Athens'),
Atlanta=L.marker([33.74889, -84.38806]).bindPopup('Atlanta'),
Augusta=L.marker([33.47083, -81.975]).bindPopup('Augusta'),
Baltimore=L.marker([39.29028, -76.6125]).bindPopup('Baltimore'),
Boston=L.marker([42.35833, -71.06028]).bindPopup('Boston'),
Brandon=L.marker([27.9375, -82.28611]).bindPopup('Brandon'),
Bridgeport=L.marker([41.16694, -73.20528]).bindPopup('Bridgeport'),
Buffalo=L.marker([42.88639, -78.87861]).bindPopup('Buffalo'),
Cambridge=L.marker([42.375, -71.10611]).bindPopup('Cambridge'),
CapeCoral=L.marker([26.5625, -81.94972]).bindPopup('Cape Coral'),
Cary=L.marker([35.79139, -78.78139]).bindPopup('Cary'),
Charleston=L.marker([32.77639, -79.93111]).bindPopup('Charleston'),
Charlotte=L.marker([35.22694, -80.84333]).bindPopup('Charlotte'),
Chesapeake=L.marker([36.81889, -76.27528]).bindPopup('Chesapeake'),
Clearwater=L.marker([27.96556, -82.80028]).bindPopup('Clearwater'),
Columbia=L.marker([39.24028, -76.83972]).bindPopup('Columbia'),
Columbia=L.marker([34.00056, -81.035]).bindPopup('Columbia'),
Columbus=L.marker([32.46083, -84.98778]).bindPopup('Columbus'),
CoralSprings=L.marker([26.27083, -80.27083]).bindPopup('Coral Springs'),
Durham=L.marker([35.99389, -78.89889]).bindPopup('Durham'),
Erie=L.marker([42.12917, -80.08528]).bindPopup('Erie'),
Fayetteville=L.marker([35.0525, -78.87861]).bindPopup('Fayetteville'),
FortLauderdale=L.marker([26.12194, -80.14361]).bindPopup('Fort Lauderdale'),
Gainesville=L.marker([29.65139, -82.325]).bindPopup('Gainesville'),
Greensboro=L.marker([36.0725, -79.79222]).bindPopup('Greensboro'),
Hampton=L.marker([37.02972, -76.34556]).bindPopup('Hampton'),
Hartford=L.marker([41.76361, -72.68556]).bindPopup('Hartford'),
Hollywood=L.marker([26.01083, -80.14972]).bindPopup('Hollywood'),
Jacksonville=L.marker([30.33194, -81.65583]).bindPopup('Jacksonville'),
JerseyCity=L.marker([40.72806, -74.07806]).bindPopup('Jersey City'),
Lowell=L.marker([42.63333, -71.31667]).bindPopup('Lowell'),
Manchester=L.marker([42.99556, -71.45528]).bindPopup('Manchester'),
Miami=L.marker([25.77389, -80.19389]).bindPopup('Miami'),
NewHaven=L.marker([41.30806, -72.92861]).bindPopup('New Haven'),
NewYork=L.marker([40.71417, -74.00639]).bindPopup('New York'),
Newark=L.marker([40.73556, -74.17278]).bindPopup('Newark'),
NewportNews=L.marker([36.97861, -76.42833]).bindPopup('Newport News'),
Norfolk=L.marker([36.84667, -76.28556]).bindPopup('Norfolk'),
NorthCharleston=L.marker([32.85444, -79.975]).bindPopup('North Charleston'),
Orlando=L.marker([28.53806, -81.37944]).bindPopup('Orlando'),
PalmBay=L.marker([28.03417, -80.58889]).bindPopup('Palm Bay'),
Philadelphia=L.marker([39.95222, -75.16417]).bindPopup('Philadelphia'),
Pittsburgh=L.marker([40.44056, -79.99611]).bindPopup('Pittsburgh'),
PortStLucie=L.marker([27.29361, -80.35056]).bindPopup('Port St. Lucie'),
Providence=L.marker([41.82389, -71.41333]).bindPopup('Providence'),
Raleigh=L.marker([35.77194, -78.63889]).bindPopup('Raleigh'),
Richmond=L.marker([37.55361, -77.46056]).bindPopup('Richmond'),
Rochester=L.marker([43.15472, -77.61583]).bindPopup('Rochester'),
Savannah=L.marker([32.08333, -81.1]).bindPopup('Savannah'),
Springfield=L.marker([42.10139, -72.59028]).bindPopup('Springfield'),
StPetersburg=L.marker([27.77056, -82.67944]).bindPopup('St. Petersburg'),
Stamford=L.marker([41.05333, -73.53917]).bindPopup('Stamford'),
Syracuse=L.marker([43.04806, -76.14778]).bindPopup('Syracuse'),
Tallahassee=L.marker([30.43806, -84.28083]).bindPopup('Tallahassee'),
Tampa=L.marker([27.94722, -82.45861]).bindPopup('Tampa'),
VirginiaBeach=L.marker([36.85278, -75.97833]).bindPopup('Virginia Beach'),
Washington=L.marker([38.895, -77.03667]).bindPopup('Washington'),
Waterbury=L.marker([41.55806, -73.05194]).bindPopup('Waterbury'),
Wilmington=L.marker([34.22556, -77.945]).bindPopup('Wilmington'),
WinstonSalem=L.marker([36.09972, -80.24444]).bindPopup('Winston-Salem'),
Worcester=L.marker([42.2625, -71.80278]).bindPopup('Worcester'),
Yonkers=L.marker([40.93111, -73.89917]).bindPopup('Yonkers');

    
    //create layer group
    var cities = L.layerGroup([Alexandria, Allentown, Arlington, Athens, Atlanta, Augusta, Baltimore, Boston, Brandon, Bridgeport, Buffalo, Cambridge, CapeCoral, Cary, Charleston, Charlotte, Chesapeake, Clearwater, Columbia, Columbia, Columbus, CoralSprings, Durham, Erie, Fayetteville, FortLauderdale, Gainesville, Greensboro, Hampton, Hartford, Hollywood, Jacksonville, JerseyCity, Lowell, Manchester, Miami, NewHaven, NewYork, Newark, NewportNews, Norfolk, NorthCharleston, Orlando, PalmBay, Philadelphia, Pittsburgh, PortStLucie, Providence, Raleigh, Richmond, Rochester, Savannah, Springfield, StPetersburg, Stamford, Syracuse, Tallahassee, Tampa, VirginiaBeach, Washington, Waterbury, Wilmington, WinstonSalem, Worcester, Yonkers 
]);
    
    //create the map
    var map = L.map('map', {
        center: [35, -73],
        zoom: 4.5,
        maxZoom: 7,
        minZoom: 4,
        layers: [terrain]
        //maxBounds: myBounds
    });
    
    var basemaps = {
        "Terrain": terrain,
        "Toner": toner
    }
    var overlayMaps = {
        "Cities": cities
    };
    
    var overlayMaps = {
        "Cities": cities
    }
    
   L.control.layers(basemaps, overlayMaps).addTo(map);
    

    //call getData function - loads data using ajax
    getData(map);
}


//calculate the radius of each proportional symbol
function calcPropRadius(attValue) {
    
    //scale factor to adjust symbol size evenly
    var scaleFactor = 5;
    //area based on attribute value and scale factor
    var area = attValue * scaleFactor;
    //radius calculated based on area
    var radius = Math.sqrt(area / Math.PI);

    return radius;
}

//update the radius of prop symbols, call createPopup and updateLegend functions
function updatePropSymbols(map, attribute) {
    map.eachLayer(function (layer) {
        
        if (layer.feature && layer.feature.properties[attribute]) {
            
            //access feature properties
            var props = layer.feature.properties;
            //update each feature's radius based on new attribute values
            var radius = calcPropRadius(props[attribute]);
            layer.setRadius(radius);
            //function calls
            createPopup(props, attribute, layer, radius);
            updateLegend(map, attribute)
            
        }
    })
}  

//Add population to popups and format with commas
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


//creates popup content and binds them to features
function createPopup(properties, attribute, layer, radius) {
    
    //format population values with commas
    var pop = numberWithCommas(properties.Population2012);
    
    //add city to popup content string
    var popupContent = "<p><b>City:</b> " + properties.City + "</p>" + "<p><b>Population: </b>" + pop;
                      
    //add formatted attribute to panel content string
    var time = attribute.split("_")[1];
    var ampm = attribute.split("_")[2];
    popupContent += "<p><b>Number of birders starting between " + time + " " + ampm + ":</b> " + properties[attribute] + "</p>";
            
    //replace the layer popup
    layer.bindPopup(popupContent, {
        offset: new L.Point(0, -radius),
        minWidth: 320
    });
}

//creates circle marker layer from point features
function pointToLayer(feature, latlng, attributes) {
    
    //determine which attribute to visualize
    var attribute = attributes[0];

    //create marker options
    var geojsonMarkerOptions = {
        fillColor: "#FFC300",
        color: "#BBB9B9",
        weight: 1,
        opacity: 1,
        fillOpacity: 0.8
    };
    
    //for each feature, determine value for selected attribute
    var attValue = Number(feature.properties[attribute]);
            
    geojsonMarkerOptions.radius = calcPropRadius(attValue);
    
    var layer = L.circleMarker(latlng, geojsonMarkerOptions);
    
    createPopup(feature.properties, attribute, layer, geojsonMarkerOptions.radius);
    
    //return circle marker to pointToLayer option
    return layer;
}

//Add circle markers for point features to the map - WITH FILTER
function createPropSymbols(data, map, attributes) {
    //create a Leaflet GeoJSON layer with all data and add it to the map
    var pop100 = L.geoJson(data, {
        pointToLayer: function (feature, latlng) {
            return pointToLayer(feature, latlng, attributes);
        }
    })

    pop100.addTo(map);
}


//Create new sequence controls
function createSequenceControls(map, attributes) {
    //create custom leaflet class for controls    
    var SequenceControl = L.Control.extend({
        options: {
            position: "bottomright"
        },
        
        onAdd: function (map) {
            
            //create control container div
            var container = L.DomUtil.create("div", "sequence-control-container");
            
            //initialize DOM elements, add listeners, etc.
            //create range input element (slider)
            $(container).append('<input class="range-slider" type="range">');

            $(container).append('<button class="skip" id="reverse">Previous</button>');
            $(container).append('<button class="skip" id="forward">Next</button>');
          
            //kill any mouse event listeners on the map
            //this doesn't actually work for mousedown
            $(container).on('mousedown dblclick', function(e){
                L.DomEvent.stopPropagation(e);
            });
            
            // Disable dragging when user's cursor enters the element
            container.addEventListener('mouseover', function () {
                map.dragging.disable();
            });

            // Re-enable dragging when user's cursor leaves the element
            container.addEventListener('mouseout', function () {
                map.dragging.enable();
            });

            return container;
        }
    })
    
    map.addControl(new SequenceControl());
    
    //Add button icons- this doesn’t work yet
    $("#forward").html("<img id='iconF' src='img/birdIcon.png'>");
    $("#reverse").html("<img id='iconR' src='img/birdIcon.png'>");
    
        //set slider attributes
    $('.range-slider').attr({
        max: 23,
        min: 0,
        value: 0,
        step: 1
    });
    
    //click listener for buttons
    $('.skip').click(function () {
        //get the old index value
        var index = $(".range-slider").val()
        
        //increment or decrement based on click
        if ($(this).attr('id') == 'forward') {
            index++;
            //if past the last attribute, wrap around to first attribute
            index = index > 23 ? 0 : index;
        } else if ($(this).attr('id') == 'reverse') {
            index--;
            //if past the first attribute, wrap around to last attribute
            index = index < 0 ? 23 : index;
        }

        //update slider
        $('.range-slider').val(index);
        
        console.log('Index: ' + index);
        var attribute = attributes[index];
        console.log('Attribute: ' + attribute);
        
        
        //pass new attribute to update symbols
        updatePropSymbols(map, attributes[index]);
    
    });

    //input listener for slider
    $('.range-slider').on('input', function () {
        //get the new index value
        var index = $(this).val();
      
        //pass new attribute to update symbols
        updatePropSymbols(map, attributes[index]);
        console.log(index);
        
    });   
    
    
}

//Update the legend with new attribute
function updateLegend(map, attribute){
    //create content for legend
    var time = attribute.split("_")[1];
    var ampm = attribute.split("_")[2];
    console.log(time);
    var content = "<h3><b>Birders starting from " + time + " " + ampm + "</b></h3>";

    //replace legend content
    $('#temporal-legend').html(content);
    
    //get the max, mean, and min values as an object
    var circleValues = getCircleValues(map, attribute);
    
    for (var key in circleValues){
        //get the radius
        var radius = calcPropRadius(circleValues[key]);

        //assign the cy and r attributes
        $('#'+key).attr({
            cy: 150 - radius,
            r: radius
        });
        
        //add legend text
        $('#'+key+'-text').text(Math.round(circleValues[key]*100/100));
    };  
};

 //create legend div and add temporal and circle marker legend
function createLegend(map, attributes){
    var LegendControl = L.Control.extend({
        options: {
            position: 'bottomright'
        },

        onAdd: function (map) {
            // create the control container with a particular class name
            var container = L.DomUtil.create('div', 'legend-control-container');
            
            //add temporal legend div to container
            $(container).append('<div id="temporal-legend">')
            
            
  /*          // Disable dragging when user's cursor enters the element
            container.addEventListener('mouseover', function () {
                map.dragging.disable();
            });

            // Re-enable dragging when user's cursor leaves the element
            container.addEventListener('mouseout', function () {
                map.dragging.enable();
            });
*/
            //start attribute legend svg string
            var svg = '<svg id="attribute-legend" width="280px" height="170px">';
            
            //array of circle names to base loop on
            var circles = {
                max: 100,
                mean: 120,
                min: 140
            }

            //loop to add each circle and text to svg string
            for (var circle in circles){
            //circle string
                svg += '<circle class="legend-circle" id="' + circle + 
                    '" fill="#FFC300" fill-opacity="0.8" stroke="#BBB9B9" cx="100"/>';
                
                //text string
                svg += '<text id="' + circle + '-text" x="200" y="' + circles[circle] + '"></text>';            
            };

            //close svg string
            svg += "</svg>";            

            //add attribute legend svg to container
            $(container).append(svg);
            
            //kill any mouse event listeners on the map
            $(container).on('mousedown dblclick', function(e){
                L.DomEvent.stopPropagation(e);
            });

            return container;
        }
    });

    map.addControl(new LegendControl());
    
    updateLegend(map, attributes[0]);
};


//Calculate the max, mean, and min values for a given attribute
function getCircleValues(map, attribute){
    //start with min at highest possible and max at lowest possible number
    var min = Infinity,
        max = -Infinity;

    map.eachLayer(function(layer){
        //get the attribute value
        if (layer.feature){
            var attributeValue = Number(layer.feature.properties[attribute]);

            //test for min
            if (attributeValue < min){
                min = attributeValue;
            };

            //test for max
            if (attributeValue > max){
                max = attributeValue;
            };
        };
    });

    //set mean
    var mean = Math.round((max + min) / 2);

    //return values as an object
    return {
        max: max,
        mean: mean,
        min: min
    };
};


//build an attributes array from the data
function processData(data) {
    //empty array to hold attributes
    var attributes = [];

    //properties of the first feature in the dataset
    var properties = data.features[0].properties;

    //push each attribute name into attributes array
    for (var attribute in properties){
        //only take attributes with start in the header
        if (attribute.indexOf("start") > -1){
            attributes.push(attribute);
        }
    }
    return attributes;
}


//Import GeoJSON data using ajax
function getData(map) {
    //load the data
    $.ajax("data/leafletLab.geojson", {
        dataType: "json",
        success: function (response) {
            
            //create an attributes array
            var attributes = processData(response);
            
            //adding a layer
            //response.addTo(map);
            
            //call functions
            createPropSymbols(response, map, attributes); 
            createSequenceControls(map, attributes);
            createLegend(map, attributes)
        }
    });
}

$(document).ready(createMap);