
// Loading indicator

window.addEventListener("load", () => {
    const loader = document.querySelector(".loader");

    loader.classList.add("loader-hidden");

    loader.addEventListener("transitionend", () => {
        loader.remove();  
    });
});

// DomContent Loads
document.addEventListener("DOMContentLoaded", function () {
    loadCartFromSessionStorage();
    console.log("DOMContentLoaded works the correct way");
});

// ------

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
};

// ------

// Display the correct item in cart 
async function displayCartItem(title, price, imgSrc) {
    try {
        const cartItemContainer = document.querySelector(".cart-dropdown-content")

        const cartItem = document.createElement("div");
        cartItem.classList.add("cart-item");

        const imgElement = document.createElement("img");
        imgElement.classList.add("cart-img");
        imgElement.alt = title;
        imgElement.src = imgSrc;

        imgElement.onload = function () {
            cartItem.innerHTML = `
                <div class="cart-item-title">${title}</div>
                <img src="${imgSrc}" alt="${title}" class="cart-img">
                <div class="cart-item-info">
                    <div class="cart-item-price">${price}</div>
                </div>
                <button type="button" class="remove-item" value="Remove">Remove</button>
            `; 

        // cartItemContainer.innerHTML = ""; //replaces instead of adding
        cartItemContainer.appendChild(cartItem);
        console.log("The correct cart-item is displayed");

        // // Show the cart
        // dropdownCart.classList.add("active");

        const removeCartButtons = document.querySelectorAll(".remove-item");
        removeCartButtons.forEach(button => button.addEventListener("click", removeCartItem));
        console.log("Remove cart item when clicked button");

        updateTotal();
        saveCartToSessionStorage();
    };

        // Append the imgElement to the cartItem
        cartItem.appendChild(imgElement);

    } catch (error) {
        console.error("Error displaying data in cart:", error);
    }
};

async function saveCartToSessionStorage() {
    sessionStorage.removeItem("cart");
    console.log("The storage is empty before adding");

    const cartItems = document.querySelectorAll(".cart-item");
    const cartData = [];

    cartItems.forEach((cartItem) => {
        const title = cartItem.querySelector(".cart-item-title");
        const price = cartItem.querySelector(".cart-item-price");
        const imgSrc = cartItem.querySelector(".cart-img");

        cartData.push({title, price, imgSrc});
    });

    sessionStorage.setItem("cart", JSON.stringify(cartData));
    console.log("Cart data is correctly saved to the session storage");
};

//-------

// Cart-total outside
async function displayCartTotal(cartItems) {
    try {
        const cartTotalContainer = document.querySelector(".cart-dropdown-total");

        const total = Array.from(cartItems).reduce((acc, cartItem) => {
            const price = parseFloat(cartItem.querySelector(".cart-item-price"));
            const quantity = 1;
            return acc + (price * quantity);
        }, 0);  

        const cartTotal = document.createElement("div");
        cartTotal.classList.add("cart-total");
        cartTotal.innerHTML = ` 
            <div class="total-title">Total</div>
            <div class="total-price">${total}KR</div>
            <button type="submit" class="Pay">Pay</button>
        `;

        cartTotalContainer.innerHTML = "";
        cartTotalContainer.appendChild(cartTotal);
        console.log("The total and pay are displayed");

        updateTotal();

        const payButton = document.querySelector(".Pay");
        payButton.addEventListener("click", handlePayButtonClick);
        console.log("Event listener added to Pay Button");

    } catch (error) {
        console.error("Error adding total on checkout", error);
    }
};

async function handlePayButtonClick() {
    console.log("Pay button clicked");
    const cartItems = document.querySelectorAll(".cart-item");
    
    if (cartItems.length > 0) {
        const confirmPayment = confirm("Are you sure you want to proceed with the payment?");

        if (confirmPayment) 
            window.location.href = "checkout/../confirmation/index.html";
            console.log("Confirm and goes to confirmation page");


    } else {
            window.location.href = "checkout/../confirmation/index.html"
    }
};


// Update Total
async function updateTotal() {
        const cartItems = document.querySelectorAll(".cart-item");
        const totalValue = document.querySelector(".total-price");

        let total = 0;

        console.log("Total before calculation", total)
    
        cartItems.forEach(cartItem => {
            const priceElement = cartItem.querySelector(".cart-item-price");

        if (priceElement && priceElement.innerText) {
            const price = parseFloat(priceElement.innerText.replace("0KR", "")) || 0;
            const quantityElement = 1;
            total = total + (price * quantityElement);
        };

        });

        console.log("Total after calcuation", total) // NaN

        // If price contains many decimals
        total = Math.round(total * 100) / 100;
        
        totalValue.innerText = `${total}KR`;

    };

function removeCartItem(event){
    const buttonClicked = event.target;
    const cartItem = buttonClicked.closest(".cart-item");

    cartItem.remove();
    console.log("The closest cart item is removed when clicked");

    updateTotal();
};

function ready() {
    const removeCartButtons = document.querySelectorAll (".remove-item");
    removeCartButtons.forEach(button => button.addEventListener("click", removeCartItem));
};

updateTotal();

document.addEventListener("DOMContentLoaded", ready);

// ------

async function displayMovies(movies) {
    try {
        const moviesContainer = document.querySelector(".movie-container");

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

        });

        console.log("Movies displayed successfully");
    } catch (error) {
        console.error("Error displaying movies", error);
    }
};

async function addCart(title, price, imgSrc) {
     console.log(title, price, imgSrc);

displayCartItem(title, price, imgSrc);
    
updateTotal();
     
};


document.addEventListener("DOMContentLoaded", async () => {
    // await GenreFilter();
    const movies = await fetchMovies();
    await displayMovies(movies);
});

// ------

// Check Out Page
// Session storage - store the data to the checkout page

async function loadCartFromSessionStorage() {
    const savedCart = sessionStorage.getItem("cart");

    if (savedCart) {
        clearCart();

        const cartData = JSON.parse(savedCart);

        cartData.forEach(({title, price, imgSrc }) => {
            displayCartItem(title, price, imgSrc);
        });

    updateTotal();

    console.log("Loaded cart - The cart data is loaded and saved from the session storage");
    }
};

function clearCart() {
    const cartItemContainer = document.querySelector(".cart-item");
    cartItemContainer.innerHTML = "";
};

async function main () {
    try {
        const movies = await fetchMovies();
        await displayMovies(movies);
        await loadCartFromSessionStorage();
        await displayCartTotal(document.querySelectorAll(".cart-item"));
        await updateTotal();

        console.log("The main is not working");

    } catch (error) {
        console.error("Error in the main async function:", error);
    }
};

document.addEventListener("DOMContentLoaded", main);
