
let map;

let colors = [
	//'red', 'blue', 'green', 'purple', 'orange', 'red'
	'#e75667', '#c94c5b', '#983c46', '#721924', '#db838d'
];


let runNames = [
	'22_million_will_starve_in_Yemen',
	'_counterruns_Disrobe_Boris_of_his_clown_costume',
	'_counterruns_US_is_holding_humans_in_cages',
	'_Solidarity_with_protesters_in_Sudan',
	'Alternative_IKEA_trip',
	'Ban_single_use_plastic_counterruns',
	'De_unification_Attp_1_2',
	'Dominic_Raab_is_engaging_in_a_bizarre_kind_of_American_style_culture_war_politics_counterruns',
	'Generating_metadata',
	'Milifitness_counterruns',
	'The_bees_are_fucked_counterruns',
	'Walk_to_activate_residential_areas'
];

window.addEventListener('DOMContentLoaded', function(){
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
		el.innerText = name.replace('#counterruns', '');
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
				"line-color": colors[Math.floor(Math.random() * colors.length)],
				"line-width": 4
			}
		})
	});
}