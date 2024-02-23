// Fetch API ✅
// Display movies ✅
// User can filter by genre ✅

// A container to hold the items in the cart ✅
// A function to add items to the cart ✅
// A function to remove items from the cart ✅
// A function to calculate the total cost of the items in the cart ✅
// An event listener to add items to the cart when the user clicks the 'Add to Cart' button ✅
// An event listener to remove items from the cart when the user clicks the 'Remove' button ✅

// The ability to save the cart data to the local storage/session storage  ✅
// An event listener to submit items from the cart when the user clicks the 'Check Out' button  ✅
// Redirect to the Check  Out Page ✅
// A check out page ✅
// Display the cart data to a check out page ✅

// An event listener to pay items from the cart when the user clicks the 'Pay' button and redirect to the Confirmation page ✅
// Confirmation order page on successfully  ✅

// Alert where needed ✅
// Confirm where needed ✅

// As a user, I want to view a single product page with more detail.🚫
// Add to cart from the movie-page detailed as well 🚫

// Clean up 
// Export / Import 🚫
// CSS ✅

// Reviews: That is what Oliver answered  : "Reviews are not marked, and we should be able to see comments on the actual PR page itself" So the idea is to check the code of the student and make some pull request with some comment 🙂Something to fix for example

// Change to correct URLS ✅
// Loading ERRORS 
// Remove Console Logs

const API_BASE = "https://v2.api.noroff.dev/square-eyes";

// DomContent Loads
document.addEventListener("DOMContentLoaded", function () {
    loadCartFromSessionStorage();
    console.log("DOMContentLoaded works the correct way");
});

// ---------

// Cart
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




// Display the correct item in cart 
let isCartEmpty = true; // Variable to track if the cart is empty

  async function displayCartItem(title, price, imgSrc) {
    try {
        const cartItemContainer = document.querySelector(".cart-dropdown-content");

        const cartItem = document.createElement("div");
        cartItem.classList.add("cart-item");

        const imgElement = document.createElement("img");
        imgElement.classList.add("cart-img");
        imgElement.alt = title;
        imgElement.src = imgSrc;

        imgElement.onload = function () {
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

            // Checking if the cart is empty
            if (isCartEmpty) {
                // Replacing the existing content if the cart is empty
                cartItemContainer.innerHTML = "";
                isCartEmpty = false;
            }

            // Append the new item directly to the container
            cartItemContainer.appendChild(newCartItem);
            console.log("A new cart-item is displayed");

            // Show the cart
            dropdownCart.classList.add("active");

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
        const title = cartItem.querySelector(".cart-item-title").innerText;
        const price = cartItem.querySelector(".cart-item-price").innerText;
        const imgSrc = cartItem.querySelector(".cart-img").src;

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

            cartTotal.innerHTML =  ` 
                <div class="total-title">Total:</div>
                <div class="total-price">${total}KR</div>
                <button type="submit" class="check-out">Check out</button>
                <i class="fa-solid fa-xmark" id="close-cart"></i>
                `;
            

            cartTotalContainer.innerHTML = "";
            cartTotalContainer.appendChild(cartTotal);
            console.log("The total and check out is displayed");

            updateTotal();

            const CheckOutButton = document.querySelector(".check-out");
            CheckOutButton.addEventListener("click", handleCheckOutButtonClick);
            console.log("Check Out button clicked");


    } catch (error) {
        console.error("Error adding submit and total", error);
    }
};

async function handleCheckOutButtonClick() {
    const cartItems = document.querySelectorAll(".cart-item");
    
    if (cartItems.length === 0) {
        alert("Your cart is empty. Add some items before checking out!")
        console.log("Check Out button clicked and find no items in cart");
    } else {
        window.location.href = "checkout/index.html";
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
                const price = parseFloat(priceElement.innerText.replace("KR", "")) || 0;
                const quantityElement = 1;
                total = total + (price * quantityElement);
            };

        });

        console.log("Total after calcualtion", total) // NaN

        // If price contains many decimals
        total = Math.round(total * 100) / 100;
        
        totalValue.innerText = `${total}KR`;

    };


  function removeCartItem(event){
    const buttonClicked = event.target;
    const cartItem = buttonClicked.closest(".cart-item");

        const cartItemContainer = document.querySelector(".cart-dropdown-content");
        isCartEmpty = cartItemContainer.children.length === 0;
    
        // If the cart is empty, clear the container
        if (isCartEmpty) {
            cartItemContainer.innerHTML = "";
            console.log("InnerHTML is gone");
        }

    cartItem.remove();
    console.log("The closest cart item is removed when clicked");

    updateTotal();
};


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


        // Event listener to each movie poster image
        const detailedMovieElement = movieElement.querySelector(".movie-container img");
        detailedMovieElement.addEventListener("click", () => handleMovieClick(movie));
    });

    console.log("Movies displayed successfully");

    } catch (error) {
        console.error("Error displaying movies", error);
    };
};

