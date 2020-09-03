let searchResultsDiv = document.getElementById("search_results");
let searchButton = document.getElementById("search_button");
let registerButton = document.getElementById("register_btn");
let table = document.getElementById("results_table");
let results = [];

axios.get("https://tiny-bubbles.herokuapp.com/user").then((user) => {
  let favoritesListIsNull = user.favoritesList.length < 1;
  if (!favoritesListIsNull) {
    if (window.location.href.match("profile.html") != null) {
      makeFavoritesTable(user.favoritesList);
    }
  }
});

if (searchButton !== null) {
  searchButton.addEventListener("click", (event) => {
    event.preventDefault();
    let zipCode = document.getElementById("enter_zip").value;
    let url = "https://api.openbrewerydb.org/breweries/search?query=" + zipCode;
    axios.get(url).then((response) => {
      results = response.data;
      makeSearchTable();
      resetValues();
    });
  });
}

if (registerButton !== null) {
  registerButton.addEventListener("click", (event) => {
    event.preventDefault();
    let username = document.getElementById("userName");
    let password = document.getElementById("password");
    let firstName = document.getElementById("fName");
    let lastName = document.getElementById("lName");
    axios.post("https://tiny-bubbles.herokuapp.com/newUser", {
      userName: username,
      password: password,
      fName: firstName,
      lName: lastName,
    });
    window.location = "/loggedIn.html";
  });
}

function makeSearchTable() {
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
    // url.innerHTML = results[i].website_url;
    let link = document.createElement("a");
    link.setAttribute("href", results[i].website_url);
    link.innerHTML = "Click here";
    url.appendChild(link);
    newRow.appendChild(url);
    let favorites = document.createElement("td");
    let favAnchor = document.createElement("a");
    // put post request here
    let icon = document.createElement("i");
    icon.setAttribute("class", "far fa-star");
    icon.addEventListener("click", () => {
      axios.put("https://tiny-bubbles.herokuapp.com/addFavorite", {
        name: results[i].name,
        address: `${results[i].street}, ${results[i].city}, ${results[i].state}, ${results[i].postal_code}`,
        phone: results[i].phone,
        link: results[i].website_url,
      });
    });
    favAnchor.appendChild(icon);
    favorites.appendChild(favAnchor);
    newRow.appendChild(favorites);
    table.appendChild(newRow);
  }
}

function makeFavoritesTable(favorites) {
  favTable = document.getElementById("wishlist_table");
  favTable.setAttribute("class", "table table-bordered");
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
  favoritesHeading.innerHTML = "Remove favorite";
  favoritesHeading.setAttribute("scope", "col");
  headingsRow.appendChild(favoritesHeading);
  head.appendChild(headingsRow);
  favTable.appendChild(head);
  for (let i = 0; i < favorites.length; i++) {
    let newRow = document.createElement("tr");
    let name = document.createElement("td");
    name.innerHTML = favorites[i].name;
    newRow.appendChild(name);
    let address = document.createElement("td");
    address.innerHTML = `${favorites[i].street}, ${favorites[i].city}, ${favorites[i].state}, ${favorites[i].postal_code}`;
    newRow.appendChild(address);
    let phone = document.createElement("td");
    phone.innerHTML = favorites[i].phone;
    newRow.appendChild(phone);
    let url = document.createElement("td");
    let link = document.createElement("a");
    link.setAttribute("href", favorites[i].website_url);
    link.innerHTML = "Click here";
    url.appendChild(link);
    newRow.appendChild(url);
    let favorite = document.createElement("td");
    let favAnchor = document.createElement("a");
    // put post request here
    let icon = document.createElement("i");
    icon.setAttribute("class", "far fa-star");
    icon.addEventListener("click", () => {
      axios.put("https://tiny-bubbles.herokuapp.com/removeFavorite", {
        name: favorites[i].name,
      });
    });
    favAnchor.appendChild(icon);
    favorites.appendChild(favAnchor);
    newRow.appendChild(favorite);
    favTable.appendChild(newRow);
  }
}

useBreweryResponse = () =>
  console.log("Check out these breweries: " + JSON.stringify(results));

function resetValues() {
  document.getElementById("enter_zip").value = "";
}
