/* Leaflet Lab Map (Lab 1) */

//function to instantiate the Leaflet map
function createMap(){
    //create the map
    var map = L.map('map', {
        center: [39, -79],
        zoom: 4,
        maxZoom: 7,
        minZoom: 4
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
};

//create popup content function to call in pointTolayer() and updatePropSymbols()
function createPopup(properties, attribute, layer, radius){
    //add city to popup content string
    var popupContent = "<p><b>City:</b> " + properties.City + "</p>";

    //add formatted attribute to panel content string
    var time = attribute.split("_")[1];
    popupContent += "<p><b>Number of starts from " + time + ":</b> " + properties[attribute] + "</p>";

    //replace the layer popup
    layer.bindPopup(popupContent, {
        offset: new L.Point(0,-radius)
    });

};

// create function to calculate the radius of each proportional symbol using variable attValue defined in pointToLayer function
function calcPropRadius(attValue) {
    //scale factor to adjust symbol size evenly
    var scaleFactor = 10;
    //area based on attribute value and scale factor
    var area = attValue * scaleFactor;
    //radius calculated based on area
    var radius = Math.sqrt(area/Math.PI);
    return radius;
    
    };

function pointToLayer(feature, latlng, attributes){
    
    //Determine which attribute to visualize with proportional symbols by creating attribute variable
    var attribute = attributes[0];
    
    //create marker options using geojsonMarkerOptions variable
    var geojsonMarkerOptions = {
        radius: 8,
        fillColor: "#ff7800",
        color: "#000",
        weight: 1,
        opacity: 1,
        fillOpacity: 0.8
    };
    
    //define attValue variable used in calcPropRadius function
    var attValue = Number(feature.properties[attribute]);
    
    //Give each feature's circle marker a radius based on its attribute value
    geojsonMarkerOptions.radius = calcPropRadius(attValue);
    
    //create circle marker layer as variable
    var layer = L.circleMarker(latlng, geojsonMarkerOptions);
    
    //build popup content
    var panelContent = feature.properties.City;
    
    
    createPopup(feature.properties, attribute, layer, geojsonMarkerOptions.radius);


    //event listeners to open popup on hover
    layer.on({
        mouseover: function(){
            this.openPopup();
        },
        mouseout: function(){
            this.closePopup();
        },
        click: function(){
            $("#panel").html(panelContent);
        }
    });
    
    
    //return the circle marker to the L.geoJason pointToLayer option;
    return layer;
};



//Function to add circle markers for point features to the map
function createPropSymbols(data, map, attributes){
    //create a Leaflet GeoJSON layer and add it to the map
    L.geoJson(data, {
        pointToLayer: function(feature, latlng){
            return pointToLayer(feature, latlng, attributes);
        }
    }).addTo(map);
};

//Create new sequence controls
function createSequenceControls(map, attributes){
    
    //click listener for buttons
    $('.skip').click(function(){
        //get the old index value
        var index = $('.range-slider').val();

        //increment or decrement depending on button clicked
        if ($(this).attr('id') == 'forward'){
            index++;
            //if past the last attribute, wrap around to first attribute
            index = index > 23 ? 0 : index;
        } else if ($(this).attr('id') == 'reverse'){
            index--;
            //if past the first attribute, wrap around to last attribute
            index = index < 0 ? 23 : index;
        };
                    
        //update slider
        $('.range-slider').val(index);
                
        //pass new attribute to update symbols
        updatePropSymbols(map, attributes[index]);
                    
    });
    
    
    //input listener for slider
    $('.range-slider').on('input', function(){
                
        //get the new index value
        var index = $(this).val();
        
        //pass new attribute to update symbols
        updatePropSymbols(map, attributes[index]);

    });
    
    
    
    //create new leaflet class to move UI controls to map
    var SequenceControl = L.Control.extend({
        options:{
            position:"bottomleft"
        },
        
        onAdd: function (map) {
            //create control div container with a particular class name
            var container = L.DomUtil.create("div", "sequence-control-container");
            
            //add all elements, listeners, etc into class
    
                //create range input element (slider)
                $(container).append('<input class="range-slider" type="range">');
    
                //Add skip buttons
                $(container).append('<button class="skip" id="reverse" title="Reverse">Previous</button>');
                $(container).append('<button class="skip" id="forward" title="Forward">Next</button>');
                
                //Replace button content with images -- this does not work
                /*$('#reverse').html('<img src="img/icon_reverse.png">');
                $('#forward').html('<img src="">');*/
    
                //set slider attributes
                $('.range-slider').attr({
                    max: 24,
                    min: 0,
                    value: 0,
                    step: 1
                });
    



            
            

            
            
            
            
            
            //kill any mouse event listeners on the map
            //currently works for dblclick but not mousedown (doesn't work on slider)
            $(container).on('mousedown dblclick', function(e){
                L.DomEvent.stopPropagation(e);
                    
            });
            
            return container;
        }
    });
    
    map.addControl(new SequenceControl());

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
            $(container).append("<div id='temporal-legend'>")

            //start attribute legend svg string
            var svg = '<svg id="attribute-legend" width="180px" height="180px">';
            
            //array of circle names to base loop on
            var circles = ["max", "mean", "min"];

            //loop to add each circle and text to svg string
            for (var i=0; i<circles.length; i++){
            
                //circle string
                svg += '<circle class="legend-circle" id="' + circles[i] + 
                    '" fill="#F47821" fill-opacity="0.8" stroke="#000000" cx="90"/>';
            };

            //close svg string
            svg += "</svg>";

            //add attribute legend svg to container
            $(container).append(svg);            
            
            
            return container;
        }
    });

    map.addControl(new LegendControl());
    
    updateLegend(map, attributes[0])
};


