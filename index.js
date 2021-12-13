// api url
const api_url =
	"https://aninames-api-default-rtdb.firebaseio.com/anime/28999.json";

// Defining async function
async function getapi(api_url) {
	
	// Storing response
	const response = await fetch(api_url);
	
	// Storing data in form of JSON
	var data = await response.json();
	console.log(data);
	document.getElementById("banner").style.backgroundImage = 'url(' + data.banner + ')';
	document.getElementById("logo").src = data.logo;
	document.getElementById("cover").src = data.cover;
	document.getElementById("title").innerHTML = data.title;
image_url = data.cover;
console.log(image_url)
console.log(data.banner)
console.log(data.logo)
}

getapi(api_url);
