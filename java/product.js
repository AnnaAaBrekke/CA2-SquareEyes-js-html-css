window.addEventListener("load", () => {
const loader = document.querySelector(".loader");
loader.classList.add("loader-hidden");
loader.addEventListener("transitionend", () => loader.remove());
});

document.addEventListener("DOMContentLoaded", async () => {
try {
    // Get movie ID from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const movieId = urlParams.get("id");

    // Fetch movie details
    const movieDetails = await fetchMovieDetails(movieId);
    if (!movieDetails) {
    console.error("Error fetching movie details");
    // Handle error (e.g., display error message to user)
    return;
    }

    // Display movie details
    displayMovieDetails(movieDetails);

} catch (error) {
    console.error("Error loading movie details:", error);
    alert("An unexpected error occurred. Please try again later.");
}
});

async function fetchMovieDetails(movieId) {
try {
    const url = `https://v2.api.noroff.dev/square-eyes/${movieId}`;
    const response = await fetch(url);

    if (!response.ok) {
    throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();
    if (data && typeof data === 'object' && data.data) {
    return data.data;
    } else {
    throw new Error("Invalid data format from the API");
    }
} catch (error) {
    console.error("Error fetching movie details:", error);
    return null;
}
}

function displayMovieDetails(movieDetails) {
const movieContainer = document.querySelector(".movie-page-cover");
movieContainer.innerHTML = `
    <img src="${movieDetails.image.url}" alt="${movieDetails.title}" id="${movieDetails.id}">
    <h1>${movieDetails.title}</h1>
        <div class="movie-index">
            <p>Genre: ${movieDetails.genre}</p>
            <p>Year: ${movieDetails.released}</p>
            <p>Rating: ${movieDetails.rating}</p>
        </div>
        <h2>About this movie</h2>
        <p>${movieDetails.description}</p>
        <div class="sale-container">
            ${
                movieDetails.discountedPrice && movieDetails.discountedPrice !== movieDetails.price ?
                `
                <p class="original-price">${movieDetails.price}KR</p>
                <p>${movieDetails.discountedPrice}KR</p>
                ` :
                `
                <p>${movieDetails.price}KR</p>
                `
            }
        </div>
    `;
}

async function fetchMovies() {
try {
    const response = await fetch("https://v2.api.noroff.dev/square-eyes");
    if (!response.ok) {
    throw new Error(`API request failed with status ${response.status}`);
    }
    const data = await response.json();
    if (Array.isArray(data.data)) {
    return data.data.slice(3, 6); // Assuming you want 3 recommended movies
    } else {
    throw new Error("Invalid data format from the API");
    }
} catch (error) {
    console.error("Error fetching recommended movies:", error);
    return null;
}
}

function displayMovies(movies) {
const moviesContainer = document.querySelector(".you-might-movie-container");
moviesContainer.innerHTML = ""; // Clear existing content

movies.forEach(movie => {
    const movieElement = document.createElement("div");
    movieElement.classList.add("movie"); // Assuming a CSS class for styling
    movieElement.innerHTML = `
    <img src="${movie.image.url}" alt="${movie.title}">
    `;
    moviesContainer.appendChild(movieElement);
});
}
