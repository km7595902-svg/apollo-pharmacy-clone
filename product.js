// ========================================
// PRODUCTS & CART
// ========================================

let products = [];

let cart =
    JSON.parse(localStorage.getItem("cart")) || [];


// ========================================
// DOM ELEMENTS
// ========================================

const valueDealsContainer =
    document.getElementById("valueDealsContainer");

const minimum50OffContainer =
    document.getElementById("minimum50OffContainer");

const HotSellersContainer =
   document.getElementById("HotSellersContainer");

   const SkinCaresContainer = document.getElementById("SkinCaresContainer")

const cartCount =
    document.getElementById("cartCount");

const cartBtn =
    document.getElementById("cartBtn");


// ========================================
// LOAD PRODUCTS
// ========================================

async function loadProducts() {

    try {

        const response =
            await fetch("./product.json");

        if (!response.ok) {
            throw new Error("product.json not found");
        }

        const data =
            await response.json();

        console.log("JSON DATA:", data);


        // ========================================
        // TWO ARRAYS
        // ========================================

        const valueDeals =
            data.valueDeals || [];

        const minimum50Off =
            data.minimum50Off || [];

        const hotsellers = 
             data.hotsellers || [];

       const skincares = 
             data.skincares || [];


        // দুই array একসাথে cart-এর জন্য
        products = [
            ...valueDeals,
            ...minimum50Off,
            ...hotsellers,
            ...skincares
        ];


        console.log("Value Deals:", valueDeals);
        console.log("Minimum 50% Off:", minimum50Off);
        console.log("hotsellers",hotsellers);
        console.log("skincares",skincares);
        
        


        // ========================================
        // DISPLAY BOTH SECTIONS
        // ========================================

        displayProducts(
            valueDeals,
            valueDealsContainer
        );

        displayProducts(
            minimum50Off,
            minimum50OffContainer
        );
       
        displayProducts(
            hotsellers,
            HotSellersContainer
            
            
        );

        displayProducts(
            skincares,
            SkinCaresContainer

        )

        // Cart count
        updateCartCount();

    }

    catch (error) {

        console.error(
            "Products loading error:",
            error
        );

    }
}


// ========================================
// DISPLAY PRODUCTS
// ========================================

function displayProducts(productList, container) {

    if (!container) {

        console.error(
            "Product container not found"
        );

        return;
    }


    // Clear old products

    container.innerHTML = "";


   

    if (productList.length === 0) {

        container.innerHTML = `
            <p>No products found.</p>
        `;

        return;
    }


    // ========================================
    // CREATE PRODUCT CARD
    // ========================================

    productList.forEach((product) => {

        const card =
            document.createElement("div");

        card.className =
            "product-card";


        card.innerHTML = `

            <div class="product-image">

                <img
                    src="${product.image}"
                    alt="${product.name}"
                    loading="lazy"
                    onerror="this.style.display='none'"
                >

            </div>


            <h3>
                ${product.name}
            </h3>


            <div class="product-price">

                <strong>
                    ₹${product.price}
                </strong>

                <del>
                    MRP ₹${product.mrp}
                </del>

                <span>
                    ${product.discount}% off
                </span>

            </div>


            <button
                class="add-btn"
                data-id="${product.id}"
            >
                ADD
            </button>

        `;


        container.appendChild(card);

    });


    // Add button event

    addCartEvents(container);
}


// ========================================
// ADD BUTTON EVENTS
// ========================================

function addCartEvents(container) {

    const addButtons =
        container.querySelectorAll(".add-btn");


    addButtons.forEach((button) => {

        button.addEventListener(
            "click",
            function () {

                const productId =
                    Number(this.dataset.id);


                addToCart(productId);


                // Button feedback

                const oldText =
                    this.textContent;

                this.textContent =
                    "ADDED";

                this.disabled =
                    true;


                setTimeout(() => {

                    this.textContent =
                        oldText;

                    this.disabled =
                        false;

                }, 700);

            }
        );

    });
}


// ========================================
// ADD TO CART
// ========================================

function addToCart(productId) {

    const product =
        products.find(
            (item) =>
                Number(item.id) === productId
        );


    if (!product) {

        console.error(
            "Product not found:",
            productId
        );

        return;
    }


    // Check existing product

    const existingProduct =
        cart.find(
            (item) =>
                Number(item.id) === productId
        );


    if (existingProduct) {

        existingProduct.quantity += 1;

    }

    else {

        cart.push({

            ...product,

            quantity: 1

        });

    }


    // Save

    saveCart();


    // Update count

    updateCartCount();


    console.log(
        "Cart:",
        cart
    );
}


// ========================================
// SAVE CART
// ========================================

function saveCart() {

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

}


// ========================================
// UPDATE CART COUNT
// ========================================

function updateCartCount() {

    const totalQuantity =
        cart.reduce(
            (total, item) => {

                return total +
                    Number(
                        item.quantity || 0
                    );

            },
            0
        );


    if (cartCount) {

        cartCount.textContent =
            totalQuantity;

    }
}


// ========================================
// CART BUTTON
// ========================================

if (cartBtn) {

    cartBtn.addEventListener(
        "click",
        () => {

            window.location.href =
                "./cart/cart.html";

        }
    );

}


// ========================================
// START
// ========================================

loadProducts();




// =========================
// FAQ OPEN / CLOSE
// =========================

const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach((item) => {

    const question = item.querySelector(".faq-question");

    question.addEventListener("click", () => {

        item.classList.toggle("active");

        const arrow = item.querySelector(".faq-arrow");

        if (item.classList.contains("active")) {
            arrow.textContent = "⌃";
        } else {
            arrow.textContent = "⌄";
        }

    });

});


const showMoreBtn = document.getElementById("showMoreBtn");
const showMoreText = document.getElementById("showMoreText");
const showMoreArrow = document.getElementById("showMoreArrow");
const moreContent = document.getElementById("moreContent");

showMoreBtn.addEventListener("click", () => {

    moreContent.classList.toggle("show");

    if (moreContent.classList.contains("show")) {

        showMoreText.textContent = "Show less";
        showMoreArrow.textContent = "⌃";

    } else {

        showMoreText.textContent = "Show more";
        showMoreArrow.textContent = "⌄";

    }

});