
// Fetch movies from the API
async function displayMovies() {
    try {
        const response = await fetch("https://v2.api.noroff.dev/square-eyes");
        moviesData = await response.json();  
        console.log("Movies fetched successfully:", moviesData);

        updateMoviesInDOM(moviesData);
    } catch (error) {
        console.error("Error fetching the movies:", error);
    }
}


displayMovies()

function updateMoviesInDOM() {
    movies.forEach((movie, index) => {
        const movieContainer = document.querySelector(`.movie-container:nth-child(${index + 1})`);
        
        if (movieContainer) {
            const cartIcon = movieContainer.querySelector('.fa-cart-plus');
            const priceElement = movieContainer.querySelector('.product-price');
            const price = movie.price;

            // Update the HTML content
            priceElement.innerHTML = `<i class="fa-solid fa-cart-plus" alt="Add to cart icon"></i>
                                      <h class="product-price">$${price.toFixed(2)}</h>`;
        } else {
            console.error('Movie container not found for index:', index, 'Movie:', movie);
        }
    });
}

// Function to display/update movies on the page

const movies = [
    {
        id: "352ba432-5b5d-4ccc-9aba-f2704c500cf3",
        title: "Hobbs & Shaw",
        description: "Lawman Luke Hobbs (Dwayne 'The Rock' Johnson) and outcast Deckard Shaw (Jason Statham) form an unlikely alliance when a cyber-genetically enhanced villain threatens the future of humanity.",
        genre: "Action",
        price: 129.99,
        discountedPrice: 119.99,
        rating: "6.5",
        released: "2019",
        image: {
            url: "https://static.noroff.dev/api/square-eyes/0-hobbs-and-shaw.jpg",
            alt: ""
        },
    },    
    {
      id: "972df6d3-b4e8-44c1-9dec-cadd3b35102e",
      title: "The Batman",
      description: "When a sadistic serial killer begins murdering key political figures in Gotham, Batman is forced to investigate the city's hidden corruption and question his family's involvement.",
      genre: "Action",
      price: 154.99,
      discountedPrice: 129.99,
      rating: "7",
      released: "2022",
      image: {
        url: "https://static.noroff.dev/api/square-eyes/6-batman.jpg",
        alt: "The Batman Poster",
      },
    },
    {
      id: "4696b9e6-ec6e-4672-a08d-3e3212a215c8",
      title: "Godzilla: King of the Monsters",
      description: "The crypto-zoological agency Monarch faces off against a battery of god-sized monsters, including the mighty Godzilla, who collides with Mothra, Rodan, and his ultimate nemesis, the three-headed King Ghidorah.",
      genre: "Action",
      price: 109.99,
      discountedPrice: 109.99,
      rating: "9",
      released: "2019",
      image: {
        url: "https://static.noroff.dev/api/square-eyes/1-godzilla-king-of-monsters.jpg",
        alt: "Godzilla: King of the Monsters Poster",
      },
    },
    {
      id: "581f13b2-3ca4-494e-be7c-bb51fbc320f4",
      title: "Sweetheart",
      description: "Jenn has washed ashore a small tropical island and it doesn't take her long to realize she's completely alone. She must spend her days not only surviving the elements, but must also fend off the malevolent force that comes out each night.",
      genre: "Horror",
      price: 139.99,
      discountedPrice: 139.99,
      rating: "5.8",
      released: "2019",
      image: {
        url: "https://static.noroff.dev/api/square-eyes/4-sweetheart.jpg",
        alt: "Sweetheart Poster",
      },
    },
  {
    id: "a969a4b4-a4d0-4dd5-99e5-86ae0a8eee43",
    title: "The Addams Family",
    description: "The eccentrically macabre family moves to a bland suburb where Wednesday Adams' friendship with the daughter of a hostile and conformist local reality show host exacerbates conflict between the families.",
    genre: "Kids",
    price: 114.99,
    discountedPrice: 99.99,
    rating: "5.8",
    released: "2019",
    image: {
      url: "https://static.noroff.dev/api/square-eyes/5-addams-family.jpg",
      alt: "The Addams Family Poster",
    },
  },
  {
    id: "a7e81b82-d2e5-4288-b700-889186a7da0e",
    title: "Once Upon a Time in Hollywood",
    description: "A faded television actor and his stunt double strive to achieve fame and success in the final years of Hollywood's Golden Age in 1969 Los Angeles.",
    genre: "Comedy",
    price: 179.99,
    discountedPrice: 164.99,
    rating: "7.3",
    released: "2019",
    image: {
      url: "https://static.noroff.dev/api/square-eyes/2-once-upon-a-time-hollywood.jpg",
      alt: "Once Upon a Time in Hollywood Poster",
    },
  },
  {
    id: "ad063e58-bc89-46bf-ac45-16760bc883c7",
    title: "Scream",
    description: "5 years after a streak of brutal murders shocked the quiet town of Woodsboro, Calif., a new killer dons the Ghostface mask and begins targeting a group of teenagers to resurrect secrets from the town's deadly past.",
    genre: "Drama",
    price: 129.99,
    rating: "6.3",
    released: "2019",
    image: {
      url: "https://static.noroff.dev/api/square-eyes/3-scream.jpg",
      alt: "Scream Poster",
    },
  },
];

let cartItems = [];


// // What is the movieId? String
// const idType = typeof movies[0].id;
// console.log("The type of the movie ID is:", idType);



