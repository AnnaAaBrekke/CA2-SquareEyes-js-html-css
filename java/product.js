
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

        displayMovieDetails(movieDetails);

    } catch (error) {
        console.error("Error loading movie details", error);
    }
});

async function fetchMovieDetails(movieId) {
    try {
        const response = await fetch(`https://v2.api.noroff.dev/square-eyes/b9e4edb1-e798-45e3-9c46-f7cd75b9326f/?=${movieId}`);
        const data = await response.json();

        if (data && data.data) {
            return data.data;
        } else {
            console.error("Invalid id format from the API");
            return [];
        }
    } catch (error) {
        console.error("Error fetching id details:", error);
        return [];
    }
};

function displayMovieDetails(movieDetails) {
    const productContainer = document.querySelector(".movie-page");

    const movieElement = document.createElement("div");
    movieElement.classList.add("movie-page-cover");

    // Is the movie is on sale or not (both ways)
    const isOnSale = movieDetails.onSale === true;

    movieElement.innerHTML = `
        <img src="${movieDetails.image.url}" alt="${movieDetails.title}">
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

// You might also like..section

// Fetch movies from the API
async function fetchMovies() {
    try {
        const response = await fetch("https://v2.api.noroff.dev/square-eyes");
        const data = await response.json();

        if (Array.isArray(data.data)) {
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

            const moviePriceElement = document.createElement("div");
            moviePriceElement.classList.add("price-movie");
            moviePriceElement.innerHTML = `
                <div class="price-movie">
                    <i class="fa-solid fa-cart-plus" alt="Add to cart icon"></i>
                    <span class="product-price">${movie.price} KR</span>
                </div>
            `;

            movieElement.addEventListener("click", () => detailedMovie(movie.id));

            moviesContainer.appendChild(movieElement);
            movieElement.appendChild(moviePriceElement);

        });

    } catch (error) {
        console.error("Error displaying movies", error);
    }
};


document.addEventListener("DOMContentLoaded", async () => {
    const movies = await fetchMovies();
    await displayMovies(movies);
});

