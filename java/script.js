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

document.body.addEventListener("click", (event) => {
    if (event.target.classList.contains("fa-xmark")) {
        dropdownCart.classList.remove("active");
        console.log("When x is clicked the cart removes totally");
    }
});

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
async function displayCartItem() {
    try {
        const movies = await fetchMovies();
        const cartItemContainer = document.querySelector(".cart-dropdown-content");
        const movie = movies[6]; // OR: const movie = movies.find(movie => movie.title === "Once Upon A Time In Hollywood"); (this is probably better if the array changes?)

        const cartItem = document.createElement("div");
        cartItem.classList.add("cart-item");
        cartItem.innerHTML = `
            <img src="${movie.image.url}" alt="${movie.title}" class="cart-img">
            <div class="cart-item-info">
                <div class="cart-item-title">${movie.title}</div>
                <div class="cart-item-price">${movie.price}KR</div>
            </div>
            <input type="number" value="1" class="quantity">
            <button type="button" class="remove-item" value="Remove">Remove</button>
        `;

        cartItemContainer.innerHTML = "";
        cartItemContainer.appendChild(cartItem);
        console.log("The correct cart-item is displayed");

        const removeCartButtons = document.querySelectorAll(".remove-item");
        removeCartButtons.forEach(button => button.addEventListener("click", removeCartItem));
        console.log("Remove cart item when clicked button");

        await displayCartTotal(movies);

    } catch (error) {
        console.error("Error displaying data in cart:", error);
    }
}

// Cart-total outside
async function displayCartTotal(movies) {
    try {
        const cartTotalContainer = document.querySelector(".cart-dropdown-total");

            const cartTotal = document.createElement("div");
            cartTotal.classList.add("cart-total");
            cartTotal.innerHTML =  ` 
                <div class="total-title">Total</div>
                <div class="total-price">${movies.reduce((total, movie) => total + parseFloat(movie.price), 0)}KR</div>
                <button type="submit" class="check-out">Check out</button>
                <i class="fa-solid fa-xmark" id="close-cart"></i>
                `;

            cartTotalContainer.innerHTML = "";
            cartTotalContainer.appendChild(cartTotal);
            console.log("The total and check out is displayed");

            updateTotal();

            // // Event listener to the Check Out button guides to another site
            // const checkOutButton = cartTotalContainer.querySelector(".check-out");
            // checkOutButton,addEventListener("click", () => {
            //     window.location.href = "checkout.html";
            // })

    } catch (error) {
        console.error("Error adding submit and total", error);
    }
};


// Quantity Changes
const quantityInputs = document.querySelectorAll(".quantity");

  for (let i = 0; i < quantityInputs.length; i++) {
      const input = quantityInputs[i];
      input.addEventListener("change", quantityChanged);
  }

  async function quantityChanged(event) {
    // console.log("Event", event); // Event was an array 
    const input = event.target;
    console.log("Input:", input); 
    if (input && (isNaN(input.value) || input.value <= 1)) {
        input.value = 1;
    }

    updateTotal();
}


// Update Total
async function updateTotal() {
        const cartDropdownContent = document.querySelector(".cart-dropdown-content");
        const cartItems = cartDropdownContent.querySelectorAll(".cart-item");
        let total = 0;
    
        Array.from(cartItems).forEach(cartItem => {
            const priceElement = cartItem.querySelector(".cart-item-price");
            const quantityElement = cartItem.querySelector(".quantity");
            const price = parseFloat(priceElement.innerText.replace("KR", ""));
            const quantitySelected = quantityElement.value;
            console.log("Price", price, "Quantity", quantitySelected);
            total += price * quantitySelected;
        });
        
        // If price contains many decimals
        total = Math.round(total * 100) / 100;

        const totalElement = document.querySelector(".total-price");
        console.log("Total", total);
        totalElement.innerText = `${total}KR`;
    }
    
        // Modify the quantity input event listener to trigger updateTotal
        document.querySelectorAll(".quantity").forEach(input => {
            input.addEventListener("input", updateTotal);
            console.log("Quantity input changed");
});

function ready() {
    const removeCartButtons = document.querySelectorAll (".remove-item");
    removeCartButtons.forEach(button => button.addEventListener("click", removeCartItem));
}

function removeCartItem(event){
    const buttonClicked = event.target;
    const cartItem = buttonClicked.closest(".cart-item");

    cartItem.remove();
    console.log("The closest cart item is removed when clicked");

}

document.addEventListener("DOMContentLoaded", ready);


async function displayMovies(movies) {
    try {
        const moviesContainer = document.querySelector(".movie-container");

        // Clear existing innerHTML content
        moviesContainer.innerHTML = "";

        movies.forEach(movie => {
            const movieElement = document.createElement("div");
            movieElement.classList.add("movie");
            movieElement.innerHTML = `
                <img src="${movie.image.url}" alt="${movie.title}">
            `;

            const moviePriceElement = document.createElement("div");
            moviePriceElement.classList.add("price-movie");
            moviePriceElement.innerHTML = `
                <div class="price-movie">
                    <i class="fa-solid fa-cart-plus" alt="Add to cart icon"></i>
                    <span class="product-price">${movie.price} KR</span>
                </div>
            `;

            moviesContainer.appendChild(movieElement);
            movieElement.appendChild(moviePriceElement);
        });

        console.log("Movies displayed successfully");
    } catch (error) {
        console.error("Error displaying movies", error);
    }
}

//fetchMovies().then(displayMovies);// - need to use async instead

async function main () {
    try {
        const movies = await fetchMovies();
        await displayMovies(movies);
        await displayCartItem(movies);
        await displayCartTotal(movies);
        await quantityChanged(movies);
        await updateTotal (movies);
        console.log("The main async function is working");

    } catch (error) {
        console.error("Error in the main async function:", error);
    }
}

main();