//Update the legend with new attribute
function updateLegend(map, attribute){
    
    //create content for legend   
    var time = attribute.split("-")[1]
    var legendText = '<p class="title">  <b>Number of Birders Starting Observations from ' + time + '</b></p>';

    //replace legend content
    $('#temporal-legend').html(legendText);
    
    //get the max, mean, and min values as an object
    var circleValues = getCircleValues(map, attribute);
    
    for (var key in circleValues){
        //get the radius
        var radius = calcPropRadius(circleValues[key]);

        //Step 3: assign the cy and r attributes
        $('#'+key).attr({
            cy: 179 - radius,
            r: radius
        });
    };
};


//resize proportional symbols according to new attribute values
function updatePropSymbols(map, attribute){
    
    map.eachLayer(function(layer){
        if (layer.feature && layer.feature.properties[attribute]){
            var props = layer.features.properties;
            
            var radius = calcPropRadius(props[attribute]);
            layer.setRadius(radius);
            
            //call createPopup()
            createPopup(props, attribute, layer, radius);
            
            updateLegend(map, attribute);
            
        };
    });
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
function processData(data){
    
    //empty array to hold attributes
    var attributes = [];
    
    //properties of the first feature in the dataset
    var properties = data.features[0].properties;

    //push each attribute name into attributes array
    for (var attribute in properties){
        
        //only take attributes with start values
        if (attribute.indexOf("start") > -1){
            attributes.push(attribute);
        };
    };

    //check result
    //console.log(attributes);

    return attributes;
};

//Import GeoJSON data using ajax
function getData(map){
    //load the data
    $.ajax("data/leafletLab.geojson", {
        dataType: "json",
        success: function(response){
            //create an attribute array
            var attributes = processData(response);
            
            //call function to create proportional symbols
            createPropSymbols(response, map, attributes);
            
            //call sequence controls function within getData function so it can access data with ajax
            createSequenceControls(map, attributes);
            
            createLegend(map, attributes);
        }
    });
};


$(document).ready(createMap);