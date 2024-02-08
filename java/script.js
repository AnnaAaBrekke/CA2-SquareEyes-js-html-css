
// Fetch movies from the API


// Function to update movies on the page


//Cart
let cartIcon = document.querySelector("#cart-icon");
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

// Making function

function ready(){
    // Remove items from cart
    var removeCartButtons = document.getElementsByClassName("remove-item")
    console.log(removeCartButtons)
    for (var i = 0; i < removeCartButtons.length; i++){
        var button = removeCartButtons[i]
        button.addEventListener("click", removeCartItem)
    }

// Quantity changes

var quantityInputs = document.getElementsByClassName("quantity");
for (var i = 0; i < quantityInputs.length; i++){
    var input = quantityInputs[i];
    input.addEventListener("change", quantityChanged);
    }
    // Add to cart
    var addCart = document.getElementsByClassName("fa-cart-plus")
    for (var i = 0; i < addCart.length; i++){
        var button = addCart[i];
        button.addEventListener("click", addCartClicked);
    }
}

// Remove Items from Cart

function removeCartItem(event){
    var buttonClicked = event.target
    buttonClicked.parentElement.remove()
    updateTotal();
}

// Quantity Changes

function quantityChanged(event){
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }
    updateTotal();
}

// Add to Cart

function addCartClicked(event){
    var button = event.target
    var movieContainer = button.parentElement

    // Get the movie image element
    var movieImgElement = movieContainer.querySelector(".product-movie");

    // Check if the movie image element exists
    if (movieImgElement) {
        var movieImgSrc = movieImgElement.src;
        console.log("Movie Image Source: ", movieImgSrc);
    } else {
        console.error("Movie image element not found.");
    }

    var moviePrice = movieContainer.getElementsByClassName("product-price")[0].innerText;
    console.log("Price: ", moviePrice);   
}

// Update Total

function updateTotal(){
    var cartDropdownContent = document.getElementsByClassName("cart-dropdown-content")[0];
    var cartItems = cartDropdownContent.getElementsByClassName("cart-item");
    var total = 0;
    for (var i = 0; i < cartItems.length; i++) {
        var cartItem = cartItems[i];
        var priceElement = cartItem.getElementsByClassName("cart-item-price")[0];
        var quantityElement = cartItem.getElementsByClassName("quantity")[0];
        var price = parseFloat(priceElement.innerText.replace ("$", ""));
        var quantitySelected = quantityElement.value;
        total = total + (price * quantitySelected);
        // If price contains come Cents value
        total = Math.round(total * 100) / 100;
    
        document.getElementsByClassName("total-price")[0].innerText = "$" + total;
    }
}