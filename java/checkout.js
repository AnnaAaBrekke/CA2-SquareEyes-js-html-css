// const API_BASE = "https://v2.api.noroff.dev/square-eyes";
// let dropdownCart = document.querySelector(".cart-container");

document.addEventListener("DOMContentLoaded", async function () {
    const movies = await fetchMovies();
    await saveCartToSessionStorage();
    await loadCartFromSessionStorage();
    await displayCartItem();
    await updateTotal();
    console.log("DOMContentLoaded works the correct way");
});

// Fetch movies from the API
async function fetchMovies() {
    try {
        console.log("API URL:", API_BASE);
        const response = await fetch(API_BASE);
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

// Display cart item
async function displayCartItem(title, price, imgSrc) {
    try {
        const cartItemContainer = document.querySelector(".cart-dropdown-content");

        const cartItem = document.createElement("div");
        cartItem.classList.add("cart-item");

        const imgElement = document.createElement("img");
        imgElement.classList.add("cart-img");
        imgElement.alt = title;
        imgElement.src = imgSrc;

        const newCartItem = document.createElement("div");
        newCartItem.classList.add("cart-item");

        newCartItem.innerHTML = `
            <img src="${imgSrc}" alt="${title}" class="cart-img">
            <div class="cart-item-info">
                <div class="cart-item-title">${title}</div>
                <div class="cart-item-price">${price}KR</div>
            </div>
            <button type="button" class="remove-item" value="Remove">Remove</button>
        `;

        // Append the new item directly to the container without clearing
        cartItemContainer.appendChild(newCartItem);
        console.log("A new cart-item is displayed");

        // dropdownCart.classList.add("active");

        const removeCartButtons = document.querySelectorAll(".remove-item");
        removeCartButtons.forEach(button => button.addEventListener("click", removeCartItem));
        console.log("Remove cart item when clicked button");

        updateTotal();
        saveCartToSessionStorage();
    } catch (error) {
        console.error("Error displaying data in cart:", error);
    }
};

// Save cart to session storage
async function saveCartToSessionStorage() {
    // sessionStorage.removeItem("cart");
    console.log("The storage is not cleared before adding");

    const cartItems = document.querySelectorAll(".cart-item");
    const cartData = [];

    cartItems.forEach((cartItem) => {
        const title = cartItem.querySelector(".cart-item-title").innerText;
        const price = cartItem.querySelector(".cart-item-price").innerText;
        const imgSrc = cartItem.querySelector(".cart-img").src;

        cartData.push({ title, price, imgSrc });
    });

    sessionStorage.setItem("cart", JSON.stringify(cartData));
    console.log("Cart data is correctly saved to the session storage");
};

// Display cart total
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
            <div class="total-title">Total:</div>
            <div class="total-price">${total}KR</div>
            <button type="submit" class="Pay">Pay</button>
        `;

        cartTotalContainer.innerHTML = "";
        cartTotalContainer.appendChild(cartTotal);
        console.log("The total and check out is displayed");

        updateTotal();

        const payButton = document.querySelector(".Pay");
        payButton.addEventListener("click", handlePayButtonClick);
        console.log("Event listener added to Pay Button");

    } catch (error) {
        console.error("Error adding submit and total", error);
    }
};

async function handlePayButtonClick() {
    console.log("Pay button clicked");
    const cartItems = document.querySelectorAll(".cart-item");
    
    if (cartItems.length > 0) {
        const confirmPayment = confirm("Are you sure you want to proceed with the payment?");

        if (confirmPayment) 
            window.location.href = "checkout/../confirmation/index.html";
        
    } else {
            window.location.href = "checkout/../confirmation/index.html"
    }
};

// Update total
async function updateTotal() {
    const cartItems = document.querySelectorAll(".cart-item");
    const totalValue = document.querySelector(".total-price");

    let total = 0;

    cartItems.forEach(cartItem => {
        const priceElement = cartItem.querySelector(".cart-item-price");

        if (priceElement && priceElement.innerText) {
            const price = parseFloat(priceElement.innerText.replace("KR", "")) || 0;
            const quantityElement = 1;
            total = total + (price * quantityElement);
        };

    });

    console.log("Total after calculation", total);

    // If price contains many decimals
    total = Math.round(total * 100) / 100;

    totalValue.innerText = `${total}KR`;
    console.log("Total is displayed correct")
};


function removeCartItem(event) {
    try {
        const buttonClicked = event.target;
        const cartItem = buttonClicked.closest(".cart-item");
        console.log("Found the remove-button");

        if (cartItem) {
            cartItem.remove();
            console.log("The closest cart item is removed when clicked");

            updateTotal();
            saveCartToSessionStorage();
        } else {
            console.error("Could not find the cart item to remove.");
        }
    } catch (error) {
        console.error("Error removing cart item:", error);
    }
}

document.addEventListener("DOMContentLoaded", function () {
    // Simulate a fake click on remove buttons when the page loads
    const removeCartButtons = document.querySelectorAll(".remove-item");
    removeCartButtons.forEach(button => button.click());
});

// ------

// // async function addCart(title, price, imgSrc) {
// //      console.log(title, price, imgSrc);

// displayCartItem(title, price, imgSrc);
// updateTotal();
     

// document.addEventListener("DOMContentLoaded", async () => {
//     const movies = await fetchMovies();
//     await displayMovies(movies);
// });


// Session storage - store the data to the checkout page
// async function loadCartFromSessionStorage() {
//     const savedCart = sessionStorage.getItem("cart");

//     if (savedCart) {
//         clearCart();

//         const cartData = JSON.parse(savedCart);

//         cartData.forEach(({title, price, imgSrc }) => {
//             displayCartItem(title, price, imgSrc);
//         });

//     updateTotal();

//     console.log("Loaded cart - The cart data is loaded and saved from the session storage");
//     }
// };

// function clearCart() {
//     const cartItemContainer = document.querySelector(".cart-dropdown-content");
//     cartItemContainer.innerHTML = "";
// };

// Session storage - store the data to the checkout page
async function loadCartFromSessionStorage() {
    try {
        const savedCart = sessionStorage.getItem("cart");

        if (savedCart) {
            const cartData = JSON.parse(savedCart);

            cartData.forEach(({ title, price, imgSrc }) => {
                displayCartItem(title, price, imgSrc);
            });

            updateTotal();

            console.log("Loaded cart - The cart data is loaded and saved from the session storage");
        }
    } catch (error) {
        console.error("Error loading cart from session storage:", error);
    }
};


async function displayMovies(movies) {
    try {
        const moviesContainer = document.querySelector(".movie-container");
        console.log("Found the movie-container");

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
};





