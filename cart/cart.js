let cart = JSON.parse(localStorage.getItem("cart")) || [];

const cartContainer =
    document.getElementById("cartContainer");

const itemCount =
    document.getElementById("itemCount");

const headerCartCount =
    document.getElementById("headerCartCount");

const totalMrp =
    document.getElementById("totalMrp");

const totalPrice =
    document.getElementById("totalPrice");

const savingAmount =
    document.getElementById("savingAmount");


// =========================
// DISPLAY CART
// =========================

function displayCart() {

    cartContainer.innerHTML = "";

    if (cart.length === 0) {

        cartContainer.innerHTML = `
            <div class="empty-cart">
                Your cart is empty
            </div>
        `;

        updateCartSummary();

        return;
    }


    const cartBox = document.createElement("div");

    cartBox.className = "cart-product";


    cartBox.innerHTML = `

        <div class="delivery-header">

            <i class="fa-solid fa-truck"></i>

            <strong>
                By Thu, 03 Sep
            </strong>

            <span style="margin-left:auto;color:#777">
                Shipment 1/1
            </span>

        </div>

    `;


    cart.forEach(product => {

        const productRow =
            document.createElement("div");

        productRow.className = "product-row";


        productRow.innerHTML = `

            <img
                src="${product.image}"
                alt="${product.name}"
            >


            <div class="product-info">

                <h4>
                    ${product.name}
                </h4>

                <div class="mrp">
                    MRP ₹${product.mrp}
                    <span style="color:#159447">
                        ${product.discount}
                    </span>
                </div>

                <div class="price">
                    ₹${product.price}
                </div>

            </div>


            <button
                class="delete-btn"
                data-id="${product.id}"
            >
                <i class="fa-regular fa-trash-can"></i>
            </button>


            <div class="quantity">

                <button
                    class="minus"
                    data-id="${product.id}"
                >
                    −
                </button>

                <span>
                    ${product.quantity}
                </span>

                <button
                    class="plus"
                    data-id="${product.id}"
                >
                    +
                </button>

            </div>

        `;


        cartBox.appendChild(productRow);

    });


    cartContainer.appendChild(cartBox);


    addCartEvents();

    updateCartSummary();
}


// =========================
// CART EVENTS
// =========================

function addCartEvents() {

    // DELETE

    document.querySelectorAll(".delete-btn")
        .forEach(button => {

            button.addEventListener("click", () => {

                const id =
                    Number(button.dataset.id);

                cart =
                    cart.filter(item => item.id !== id);

                saveCart();

            });

        });


    // PLUS

    document.querySelectorAll(".plus")
        .forEach(button => {

            button.addEventListener("click", () => {

                const id =
                    Number(button.dataset.id);

                const product =
                    cart.find(item => item.id === id);

                if (product) {

                    product.quantity++;

                    saveCart();

                }

            });

        });


    // MINUS

    document.querySelectorAll(".minus")
        .forEach(button => {

            button.addEventListener("click", () => {

                const id =
                    Number(button.dataset.id);

                const product =
                    cart.find(item => item.id === id);

                if (!product) return;


                if (product.quantity > 1) {

                    product.quantity--;

                } else {

                    cart =
                        cart.filter(
                            item => item.id !== id
                        );

                }


                saveCart();

            });

        });

}


// =========================
// SAVE CART
// =========================

function saveCart() {

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    displayCart();
}


// =========================
// SUMMARY
// =========================

function updateCartSummary() {

    let quantity = 0;
    let mrp = 0;
    let price = 0;


    cart.forEach(product => {

        quantity += product.quantity;

        mrp +=
            Number(product.mrp) *
            product.quantity;

        price +=
            Number(product.price) *
            product.quantity;

    });


    const saving = mrp - price;


    itemCount.textContent = quantity;

    headerCartCount.textContent = quantity;

    totalMrp.textContent =
        `₹${mrp.toFixed(2)}`;

    totalPrice.textContent =
        `₹${price.toFixed(2)}`;

    savingAmount.textContent =
        `₹${saving.toFixed(2)}`;
}


// =========================
// START
// =========================

displayCart();