// // // Select movie images
// // const hobbsAndShawImgElement = document.querySelector('.Hobbs-Shaw-img');
// // const batmanImgElement = document.querySelector('.Batman-img');
// // const godzillaImgElement = document.querySelector('.Godzilla-img');
// // const sweetHeartImgElement = document.querySelector('.Sweet-Heart-img');

// // // Set movie image sources
// // hobbsAndShawImgElement.src = movies[1].image.url;  // Assuming hobbsAndShaw is the object you created for Hobbs & Shaw
// // batmanImgElement.src = movies[5].image.url;  // Assuming Batman is the first movie in your array
// // godzillaImgElement.src = movies[2].image.url;  // Assuming Godzilla is the second movie
// // sweetHeartImgElement.src = movies[3].image.url;  // Assuming Sweetheart is the third movie


//Cart
cartIcon = document.querySelector("#cart-icon");
let dropdownCart = document.querySelector(".dropdown-cart");
let closeCart = document.querySelector("#close-cart");

// Open cart
cartIcon.onclick = () => {
    dropdownCart.classList.add("active");
};

// Close cart
closeCart.onclick = () => {
    dropdownCart.classList.remove("active");
};

// Cart working

if (document.readyState == "loading"){
    document.addEventListener("DOMContentLoaded", ready);
} else {
    ready()
}

function ready() {
    const addToCartButtons = document.querySelectorAll (".fa-cart-plus");
    addToCartButtons.forEach(button => button.addEventListener("click", addToCartClicked));

    const removeCartButtons = document.querySelectorAll (".remove-item");
    removeCartButtons.forEach(button => button.addEventListener("click", removeCartItem));

    const quantityInputs = document.querySelectorAll (".quantity");
    quantityInputs.forEach(input => input.addEventListener("change", quantityChanged));
}

// // Making function

// function ready() {
//     // Remove items from cart
//     var removeCartButtons = document.getElementsByClassName("remove-item")
//     console.log("Remove buttons found:", removeCartButtons);
//     for (var i = 0; i < removeCartButtons.length; i++){
//         var button = removeCartButtons[i]
//         button.addEventListener("click", removeCartItem)
//     }

// // Quantity changes

// const quantityInputs = document.getElementsByClassName("quantity");
// for (let i = 0; i < quantityInputs.length; i++){
//     const input = quantityInputs[i];
//     input.addEventListener("change", quantityChanged);
//     }
//     // Add to cart
//     const addToCartButton = document.getElementsByClassName("fa-cart-plus")
//     for (let i = 0; i < addToCartButton.length; i++){
//         const button = addToCartButton[i];
//         button.addEventListener("click", addToCartClicked);
//     }
// }


// Function to handle cart button click

function addToCartClicked() {
    const moviesId = this.dataset.moviesId;

    console.log("moviesId:", moviesId);  // Add this line

    if (moviesId) {
        const selectedMovie = movies.find((movie) => movie.id === moviesId);

        if (selectedMovie) {
            cartItems.push(selectedMovie);            
            addToCartUI(selectedMovie);
            updateTotal();
    } else {
        console.error("Movie not found:", moviesId);
    }
    } else {
        console.error("Invalid moviesId:", event.target.dataset.moviesId);
    }
}  

// Remove Items from Cart

function removeCartItem(event){
    const buttonClicked = event.target
    buttonClicked.parentElement.remove()
    updateTotal();
}

// Quantity Changes

function quantityChanged(event){
    const input = event.target
    if (isNaN(input.value) || input.value <= 1) {
        input.value = 1;
    }
    updateTotal();
}

// // Add event listener to the document and delegate to .fa-cart-plus elements
// document.addEventListener("click", function (event) {
//     if (event.target.classList.contains("fa-cart-plus")) {
//         addToCart(event);
//     }
// });

// // Add event listeners to the "fa-cart-plus" icons
// document.addEventListener("DOMContentLoaded", () => {
//     const cartIcons = document.querySelectorAll(".fa-cart-plus");
//     cartIcons.forEach((icon) => {
//         icon.addEventListener("click", addToCart);
//     });
// });

// Function to add an item to the cart
// function addToCart(event) {
//     const moviesId = event.target.dataset.moviesId; 
//     const selectedMovie = movies.find((movies) => movies.id === moviesId);

//     if (selectedMovie) {
//         cartItems.push(selectedMovie);
//         console.log("Added to cart:", selectedMovie.title);
//         addToCartUI(selectedMovie);
//         updateTotal();
//     } else {
//         console.error("Movie not found:", moviesId);
//     }
// }


// addToCartUI(selectedMovie);
//     console.log("Added to cart:", selectedMovie.title);


// Function to update the cart UI
function addToCartUI(movie) {
    if (movie && movie.title) {
        console.log("Updating cart UI with:", movie.title);
    } else {
        console.error("Movie object not working", movie)
    }
}

// Update Total

function updateTotal(){
    const cartDropdownContent = document.getElementsByClassName("cart-dropdown-content")[0];
    const cartItems = cartDropdownContent.getElementsByClassName("cart-item");
    let total = 0;

    cartItems.forEach(cartItem => {
        const priceElement = cartItem.querySelector(".cart-item-price");
        const quantityElement = cartItem.querySelector(".quantity");
        const price = parseFloat(priceElement.innerText.replace("$", ""));
        const quantitySelected = quantityElement.value;
        total += price * quantitySelected;
    });
    
    // If price contains come Cents value
    total = Math.round(total * 100) / 100;

    document.querySelector(".total-price").innerText = `$${total}`;
}

