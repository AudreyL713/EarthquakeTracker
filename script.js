function getCoords(){
var x = document.getElementById("fm1")
lat = x.elements[0].value;
long = x.elements[1].value;
console.log(lat)
console.log(long)
doFunction(lat,long);
}

function doFunction(lat,long) {
var latitude = "&latitude=" + lat;
var longitude = "&longitude=" + long; 
var rad = "&maxradiuskm=" + getRadioVal("range");

const app = document.getElementById('root')
const container = document.createElement('div')
container.setAttribute('class','container')
app.appendChild(container)

var orig = "https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&minmagnitude=0.0" + latitude + longitude + rad;
console.log(orig)
var request = new XMLHttpRequest();
request.open("GET", orig, true);
request.onload = function() {
	var data = JSON.parse(this.response);
	var newArr = data.features;
	newArr.forEach(quake => {
		prop = quake.properties		
		const card = document.createElement('div')
		card.setAttribute('class', 'card')

		const h1 = document.createElement('h1')
		h1.textContent = prop.place

		const p = document.createElement('p')
		text = "Magnitude: "
		p.textContent = text.concat(prop.mag)

		const p2 = document.createElement('p')
		var day = new Date(parseInt(prop.time))
		p2.textContent = "Date: " + day

		var att = document.createAttribute("style")
		colors = between(prop.mag)
		cols = colors.split("-")
		att.value="background-image:linear-gradient(120deg, " + cols[0] + ", " + cols[1] + ")"
		h1.setAttributeNode(att);

		container.appendChild(card)
		card.appendChild(h1)
		card.appendChild(p)
		card.appendChild(p2)
	})
}
request.send();
}

function getRadioVal(id) {
var slider = document.getElementById(id);
return slider.value;
}

function getLocation() {
var x = document.getElementById("currloc");

if (navigator.geolocation) {
navigator.geolocation.getCurrentPosition(showPosition);
} else {
x.innerHTML = "Geolocation is not supported by this browser.";
}}

function showPosition(position) {
lat = position.coords.latitude;
long = position.coords.longitude;
doFunction(lat,long);
}

function between(mag) {
var compare = parseFloat(mag);
if(compare >= 0 && compare <= 2.5) {
return "green-yellow";
} else if (compare > 2.5 && compare <= 5.0) {
return "yellow-orange";
} else if (compare > 5.0 && compare <= 7.5) {
return "orange-red";
} else {
return "red-black";
}
}