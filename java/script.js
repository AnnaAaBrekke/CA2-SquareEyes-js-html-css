console.log("This is the API");

fetch("https://api.noroff.dev/api/v1/square-eyes")
    .then ((response) => response.json()) 
    .then((data) => console.log(data))
    .catch(error => console.error(error));


