// DomContentet Loads
document.addEventListener("DOMContentLoaded", function () {
    console.log("DOMContentLoaded works the correct way");
});


// A container to hold the items in the cart ✅
// A function to add items to the cart ✅
// A function to remove items from the cart ✅
// A function to calculate the total cost of the items in the cart 👩🏽‍💻
// An event listener to add items to the cart when the user clicks the 'Add to Cart' button ✅
// An event listener to remove items from the cart when the user clicks the 'Remove' button ✅
// A display of the number of items in the cart and the total cost 👩🏽‍💻
// The ability to save the cart data to the local storage or a cookie 

// ---------

//Cart
let cartIcon = document.querySelector("#cart-icon");
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
        // const movies = await fetchMovies();
        const cartItemContainer = document.querySelector(".cart-dropdown-content");
        // const movie = movies[6]; // OR: const movie = movies.find(movie => movie.title === "Once Upon A Time In Hollywood"); (this is probably better if the array changes?)

        const cartItem = document.createElement("div");
        cartItem.classList.add("cart-item");
        cartItem.innerHTML = `
            <img src="${imgSrc}" alt="${title}" class="cart-img">
            <div class="cart-item-info">
                <div class="cart-item-title">${title}</div>
                <div class="cart-item-price">${price}KR</div>
            </div>
            <input type="number" value="1" class="quantity">
            <button type="button" class="remove-item" value="Remove">Remove</button>
        `; 

        // cartItemContainer.innerHTML = ""; replaces instead of adding
        cartItemContainer.appendChild(cartItem);
        console.log("The correct cart-item is displayed");

        // Show the cart
        dropdownCart.classList.add("active");

        const removeCartButtons = document.querySelectorAll(".remove-item");
        removeCartButtons.forEach(button => button.addEventListener("click", removeCartItem));
        console.log("Remove cart item when clicked button");

        updateTotal()

    } catch (error) {
        console.error("Error displaying data in cart:", error);
    }
}

//-------

// Cart-total outside
async function displayCartTotal(cartItems) {
    try {
        const cartTotalContainer = document.querySelector(".cart-dropdown-total");
        const total = cartItems.reduce((acc, cartItem) => {
            const price = parseFloat(cartItem.querySelector(".cart-item-price").innerText.replace("KR", ""));
            const quantity = parseFloat(cartItem.querySelector(".quantity").value);
            return acc + (price * quantity);
        }, 0);

            const cartTotal = document.createElement("div");
            cartTotal.classList.add("cart-total");
            cartTotal.innerHTML =  ` 
                <div class="total-title">Total</div>
                <div class="total-price">${movies.price}KR</div>
                <button type="submit" class="check-out">Check out</button>
                <i class="fa-solid fa-xmark" id="close-cart"></i>
                `;

            cartTotalContainer.innerHTML = "";
            cartTotalContainer.appendChild(cartTotal);
            console.log("The total and check out is displayed");

            updateTotal();

    } catch (error) {
        console.error("Error adding submit and total", error);
    }
};


// Quantity Changes

async function quantityChanged() {
    if (isNaN(this.value) || this.value<1) {
        this.value = 1;
    }  
    displayCartItem(title, price, imgSrc);
    updateTotal()
}

 const quantityInputs = document.querySelectorAll(".quantity");

quantityInputs.forEach(input => {
    input.addEventListener("change", quantityChanged);
});

//    for (let i = 0; i < quantityInputs.length; i++) {
//        const input = quantityInputs[i];
//        input.addEventListener("change", quantityChanged);

 updateTotal()
 console.log("Total after changing the quantity", quantityChanged);


// Update Total
async function updateTotal() {
        const cartItems = document.querySelectorAll(".cart-item");
        const totalValue=document.querySelector(".total-price");

        let total = 0;

        console.log("Total before calculation", total)
    
        cartItems.forEach(cartItem => {
            
            const priceElement = cartItem.querySelector(".cart-item-price");
            const price = parseFloat(priceElement.innerText.replace("KR", "")) || 0;
            const quantityElement = cartItem.querySelector(".quantity").value;
            total = total + (price * quantityElement);
        });

        console.log("Total after calcuation", total) // NaN

        // If price contains many decimals
        total = Math.round(total * 100) / 100;
        
        totalValue.innerText = `${total}KR`;

    }


function ready() {
    const removeCartButtons = document.querySelectorAll (".remove-item");
    removeCartButtons.forEach(button => button.addEventListener("click", removeCartItem));
}

function removeCartItem(event){
    const buttonClicked = event.target;
    const cartItem = buttonClicked.closest(".cart-item");

    cartItem.remove();
    console.log("The closest cart item is removed when clicked");

    updateTotal()
}

document.addEventListener("DOMContentLoaded", ready);

// ------

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
};


document.querySelector(".movie-container").addEventListener("click", async (event)=> {
    if (event.target.classList.contains("fa-cart-plus")){
        const movieContainer = event.target.closest(".movie");
        const imgSrc = movieContainer.querySelector("img").src;
        const title = movieContainer.querySelector("img").alt;
        const price = parseFloat(movieContainer.querySelector(".product-price").innerText.replace(" KR", ""));
        console.log(title, price, imgSrc);

        displayCartItem(title, price, imgSrc);
        updateTotal()
    }
}) 

async function addCart() {
    const imgSrc = querySelector("img").src;
    const title = querySelector(".product-price").innerText;
    const price = parseFloat(title.replace(" KR", ""));
    console.log(title, price, imgSrc);

    // Do something with the extracted information, e.g., add to the cart
    displayCartItem(title, price, imgSrc);
    updateTotal();
};

async function GenreFilter() {
    try {
        const movies = await fetchMovies();
        const genres = [...new Set (movies.map(movie => movie.genre))];
        const filterContainer = document.querySelector(".filter-container");

        genres.forEach (genre =>{
            const button = document.createElement("button");
            button.classList.add("genre-button");
            button.textContent = genre;
            button.dataset.genre = genre;
            filterContainer.appendChild(button);
            console.log("Button for genres is created")
        });
    } catch (error) {
        console.error("Error creating a filter for genres", error);
    }
}

// Add event listener to the genre buttons to trigger movie filtering
document.querySelector(".filter-container").addEventListener("click", async (event) => {
    if (event.target.classList.contains("genre-button")) {
        const selectedGenre = event.target.dataset.genre;
        const movies = await fetchMovies();
        const filteredMovies = movies.filter(movie => selectedGenre === "" || movie.genre === selectedGenre);
        await displayMovies(filteredMovies);
    }
});

document.addEventListener("DOMContentLoaded", async () => {
    await GenreFilter();
    const movies = await fetchMovies();
    await displayMovies(movies);
});

// ------


//fetchMovies().then(displayMovies);// - need to use async instead

async function main () {
    try {
        const movies = await fetchMovies();
        await GenreFilter();
        await displayMovies(movies);

        // Wait for user interactions (adding items to the cart)
        await addCart();
        await quantityChanged();

        // Display the initial cart items and total
        await displayCartItem();
        await displayCartTotal();

        await updateTotal ();

        console.log("The main is not working");

    } catch (error) {
        console.error("Error in the main async function:", error);
    }
}

main();