/* Leaflet Lab Map (Lab 1) */

//function to instantiate the Leaflet map
function createMap() {    
    //create the map
    var map = L.map('map', {
        center: [34, -75],
        zoom: 4.5,
        maxZoom: 7,
        minZoom: 4,
        //maxBounds: myBounds
    });

    //add Stamen Terrain base tilelayer
    L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}{r}.{ext}', {
        attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &mdash; Observation Data provided by <a href="https://ebird.org/home">eBird</a>',
        subdomains: 'abcd',
        minZoom: 0,
        maxZoom: 18,
        ext: 'png'
    }).addTo(map);

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


function updatePropSymbols(map, attribute) {
    //checking for value of attribute passed in
    console.log('Inside updatePropSymbols, attribute: ' + attribute)
    
    map.eachLayer(function (layer) {
        
        if (layer.feature && layer.feature.properties[attribute]) {
            
            //test whether if evaluated true
            console.log('Inside map.eachLayer')
            
            //access feature properties
            var props = layer.feature.properties;
            //update each feature's radius based on new attribute values
            var radius = calcPropRadius(props[attribute]);
            layer.setRadius(radius);
            
            createPopup(props, attribute, layer, radius);
            
            //console.log('Update prop symbols: ' + attribute);
            
            updateLegend(map, attribute)
        }
    })
}  



function createPopup(properties, attribute, layer, radius) {
    //add city to popup content string
    var popupContent = "<p><b>City:</b> " + properties.City + "</p>";
                      
    //add formatted attribute to panel content string
    var time = attribute.split("_")[1];
    popupContent += "<p><b>Number of birders starting between " + time + ":</b> " + properties[attribute] + "</p>";
            
    //replace the layer popup
    layer.bindPopup(popupContent, {
        offset: new L.Point(0, -radius)
    });
}


function pointToLayer(feature, latlng, attributes) {
    //determine which attribute to visualize
    var attribute = attributes[0];
    
    //console.log(attribute);
    
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
    
    //check it
    //console.log(feature.properties, attValue);
    
    var layer = L.circleMarker(latlng, geojsonMarkerOptions);
    
    createPopup(feature.properties, attribute, layer, geojsonMarkerOptions.radius);
    
    
    //return circle marker to pointToLayer option
    return layer;
}


//Add circle markers for point features to the map
function createPropSymbols(data, map, attributes) {
    //create a Leaflet GeoJSON layer and add it to the map
    L.geoJson(data, {
        pointToLayer: function (feature, latlng) {
            return pointToLayer(feature, latlng, attributes);
        }
    }).addTo(map);
}


//Create new sequence controls
function createSequenceControls(map, attributes) {
        
    var SequenceControl = L.Control.extend({
        options: {
            position: "bottomleft"
        },
        
        onAdd: function (map) {
            
            //create control container div
            var container = L.DomUtil.create("div", "sequence-control-container");
            
            //initialize DOM elements, add listeners, etc.
            //create range input element (slider)
            $(container).append('<input class="range-slider" type="range">');

            $(container).append('<button class="skip" id="reverse">Previous</button>');
            $(container).append('<button class="skip" id="forward">Next</button>');
    
            //click listener for buttons
            $('.skip').click(function () {
                //get the old index value
                var index = $(".range-slider").val()
        
                //increment or decrement based on click
                if ($(this).attr('id') == 'forward') {
                    index++;
                    //if past the last attribute, wrap around to first attribute
                    index = index > 23 ? 0 : index;
                } else if ($(this).attr('id') ==   'reverse') {
                    index--;
                    //if past the first attribute, wrap around to last attribute
                    index = index < 0 ? 23 : index;
                    
                    console.log(index);
                }

                //update slider
                $('.range-slider').val(index);
                
                //pass new attribute to update symbols
                updatePropSymbols(map, attributes[index]);
        
            });

            //input listener for slider
            $('.range-slider').on('input', function () {
                //get the new index value
                var index = $(this).val();
      
                //pass new attribute to update symbols
                updatePropSymbols(map, attributes[index]);
        
            });
            
            
            //kill any mouse event listeners on the map
            $(container).on('mousedown dblclick', function(e){
                L.DomEvent.stopPropagation(e);
            });
            
            
            return container;
        }
    })
    
    map.addControl(new SequenceControl());
    
        //set slider attributes
    $('.range-slider').attr({
        max: 23,
        min: 0,
        value: 0,
        step: 1
    });
    
    
    /*
    //create range input element (slider)
    $('#slider').append('<input class="range-slider" type="range">');
    
        //set slider attributes
    $('.range-slider').attr({
        max: 23,
        min: 0,
        value: 0,
        step: 1
    });

    $('#slider').append('<button class="skip" id="reverse">Previous</button>');
    $('#slider').append('<button class="skip" id="forward">Next</button>');
    
    */
    
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
        
        console.log(index);
        
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
    console.log(time);
    var content = "<h3><b>Number starting between " + time + "</b></h3>";

    //replace legend content
    $('#temporal-legend').html(content);
    
    //get the max, mean, and min values as an object
    var circleValues = getCircleValues(map, attribute);
    
    for (var key in circleValues){
        //get the radius
        var radius = calcPropRadius(circleValues[key]);

        //Step 3: assign the cy and r attributes
        $('#'+key).attr({
            cy: 150 - radius,
            r: radius
        });
        
        //Step 4: add legend text
        $('#'+key+'-text').text(Math.round(circleValues[key]*100)/100);
        
        
    };
    
    
};

 
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

            //start attribute legend svg string
            var svg = '<svg id="attribute-legend" width="280px" height="170px">';
            
            //array of circle names to base loop on
            var circles = {
                max: 100,
                mean: 120,
                min: 140
            }

            //Step 2: loop to add each circle and text to svg string
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
    var mean = (max + min) / 2;

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

    //check result
    console.log(attributes);

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
            
            //call functions
            createPropSymbols(response, map, attributes); 
            createSequenceControls(map, attributes);
            createLegend(map, attributes)
        }
    });
}


$(document).ready(createMap);