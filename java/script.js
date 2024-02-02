// console.log("This is the API");

// fetch("https://api.noroff.dev/api/v1/square-eyes")
//     .then ((response) => response.json()) 
//     .then((data) => console.log(data))
//     .catch(error => console.error(error));


//Cart
let cartIcon = document.querySelector("#cart-icon");
let dropdownCart = document.querySelector(".dropdown-cart");
let closeCart = document.querySelector("#close-cart");

// Open cart
cartIcon.onclick = () => {
    dropdownCart.classList.add("active");
};

// Close cart
closeCart.onclick = () => {
    dropdownCart.classList.remove("active");
};

// https://www.youtube.com/watch?v=18Jvyp60Vbg --> 30min
