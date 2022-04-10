const cupcakesContainer = document.getElementById("cupcakes-container")
const cartContainer = document.getElementById("cart-container");
const emptyCartTemplate = document.getElementById("empty-cart-template");
const cartItemTemplate = document.getElementById("cart-item-template"); 
const cupcakeTemplate = document.getElementById("cupcake-template");

const shoppingCart = [];

const CupcakeS = [
    {
        id: 0,
        title: "Strawberry",
        description: "Strawberry flavored cupcake",
        image: "file:///Users/apple/Documents/Promineo/Week10/pics/Strawberry.jpeg",
        price: "$4"
    },
    {
        id: 1,
        title: "Vanilla",
        description: "Vanilla flavored cupcake",
        image: "file:///Users/apple/Documents/Promineo/Week10/pics/Vanilla.jpeg",
        price: "$5"
    },
    {
        id: 2,
        title: "Chocolate",
        description: "Chocolate flavored cupcake",
        image: "file:///Users/apple/Documents/Promineo/Week10/pics/Chocolate.jpeg",
        price: "$6"
    },
    {
        id: 3,
        title: "Lemon",
        description: "Lemon flavored cupcake",
        image: "file:///Users/apple/Documents/Promineo/Week10/pics/Lemon.jpeg",
        price: "$5"
    }
]

window.addEventListener("load", () => {
    renderCupcakeList();
    renderShoppingCart();
})

//Render cupcakes

function renderCupcakeList() {
    emptyElement(cupcakesContainer);
    for(const cupcake of CupcakeS) {
        const cupcakeCard = renderCupcakeCard(cupcake);
        cupcakesContainer.appendChild(cupcakeCard);
    }
}

function renderCupcakeCard(cupcake) {
    const cupcakeElement = cupcakeTemplate.cloneNode(true);
    cupcakeElement.querySelector("#cupcake-image").src = cupcake.image;
    cupcakeElement.querySelector("#cupcake-title").textContent = cupcake.title;
    cupcakeElement.querySelector("#cupcake-description").textContent = cupcake.description;
    cupcakeElement.querySelector("#cupcake-buy-button").addEventListener("click", () => addToCart(cupcake));
    return cupcakeElement;
}

// Render cart

function renderShoppingCart() {
    emptyElement(cartContainer);
    for(const item of shoppingCart) {
        const shoppingListItem = renderShoppingListItem(item);
        cartContainer.appendChild(shoppingListItem);
    }
    if(shoppingCart.length === 0) {
        cartContainer.appendChild(emptyCartTemplate.cloneNode(true));
    }
}

function renderShoppingListItem(item) {
    const cartItem = cartItemTemplate.cloneNode(true);
    cartItem.querySelector("#item-number").textContent = item.number;
    cartItem.querySelector("#item-text").textContent = item.text;
    cartItem.querySelector("#remove-button").addEventListener("click", () => removeFromCart(item.id));
    return cartItem;
}

// Event Handlers 

function addToCart(cupcake) {
    let item = shoppingCart.find(i => i.id === cupcake.id);
    if(!item) {
        item = {
            id: cupcake.id,
            text: cupcake.title,
            number: 0
        }
        shoppingCart.push(item);
    }
    item.number++;
    renderShoppingCart();
}

function removeFromCart(cupcakeId) {
    const item = shoppingCart.find(i => i.id === cupcakeId);
    item.number--;
    if(item.number === 0) {
        shoppingCart.splice(shoppingCart.indexOf(item), 1);
    }
    renderShoppingCart();
}

// Utility 

function emptyElement(element) {
    while(element.firstChild) {
        element.removeChild(element.firstChild);
    }
}