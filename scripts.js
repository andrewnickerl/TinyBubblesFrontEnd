let searchResultsDiv = document.getElementById("search_results");
let searchButton = document.getElementById("search_button");
let table = document.getElementById("results_table");
let results = [];

searchButton.addEventListener("click", (event) => {
  event.preventDefault();
  let zipCode = document.getElementById("enter_zip").value;
  let url = "https://api.openbrewerydb.org/breweries/search?query=" + zipCode;
  axios.get(url).then((response) => {
    results = response.data;
    useBreweryResponse();
    console.log(results[0].name);
    console.log(results[1].name);

    makeTable();
    resetValues();
  });
});

function makeTable() {
  table.setAttribute("class", "table table-bordered");
  let head = document.createElement("thead");
  let headingsRow = document.createElement("tr");
  let nameHeading = document.createElement("th");
  nameHeading.innerHTML = "Name";
  nameHeading.setAttribute("scope", "col");
  headingsRow.appendChild(nameHeading);
  let addressHeading = document.createElement("th");
  addressHeading.innerHTML = "Address";
  addressHeading.setAttribute("scope", "col");
  headingsRow.appendChild(addressHeading);
  let phoneHeading = document.createElement("th");
  phoneHeading.innerHTML = "Phone Number";
  phoneHeading.setAttribute("scope", "col");
  headingsRow.appendChild(phoneHeading);
  let urlHeading = document.createElement("th");
  urlHeading.innerHTML = "Website URL";
  urlHeading.setAttribute("scope", "col");
  headingsRow.appendChild(urlHeading);
  let favoritesHeading = document.createElement("th");
  favoritesHeading.innerHTML = "Add to favorites";
  favoritesHeading.setAttribute("scope", "col");
  headingsRow.appendChild(favoritesHeading);
  head.appendChild(headingsRow);
  table.appendChild(head);
  for (let i = 0; i < results.length; i++) {
    let newRow = document.createElement("tr");
    let name = document.createElement("td");
    name.innerHTML = results[i].name;
    newRow.appendChild(name);
    let address = document.createElement("td");
    address.innerHTML = `${results[i].street}, ${results[i].city}, ${results[i].state}, ${results[i].postal_code}`;
    newRow.appendChild(address);
    let phone = document.createElement("td");
    phone.innerHTML = results[i].phone;
    newRow.appendChild(phone);
    let url = document.createElement("td");
    url.innerHTML = results[i].website_url;
    newRow.appendChild(url);
    let favorites = document.createElement("td");
    let favAnchor = document.createElement("a");
    // put post request here
    let icon = document.createElement("i");
    icon.setAttribute("class", "far fa-star");
    icon.addEventListener("click", addToFavorites);
    favAnchor.appendChild(icon);
    favorites.appendChild(favAnchor);
    newRow.appendChild(favorites);
    table.appendChild(newRow);
  }
}

useBreweryResponse = () =>
  console.log("Check out these breweries: " + JSON.stringify(results));

function addToFavorites() {
  // do something
  axios.post();
}

function resetValues() {
  document.getElementById("enter_zip").value = "";
}
