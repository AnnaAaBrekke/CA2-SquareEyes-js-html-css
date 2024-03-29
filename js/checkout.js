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
    loadCartFromLocalStorage();
});



// Fetch movies from the API
async function fetchMovies() {
    try {
        const response = await fetch("https://v2.api.noroff.dev/square-eyes");
        const data = await response.json();

        if (Array.isArray(data.data)) {
            return data.data;
        } else {
            throw new Error("Invalid data format from the API");
        }
    } catch (error) {
        console.error("Error fetching movies:", error);
        alert("Error fetching movies. Please try again later.");
        return [];
    }
};



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

        cartItemContainer.appendChild(cartItem);

        const removeCartButtons = document.querySelectorAll(".remove-item");
        removeCartButtons.forEach(button => button.addEventListener("click", removeCartItem));

        updateTotal();
        saveCartToLocalStorage();
    };

        // Append the imgElement to the cartItem
        cartItem.appendChild(imgElement);

    } catch (error) {
        console.error("Error displaying data in cart:", error);
        alert("Error displaying cart item. Please try again later.");
    }
};

async function saveCartToLocalStorage() {
    localStorage.removeItem(".cart");

    const cartItems = document.querySelectorAll(".cart-item");
    const cartData = [];

    cartItems.forEach((cartItem) => {
        const title = cartItem.querySelector(".cart-item-title");
        const price = cartItem.querySelector(".cart-item-price");
        const imgSrc = cartItem.querySelector(".cart-img");

        cartData.push({title, price, imgSrc});
    });

    localStorage.setItem("cart", JSON.stringify(cartData));
};


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

        updateTotal();

        const payButton = document.querySelector(".Pay");
        payButton.addEventListener("click", handlePayButtonClick);

    } catch (error) {
        console.error("Error adding total on checkout", error);
    }
};

async function handlePayButtonClick() {
    const cartItems = document.querySelectorAll(".cart-item");
    
    if (cartItems.length > 0) {
        const confirmPayment = confirm("Are you sure you want to proceed with the payment?");

        if (confirmPayment) 
            window.location.href = "checkout/../confirmation/index.html";

    } else {
            window.location.href = "checkout/../confirmation/index.html"
    }
};


// Update Total
async function updateTotal() {
        const cartItems = document.querySelectorAll(".cart-item");
        const totalValue = document.querySelector(".total-price");

        let total = 0;
    
        cartItems.forEach(cartItem => {
            const priceElement = cartItem.querySelector(".cart-item-price");

        if (priceElement && priceElement.innerText) {
            const price = parseFloat(priceElement.innerText.replace("0KR", "")) || 0;
            const quantityElement = 1;
            total = total + (price * quantityElement);
        };

        });

        // If price contains many decimals
        total = Math.round(total * 100) / 100;
        
        totalValue.innerText = `${total}KR`;

    };

    function removeCartItem(event){
        const buttonClicked = event.target;
        const cartItem = buttonClicked.closest(".cart-item");
    
        const titleToRemove = cartItem.dataset.title;    
        findAndRemoveProduct(titleToRemove);
    
        const cartItemContainer = document.querySelector(".cart-dropdown-content");
        isCartEmpty = cartItemContainer.children.length === 0;
    
        // If the cart is empty, clear the container
        if (isCartEmpty) {
            cartItemContainer.innerHTML = "";
        }
    
        cartItem.remove();
        updateTotal();
    };
    
    function findAndRemoveProduct(title) {
        let cart = JSON.parse(localStorage.cart);
    
        if (cart.length === 1) {
            localStorage.removeItem(".cart-item") //If only 1 item in cart, clear it.
    
        } else {
            let indexToRemove = cart.findIndex((movie) => 
            movie.title === title); // Find the first instance of the movie inside the cart
    
        if (indexToRemove !== -1) {
            cart.splice(indexToRemove, 1) // Remove it from cart variable
            localStorage.cart = JSON.stringify(cart); // Add the updated cart to localStorage
        } else {
            console.log("No match.");
        }
    }   
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

    } catch (error) {
        console.error("Error displaying movies", error);
        alert("Error displaying movies. Please try again later.");
    }
};

async function addCart(title, price, imgSrc) {

displayCartItem(title, price, imgSrc);
    
updateTotal();
     
};


document.addEventListener("DOMContentLoaded", async () => {
    // await GenreFilter();
    const movies = await fetchMovies();
    await displayMovies(movies);
});


// Check Out Page
// Local storage - store the data to the checkout page

async function loadCartFromLocalStorage() {
    const savedCart = localStorage.getItem("cart");

    if (savedCart) {
        clearCart();

        const cartData = JSON.parse(savedCart);

        cartData.forEach(({title, price, imgSrc }) => {
            displayCartItem(title, price, imgSrc);
        });

    updateTotal();

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
        await loadCartFromLocalStorage();
        await displayCartTotal(document.querySelectorAll(".cart-item"));
        await updateTotal();

    } catch (error) {
        console.error("Error in the main async function:", error);
        alert("Error occurred. Please try again later.");
    }
};

document.addEventListener("DOMContentLoaded", main);
