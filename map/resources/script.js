
let map;

let colors = [
	'red', 'blue', 'green', 'purple', 'orange', 'red'
];


let runNames = [
	'Alternative_IKEA_trip',
	'De_unification_Attp_1_2',
	'Walk_to_activate_residential_areas',
	'Generating_metadata',
	'_Solidarity_with_protesters_in_Sudan',
	"file"
];

window.addEventListener('DOMContentLoaded', function(){
	console.log('nana');
	mapboxgl.accessToken = "pk.eyJ1IjoiYW5lY2RvdGUxMDEiLCJhIjoiY2oxMGhjbmpsMDAyZzJ3a2V0ZTBsNThoMiJ9.1Ce55CnAaojzkqgfX70fAw";
	map = new mapboxgl.Map({
		container: "map",
		style: "mapbox://styles/mapbox/light-v10",
		center: [-4.2554512505234925, 55.87225251359172],
		zoom: 14
	});
	map.on("load", function () {
		runNames.forEach(function(run, i){
			plotCounterRun(run, i);
		})
	});	

});

function plotCounterRun(run, i){
	fetch('data/'+run+'.geojson')
	.then(function(response) {
		return response.json();
	})
	.then(function(json) {
		let name;
		json.features.forEach(function(feature){
			name = feature.properties.name;
		});
		console.log(json);

		let marker = json.features[0].geometry.coordinates[Math.floor(json.features[0].geometry.coordinates.length/2)];

		var el = document.createElement('div');
		el.classList.add('marker');
		el.innerText = name;
		// el.addEventListener('click', function() {
		// window.alert(marker.properties.message);
		//}
		new mapboxgl.Marker(el)
		.setLngLat(marker)
		.addTo(map);

		 
		// add marker to map
		
		

		map.addLayer({
			"id": run,
			"type": "line",
			"source": {
				"type": "geojson",
				"data": json
			},
			"layout": {
				"line-join": "round",
				"line-cap": "round"
			},
			"paint": {
				"line-color": colors[i],
				"line-width": 4
			}
		})
	});
}