async function handleMovieClick(movie) {
    try {
        console.log("Clicked movie ID:", movie.id);

        if (movie.title && Object.keys(movie.title).length !== 0) {
            window.location.assign(`product/index.html?id=${movie.id}`);
            console.log("Movie details found:", movie.title);
        } else {
            const movieDetails = await fetchMovieDetails(movie.id);

            if (movieDetails && Object.keys(movieDetails).length !== 0) {
                // Save the movie details to sessionStorage for retrieval on the product page
                sessionStorage.setItem("selectedMovie", JSON.stringify(movieDetails));

                window.location.assign(`product/index.html?id=${movie.id}`);
                console.log("Movie details fetched:", movieDetails);
            } else {
                console.error("Movie details not found");
            }
        }
    } catch (error) {
        console.error("Error handling movie click:", error);
    }
};


async function fetchMovieDetails(id) {
    try {
        const response = await fetch((`${API_BASE}/${id}`), {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const data = await response.json();

        if (data && data.data) {
            console.log("API movie details", data.data);
            return data.data;
        } else {
            console.error("Invalid detailed data format from the API");
            return {};
        }
    } catch (error) {
        console.error("Error fetching movie details:", error);
        return {};
    }
};


document.querySelector(".movie-container").addEventListener("click", async (event)=> {
    if (event.target.classList.contains("fa-cart-plus")){
        const movieContainer = event.target.closest(".movie");
        const imgSrc = movieContainer.querySelector("img").src;
        const title = movieContainer.querySelector("img").alt;
        const price = parseFloat(movieContainer.querySelector(".product-price").innerText.replace(" KR", ""));
        
        console.log(title, price, imgSrc);

        const movieDetails = await fetchMovieDetails(movieContainer.dataset.movieId);
          // Display the details
          if (movieDetails && Object.keys(movieDetails).length !== 0) {
            displayDetailedMovie(movieDetails);
        } else {
            console.error("Movie details not found");
        }


        displayCartItem(title, price, imgSrc);
        updateTotal();
    }
});

  async function addCart(title, price, imgSrc) {
     console.log(title, price, imgSrc);

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
};

// Add event listener to the genre buttons to trigger movie filtering
document.querySelector(".filter-container").addEventListener("click", async (event) => {
    if (event.target.classList.contains("genre-button")) {
        const selectedGenre = event.target.getAttribute("data-genre");
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
    const cartItemContainer = document.querySelector(".cart-dropdown-content");
    cartItemContainer.innerHTML = "";
};

updateTotal();

async function main () {
    try {
        const movies = await fetchMovies();
        await GenreFilter();
        await displayMovies(movies);
        // await handleMovieClick();
        // await fetchMoviesDetails();

        await loadCartFromSessionStorage();

        await displayCartTotal(document.querySelectorAll(".cart-item"));
        await updateTotal();

        console.log("The main is not working");

    } catch (error) {
        console.error("Error in the main async function:", error);
    }
};

document.addEventListener("DOMContentLoaded", main);

