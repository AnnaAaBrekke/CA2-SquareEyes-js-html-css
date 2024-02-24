// document.addEventListener("DOMContentLoaded", async () => {
//     // Retrieve the saved movie details from sessionStorage
//     const selectedMovie = JSON.parse(sessionStorage.getItem("selectedMovie"));

//     if (selectedMovie && Object.keys(selectedMovie).length !== 0) {
//         await displayDetailedMovie(selectedMovie);
//     } else {
//         console.error("Selected movie details not found");
//     }
// });

// product.js

document.addEventListener("DOMContentLoaded", async function () {
    try {
        // Get movie ID from URL parameters
        const urlParams = new URLSearchParams(window.location.search);
        const movieId = urlParams.get("id");

        console.log(movieId);

        // Fetch movie details using the movie ID
        const movieDetails = await fetchMovieDetails(movieId);

        displayMovieDetails(movieDetails);

    } catch (error) {
        console.error("Error loading movie details", error);
    }
});

async function fetchMovieDetails(movieId) {
    try {
        const response = await fetch(`https://v2.api.noroff.dev/square-eyes/4696b9e6-ec6e-4672-a08d-3e3212a215c8/?=${movieId}`);
        const data = await response.json();

        if (data && data.data) {
            console.log("Id detail movie with data:", data.data);
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
            <p class="original-price">${movieDetails.price}KR</p><p>${movieDetails.discountedPrice}KR <i class="fa-solid fa-cart-plus" alt="Add to cart icon"></i></p>

        </div>
    `;

    productContainer.appendChild(movieElement);

    console.log("Movie details displayed successfully", movieDetails);
};




















// // // Get api
// // // get id
// // // create a universal when  event click on img - redirect to movie-page
// // // movie page should get the details based on the movie clicked - movie id img = moviepage details
// // // get the url and then - the closest details and display


// // // Product details

// // const movieElementClicked = document.querySelectorAll(".movie");
// // movieElementClicked.forEach(img => img.addEventListener("click", detailedMovie));
// // console.log("Go to movie product page when clicked on movie");

// // //export for you mig like and cart
// // cart
// // displayMovies()
// // fetchMovies()

// console.log("Working 1");

// async function fetchMovieDetails(id) {
//     try {
//         const response = await fetch(`${API_BASE}/${id}`, {
//             method: 'GET',
//         });

//         const data = await response.json();

//         if (data && data.data) {
//             console.log("API movie details", data.data);
//             return data.data;
//         } else {
//             console.error("Invalid or missing data in the API response");
//             return {};
//         }
//     } catch (error) {
//         console.error("Error fetching movie details:", error.message);
//         return {};
//     }
// }


// console.log("Working 2");


// async function displayDetailedMovie(movieDetails) {
//     try {
//         const detailedMovieContainer = document.querySelector(".movie-page");
//         console.log("Movie Page on product page is found");

//         detailedMovieContainer.innerHTML = "";

//         const detailedMovieElement = document.createElement("div");
//         detailedMovieElement.classList.add("movie-page-cover");
//         detailedMovieElement.innerHTML = `
//             <img src="${movieDetails.image.url}" alt="${movieDetails.title}">
//             <h1>${movieDetails.title}</h1>
//             <p>${movieDetails.genre}</p>
//             <p>${movieDetails.releaseYear}</p>
//             <p>${movieDetails.description}</p>
//             <p>${movieDetails.director}</p>
//             <p>${movieDetails.duration} minutes</p>
//             <p>${movieDetails.price}</p>
//         `;

//         detailedMovieContainer.appendChild(detailedMovieElement);

//         console.log("Detailed movies displayed successfully");

//     } catch (error) {
//         console.error("Error displaying detailed movies", error);
//     }
// }




// console.log("Working 3");


// // // DomContent Loads
// // document.addEventListener("DOMContentLoaded", function () {
// //     loadCartFromSessionStorage();
// //     console.log("DOMContentLoaded works the correct way");
// // });

// // // ---------

// // // Cart
// // let cartIcon = document.querySelector("#cart-icon");
// // let dropdownCart = document.querySelector(".dropdown-cart");
// // let closeCart = document.querySelector("#close-cart");
// // console.log("Dropdown cart is created successfully");

// // // Open cart
// // cartIcon.onclick = () => {
// //     dropdownCart.classList.add("active");
// // };

// // // Close cart
// // closeCart.onclick = () => {
// //     dropdownCart.classList.remove("active");
// // };

// // document.body.addEventListener("click", (event) => {
// //     if (event.target.classList.contains("fa-xmark")) {
// //         dropdownCart.classList.remove("active");
// //         console.log("When x is clicked the cart removes totally");
// //     }
// // });

// // // ------

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


// // // Display the correct item in cart
// // async function displayCartItem(title, price, imgSrc) {
// //     try {
// //         const cartItemContainer = document.querySelector(".cart-dropdown-content")

// //         const cartItem = document.createElement("div");
// //         cartItem.classList.add("cart-item");

// //         const imgElement = document.createElement("img");
// //         imgElement.classList.add("cart-img");
// //         imgElement.alt = title;
// //         imgElement.src = imgSrc;

// //         imgElement.onload = function () {
// //             cartItem.innerHTML = `
// //                 <img src="${imgSrc}" alt="${title}" class="cart-img">
// //                 <div class="cart-item-info">
// //                     <div class="cart-item-title">${title}</div>
// //                     <div class="cart-item-price">${price}KR</div>
// //                 </div>
// //                 <button type="button" class="remove-item" value="Remove">Remove</button>
// //             `;

// //         // cartItemContainer.innerHTML = ""; //replaces instead of adding
// //         cartItemContainer.appendChild(cartItem);
// //         console.log("The correct cart-item is displayed");

// //         // Show the cart
// //         dropdownCart.classList.add("active");

// //         const removeCartButtons = document.querySelectorAll(".remove-item");
// //         removeCartButtons.forEach(button => button.addEventListener("click", removeCartItem));
// //         console.log("Remove cart item when clicked button");

// //         updateTotal();
// //         saveCartToSessionStorage();

// //     };

// //     // Append the imgElement to the cartItem
// //     cartItem.appendChild(imgElement);

// //     } catch (error) {
// //         console.error("Error displaying data in cart:", error);
// //     }
// // };

// // async function saveCartToSessionStorage() {
// //     sessionStorage.removeItem("cart");
// //     console.log("The storage is empty before adding");

// //     const cartItems = document.querySelectorAll(".cart-item");
// //     const cartData = [];

// //     cartItems.forEach((cartItem) => {
// //         const title = cartItem.querySelector(".cart-item-title").innerText;
// //         const price = cartItem.querySelector(".cart-item-price").innerText;
// //         const imgSrc = cartItem.querySelector(".cart-img").src;

// //         cartData.push({title, price, imgSrc});
// //     });

// //     sessionStorage.setItem("cart", JSON.stringify(cartData));
// //     console.log("Cart data is correctly saved to the session storage");
// // };

// // // async function saveCartToLocalStorage() {
// // //      const cartItems = document.querySelectorAll(".cart-item");
// // //      const cartData = [];

// // //      cartItems.forEach((cartItem) => {
// // //          const title = cartItem.querySelector(".cart-item-title").innerText;
// // //          const price = cartItem.querySelector(".cart-item-price").innerText;
// // //          const imgSrc = cartItem.querySelector(".cart-img").src;

// // //      cartData.push({title, price, imgSrc});
// // //     });

// // //     localStorage.setItem("cart", JSON.stringify(cartData));
// // //     console.log("Cart data is correctly saved to the local storage");
// // // };

// // //-------

// // // Cart-total outside
// // async function displayCartTotal(cartItems) {
// //     try {
// //         const cartTotalContainer = document.querySelector(".cart-dropdown-total");

// //         // Only next page if there are items in the cart
// //         // const hasItemsInCart = Array.from(cartItems).length > 0;

// //         const total = Array.from(cartItems).reduce((acc, cartItem) => {
// //             const price = parseFloat(cartItem.querySelector(".cart-item-price"));
// //             const quantity = 1;
// //             return acc + (price * quantity);
// //         }, 0);

// //             const cartTotal = document.createElement("div");
// //             cartTotal.classList.add("cart-total");

// //             cartTotal.innerHTML =  `
// //                 <div class="total-title">Total:</div>
// //                 <div class="total-price">${total}KR</div>
// //                 <button type="submit" class="check-out">Check out</button>
// //                 <i class="fa-solid fa-xmark" id="close-cart"></i>
// //                 `;


// //             cartTotalContainer.innerHTML = "";
// //             cartTotalContainer.appendChild(cartTotal);
// //             console.log("The total and check out is displayed");

// //             updateTotal();

// //             const CheckOutButton = document.querySelector(".check-out");
// //             CheckOutButton.addEventListener("click", handleCheckOutButtonClick);
// //             console.log("Check Out button clicked");


// //     } catch (error) {
// //         console.error("Error adding submit and total", error);
// //     }
// // };

// // async function handleCheckOutButtonClick() {
// //     const cartItems = document.querySelectorAll(".cart-item");

// //     if (cartItems.length === 0) {
// //         alert("Your cart is empty. Add some items before checking out!")
// //         console.log("Check Out button clicked and find no items in cart");
// //     } else {
// //         window.location.href = "checkout/checkout.html";
// //     }
// // };


// // // Update Total
// // async function updateTotal() {
// //         const cartItems = document.querySelectorAll(".cart-item");
// //         const totalValue = document.querySelector(".total-price");

// //         let total = 0;

// //         console.log("Total before calculation", total)

// //         cartItems.forEach(cartItem => {

// //             const priceElement = cartItem.querySelector(".cart-item-price");

// //             if (priceElement && priceElement.innerText) {
// //                 const price = parseFloat(priceElement.innerText.replace("KR", "")) || 0;
// //                 const quantityElement = 1;
// //                 total = total + (price * quantityElement);
// //             };

// //         });

// //         console.log("Total after calcualtion", total) // NaN

// //         // If price contains many decimals
// //         total = Math.round(total * 100) / 100;

// //         totalValue.innerText = `${total}KR`;

// //     };


// // function removeCartItem(event){
// //     const buttonClicked = event.target;
// //     const cartItem = buttonClicked.closest(".cart-item");

// //     cartItem.remove();
// //     console.log("The closest cart item is removed when clicked");

// //     updateTotal();
// // };

// // function ready() {
// //     const removeCartButtons = document.querySelectorAll (".remove-item");
// //     removeCartButtons.forEach(button => button.addEventListener("click", removeCartItem));
// // };

// // document.addEventListener("DOMContentLoaded", ready);

// // // // ------

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

        console.log("You might like these movies are displayed successfully");
    } catch (error) {
        console.error("Error displaying movies", error);
    }
};


// document.querySelector(".movie-container").addEventListener("click", async (event)=> {
//     if (event.target.classList.contains("fa-cart-plus")){
//         const movieContainer = event.target.closest(".movie");
//         const imgSrc = movieContainer.querySelector("img").src;
//         const title = movieContainer.querySelector("img").alt;
//         const price = parseFloat(movieContainer.querySelector(".product-price").innerText.replace(" KR", ""));

//         console.log(title, price, imgSrc);

// //         displayCartItem(title, price, imgSrc);
// //         updateTotal();
// //     }
// // });

// // async function addCart(title, price, imgSrc) {
// //      console.log(title, price, imgSrc);

// //     displayCartItem(title, price, imgSrc);
// //      updateTotal();
// //  };



// // // // Product details

// const movieElementClicked = document.querySelectorAll(".movie");
// movieElementClicked.forEach(img => img.addEventListener("click", detailedMovie));
// console.log("Go to movie product page when clicked on movie");
//     }
// });


// // // async function handleMovieClick(movieId) {
// // //     try {
// // //         const movieDetails = await fetchMoviesDetails(movieId);

// // //         displayDetailedMovie(movieDetails);
// // //         window.location.href = `product/product.html?id=${movieId}`;
// // //         console.log("movie id is found", movieId);

// // //     } catch (error) {
// // //         console.error("Error handling movie click:", error);
// // //     }
// // // };

// // // async function fetchMoviesDetails(movieId) {
// // //     try {
// // //         const response = await fetch("https://v2.api.noroff.dev/square-eyes/352ba432-5b5d-4ccc-9aba-f2704c500cf3");
// // //         const data = await response.json();

// // //         if (data && data.data) {
// // //             return data.data;
// // //         } else {
// // //             console.error("Invalid data format from the API");
// // //             return {};
// // //         }
// // //     } catch (error) {
// // //         console.error("Error fetching movie details:", error);
// // //         return {};
// // //     }
// // // };

// // // async function displayDetailedMovie(movieDetails) {
// // //     try {
// // //         const detailedMovieContainer = document.querySelector(".movie-page");
// // //         console.log("Movie Page on product page is found");

// // //         detailedMovieContainer.innerHTML = "";

// // //         const detailedMovieElement = document.createElement("div");
// // //         detailedMovieElement.classList.add("movie-page-cover");
// // //         detailedMovieElement.innerHTML = `
// // //             <img src="${movieId.image.url}" alt="">
// // //             <h1>${movieId.title}</h1>
// // //         `;

// // //         detailedMovieContainer.appendChild(detailedMovieElement);

// // //         console.log("Detailed movies displayed successfully");

// // //     } catch (error) {
// // //         console.error("Error displaying detailed movies", error);
// // //     }
// // // };

// // // const movieElementClicked = document.querySelectorAll(".movie");
// // // movieElementClicked.forEach(img => img.addEventListener("click", detailedMovie));
// // // console.log("Go to movie product page when clicked on movie");

// // // async function detailedMovie(movieId) {
// // //     try {
// // //         console.log("movie id is found", movieId)
// // //         window.location.href = `product/product.html?id=${movieId}`;

// // //         const detailedMovieContainer = document.querySelector(".movie-page");
// // //         console.log("Movie Page on product page is found");

// // //         detailedMovieContainer.innerHTML = "";

// // //         const movieDetails = await fetchMoviesDetails(movieId);

// // //         const detailedMovieElement = document.createElement("div");
// // //         detailedMovieElement.classList.add("movie-page-cover");
// // //         detailedMovieElement.innerHTML = `
// // //             <img src="${movieId.image.url}" alt="">
// // //             <h1>${movieId.title}</h1>
// // //         `;

// // //         detailedMovieContainer.appendChild(detailedMovieElement);

// // //     console.log("Detailed movies displayed successfully");
// // //     } catch (error) {
// // //         console.error("Error displaying detailed movies", error);
// // //     }
// // // };

// // // // async function fetchMoviesDetails(movieId) {
// // // //     try {
// // // //         const response = await fetch("https://v2.api.noroff.dev/square-eyes/${movieId}");
// // // //         const data = await response.json();

// // // //         if (data && data.data) {
// // // //             return data.data;
// // // //         } else {
// // // //             console.error("Invalid data format from the API");
// // // //             return {};
// // // //         }
// // // //     } catch (error) {
// // // //         console.error("Error fetching movie details:", error);
// // // //         return {};
// // // //     }
// // // // }


document.addEventListener("DOMContentLoaded", async () => {
    const movies = await fetchMovies();
    await displayMovies(movies);
});

// // // // ------

// // // Check Out Page
// // // Session storage - store the data to the checkout page

// // async function loadCartFromSessionStorage() {
// //     const savedCart = sessionStorage.getItem("cart");

// //     if (savedCart) {
// //         clearCart();

// //         const cartData = JSON.parse(savedCart);

// //         cartData.forEach(({title, price, imgSrc }) => {
// //             displayCartItem(title, price, imgSrc);
// //         });

// //     updateTotal();
// //     console.log("Loaded cart - The cart data is loaded and saved from the session storage");
// //     }
// // };

// // function clearCart() {
// //     const cartItemContainer = document.querySelector(".cart-item");
// //     cartItemContainer.innerHTML = "";
// // };

// // // // Local storage - store the data to the checkout page

// // // //  async function loadCartFromLocalStorage() {
// // // //     const savedCart = localStorage.getItem("cart");

// // // //     if (savedCart) {
// // // //         const cartData = JSON.parse(savedCart);

// // // //          cartData.forEach(({title, price,  imgSrc }) => {
// // // //              displayCartItem(title, price, imgSrc);
// // // //          });

// // // //         updateTotal();
// // // //         console.log("Loaded cart - The cart data is loaded and saved from the local storage");
// // // //      }
// // // //  };


// // async function main () {
// //     try {
// //         const movies = await fetchMovies();
// //         await displayMovies(movies);

// //         // Display the initial cart items and total
// //         // await displayCartItem(title, price, imgSrc);

// //         await loadCartFromSessionStorage();

// //         await displayCartTotal(document.querySelectorAll(".cart-item"));
// //         await updateTotal();

// //         console.log("The main is not working");

// //     } catch (error) {
// //         console.error("Error in the main async function:", error);
// //     }
// // };

// // document.addEventListener("DOMContentLoaded", main);
