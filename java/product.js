// Loading indicator
window.addEventListener("load", () => {
    const loader = document.querySelector(".loader");
    loader.classList.add("loader-hidden");
    loader.addEventListener("transitionend", () => {
        loader.remove();  
    });
});

document.addEventListener("DOMContentLoaded", async function () {
    try {
        // Get movie ID from URL parameters
        const urlParams = new URLSearchParams(window.location.search);
        const movieId = urlParams.get("id");

        // Fetch movie details using the movie ID
        const movieDetails = await fetchMovieDetails(movieId);

        // Store the movie details in local storage
        localStorage.setItem("selectedMovie", JSON.stringify(movieDetails));

        displayMovieDetails(movieDetails);

    } catch (error) {
        console.error("Error loading movie details", error);
        alert("Error loading movie details. Please try again later.");
    }
});

// async function handleMovieClick(movie) {
//     window.location.href = `./product/index.html?id=${movie.id}`;
// };

async function fetchMovieDetails(movieId) {
    try {
        const response = await fetch(`https://v2.api.noroff.dev/square-eyes/${movieId}`);
        const movieDetails = await response.json();

    // Check if the API response is in the expected format
    if (movieDetails && typeof movieDetails === 'object') {
        return movieDetails;
    } else {
        throw new Error("Movie not found");
    }
    } catch (error) {
        console.error("Error fetching movie details:", error);
        alert("Error fetching movie details. Please try again later.");
        return null; 
    }
};

function displayMovieDetails(movieDetails) {
    const productContainer = document.querySelector(".movie-page");

    const movieElement = document.createElement("div");
    movieElement.classList.add("movie-page-cover");

    // Is the movie is on sale or not (both ways)
    const isOnSale = movieDetails.onSale === true;

    movieElement.innerHTML = `
        <img src="${movieDetails.image}" alt="${movieDetails.title}" id="${movieDetails.id}">
        <h1>${movieDetails.title}</h1>
        <div class="movie-index">
            <p>Genre: ${movieDetails.genre}</p>
            <p>Year: ${movieDetails.released}</p>
            <p>Rating: ${movieDetails.rating}</p>
        </div>
        <h2>About this movie</h2>
        <p>${movieDetails.description}</p>
        <div class="sale-container">
            ${isOnSale ? `
                <p class="original-price">${movieDetails.price}KR</p>
                <p>${movieDetails.discountedPrice}KR <i class="fa-solid fa-cart-plus" alt="Add to cart icon"></i></p>
            ` : `
                <p>${movieDetails.price}KR <i class="fa-solid fa-cart-plus" alt="Add to cart icon"></i></p>
            `}
        </div>
    `;

    productContainer.appendChild(movieElement);
};

// Add to cart from movie-page and check out from there --> if time

// async function addCart(title, price, imgSrc) {

//     displayCartItem(title, price, imgSrc);
//      updateTotal();
//  };

// async function handleCheckOutButtonClick() {
//     const cartItems = document.querySelectorAll(".cart-item");
    
//     if (cartItems.length === 0) {
//         alert("Your cart is empty. Add some items before checking out!")
//     } else {
//         window.location.href = "./checkout/index.html";
//     }
// };



// "You might also like"..section

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

async function displayMovies(movies) {
    try {
        const moviesContainer = document.querySelector(".you-might-movie-container");

        // Clear existing innerHTML content
        moviesContainer.innerHTML = "";

        movies.slice(3, 6).forEach(movie => {
            const movieElement = document.createElement("div");
            movieElement.classList.add("movie");
            movieElement.innerHTML = `
                <img src="${movie.image.url}" alt="${movie.title}">
            `;

            movieElement.addEventListener("click", () => handleMovieClick(movie));

            moviesContainer.appendChild(movieElement);
            // movieElement.appendChild(moviePriceElement);

        });

    } catch (error) {
        console.error("Error displaying movies", error);
        alert("Error displaying movies. Please try again later.");
    }
};


document.addEventListener("DOMContentLoaded", async () => {
    try {
        const movies = await fetchMovies();
        await displayMovies(movies);
    } catch (error) {
        console.error("Error in DOMContentLoaded event listener", error);
        alert("An unexpected error occurred. Please try again later.");
    }
});

