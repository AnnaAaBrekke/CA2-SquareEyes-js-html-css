// DomContentet Load
document.addEventListener("DOMContentLoaded", function () {
    console.log("DOMContentLoaded works the correct way");
});

//Cart
cartIcon = document.querySelector("#cart-icon");
let dropdownCart = document.querySelector(".dropdown-cart");
let closeCart = document.querySelector("#close-cart");
console.log("Dropdown cart is created successfully");

// Open cart
cartIcon.onclick = () => {
    dropdownCart.classList.add("active");
};

// Close cart
closeCart.onclick = () => {
    dropdownCart.classList.remove("active");
};

// Cart working

if (document.readyState == "loading"){
    document.addEventListener("DOMContentLoaded", ready);
} else {
    ready()
}

function ready() {
    const removeCartButtons = document.querySelectorAll (".remove-item");
    removeCartButtons.forEach(button => button.addEventListener("click", removeCartItem));

    // const quantityInputs = document.querySelectorAll (".quantity");
    // quantityInputs.forEach(input => input.addEventListener("change", quantityChanged));
}

function removeCartItem(event){
    const buttonClicked = event.target
    buttonClicked.parentElement.remove()
    updateTotal();
}


// // Quantity Changes
// const quantityInputs = document.getElementsByClassName("quantity");

// for (let i = 0; i < quantityInputs.length; i++) {
//     const input = quantityInputs[i];
//     input.addEventListener("change", quantityChanged);
// }

// function quantityChanged(event) {
//     const input = event.target;
//     if (isNaN(input.value) || input.value <= 1) {
//         input.value = 1;
//     }
//     updateTotal();
// }

// function updateTotal() {
//     const cartDropdownContent = document.getElementsByClassName("cart-dropdown-content")[0];
//     const cartItems = cartDropdownContent.getElementsByClassName("cart-item");
//     let total = 0;

//     cartItems.forEach(cartItem => {
//         const priceElement = cartItem.querySelector(".cart-item-price");
//         const quantityElement = cartItem.querySelector(".quantity");
//         const price = parseFloat(priceElement.innerText.replace("$", ""));
//         const quantitySelected = quantityElement.value;
//         total += price * quantitySelected;

//         console.log(`Price: ${price}, Quantity: ${quantitySelected}`);
//     });

//     // If price contains decimals
//     total = Math.round(total * 100) / 100;

//     document.querySelector(".total-price").innerText = `$${total}`;
// }




// Fetch movies from the API
async function fetchMovies() {
    try {
        const response = await fetch("https://v2.api.noroff.dev/square-eyes");
        const data = await response.json();

        if (Array.isArray(data.data)) {
            console.log("API movies with data:", data.data);
            return data.data;
        } else {
            console.error("Invalid data format from the API");
            return [];
        }
    } catch (error) {
        console.error("Error fetching movies:", error);
        return [];
    }
}

// Display the correct item in cart by fetching "Once upon A time"
fetchMovies().then(movies => {
    try {
        const cartItemContainer = document.querySelector(".cart-dropdown-content");
        const movie = movies[6]; // OR: const movie = movies.find(movie => movie.title === "Once Upon A Time In Hollywood");

        const cartItem = document.createElement("div");
        cartItem.classList.add("cart-item");
        cartItem.innerHTML = `
            <img src="${movie.image.url}" alt="${movie.title}" class="cart-img">
            <div class="cart-item-info">
                <div class="cart-item-title">${movie.title}</div>
                <div class="cart-item-price">${movie.price}kr</div>
            </div>
            <input type="number" value="1" class="quantity">
            <button type="button" class="remove-item" value="Remove">Remove</button>
        `;

        cartItemContainer.innerHTML = "";
        cartItemContainer.appendChild(cartItem);
        console.log("The correct cart-item is displayed");

        // displayCartTotal(movies);

    } catch (error) {
        console.error("Error displaying data in cart:", error);
    }

    displayMovies(movies);
});


function displayMovies(movies) {
    const moviesContainer = document.querySelector(".movie-container");

    movies.forEach(movie => {
        const movieElement = document.createElement("div");
        movieElement.classList.add("movie");
        
        movieElement.innerHTML = `
            <img src="${movie.image.url}" alt="${movie.title}">
            <div class="price-movie">
                <i class="fa-solid fa-cart-plus" alt="Add to cart icon"></i>
                <h class="product-price">${movie.price}kr</h>
            </div>
        `;

        moviesContainer.appendChild(movieElement);
    });
};



// // Cart-total outside
// function displayCartTotal(movies) {
//     try {
//         const cartTotalContainer = document.querySelector(".cart-total");
//         console.log("Did find div cart-total in the html", cartTotalContainer);

//         if (cartTotalContainer) {

//             const cartTotal = document.createElement("div");
//             cartTotal.classList.add("cart-total-container");
//             cartTotal.innerHTML = ` 
//                 <div class="total-title">Total</div>
//                 <div class="total-price">${movies.reduce((total, movie) => total + parseFloat(movie.price), 0)}kr</div>
//                 <button type="submit" class="check-out">Check out</button>
//                 <i class="fa-solid fa-xmark" id="close-cart"></i>
//             `;

//         cartTotalContainer.body.innerHTML = ""; 
//         cartTotalContainer.appendChild(cartTotal);
//         console.log("The total price in the cart is correct");
    
//     }   else {
//         console.error("Error: it is null");
//     }
//     } catch (error) {
//         console.error("Error displaying the total price in cart", error)
//     } 
// };


