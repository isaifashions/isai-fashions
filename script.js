// ===============================
// Isai Fashions - script.js
// ===============================

const CART_KEY = "isai-fashions-cart";
const UPI_ID = "darsudarsu19-1@okaxis";

function formatPrice(value) {
    return `₹${Number(value).toLocaleString("en-IN")}`;
}

function calculateCartTotals(cart, paymentMethod = "GPay (UPI)") {
    const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
    const shipping = subtotal > 999 ? 0 : 49;
    const codFee = paymentMethod.includes("Cash on Delivery") ? 100 : 0;
    const total = subtotal + shipping + codFee;
    return { subtotal, shipping, codFee, total };
}

function getCart() {
    try {
        const saved = localStorage.getItem(CART_KEY);
        return saved ? JSON.parse(saved) : [];
    } catch (error) {
        return [];
    }
}

function saveCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    updateCartBadge();
    renderCart();
}

function updateCartBadge() {
    const cartCount = document.getElementById("cartCount");
    const cart = getCart();
    const count = cart.reduce((total, item) => total + item.qty, 0);

    if (cartCount) {
        cartCount.textContent = String(count);
    }
}

function getProductDetailsFromCard(card) {
    if (!card) return null;

    const title = card.querySelector("h3")?.textContent?.trim();
    const priceText = card.querySelector("p")?.textContent?.trim() || "₹0";
    const price = Number(priceText.replace(/[^\d]/g, "")) || 0;
    const link = card.querySelector("a[href*='product.html?id=']");
    const idMatch = link?.href?.match(/product\.html\?id=(\d+)/);
    const id = idMatch ? idMatch[1] : String(Date.now());

    if (!title) return null;

    return {
        id,
        name: title,
        price,
        qty: 1
    };
}

function addToCart(product) {
    const cart = getCart();
    const existingItem = cart.find(item => item.id === product.id);

    if (existingItem) {
        existingItem.qty += 1;
    } else {
        cart.push(product);
    }

    saveCart(cart);
    document.getElementById("cartPanel")?.classList.add("open");
    document.getElementById("cartOverlay")?.classList.add("visible");
}

function renderCart() {
    const cart = getCart();
    const cartItems = document.getElementById("cartItems");
    const subtotalEl = document.getElementById("cartSubtotal");
    const shippingEl = document.getElementById("cartShipping");
    const totalEl = document.getElementById("cartTotal");
    const paymentMethod = document.getElementById("cartPayment")?.value || "GPay (UPI)";

    if (!cartItems || !subtotalEl || !shippingEl || !totalEl) return;

    if (!cart.length) {
        cartItems.innerHTML = '<p class="empty-cart">Your cart is empty.</p>';
        subtotalEl.textContent = "₹0";
        shippingEl.textContent = "₹0";
        totalEl.textContent = "₹0";
        return;
    }

    const { subtotal, shipping, codFee, total } = calculateCartTotals(cart, paymentMethod);
    const displayShipping = paymentMethod.includes("Cash on Delivery") ? shipping + codFee : shipping;
    const displayTotal = subtotal + displayShipping;

    subtotalEl.textContent = formatPrice(subtotal);
    shippingEl.textContent = formatPrice(displayShipping);
    totalEl.textContent = formatPrice(displayTotal);

    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div class="cart-item-info">
                <h4>${item.name}</h4>
                <p>${formatPrice(item.price)} each</p>
            </div>
            <div class="cart-item-actions">
                <div class="qty-controls">
                    <button type="button" class="qty-btn" data-action="decrease" data-id="${item.id}">−</button>
                    <span class="qty-value">${item.qty}</span>
                    <button type="button" class="qty-btn" data-action="increase" data-id="${item.id}">+</button>
                </div>
                <button type="button" class="remove-item" data-id="${item.id}">Remove</button>
            </div>
        </div>
    `).join("");

    document.querySelectorAll(".qty-btn").forEach(button => {
        button.addEventListener("click", () => {
            const itemId = button.dataset.id;
            const action = button.dataset.action;
            const cartItemsList = getCart();
            const item = cartItemsList.find(entry => entry.id === itemId);

            if (!item) return;

            if (action === "increase") item.qty += 1;
            if (action === "decrease") {
                item.qty -= 1;
                if (item.qty <= 0) {
                    const filtered = cartItemsList.filter(entry => entry.id !== itemId);
                    saveCart(filtered);
                    return;
                }
            }

            saveCart(cartItemsList);
        });
    });

    document.querySelectorAll(".remove-item").forEach(button => {
        button.addEventListener("click", () => {
            const itemId = button.dataset.id;
            const filtered = getCart().filter(entry => entry.id !== itemId);
            saveCart(filtered);
        });
    });
}

function openCart() {
    document.getElementById("cartPanel")?.classList.add("open");
    document.getElementById("cartOverlay")?.classList.add("visible");
}

function closeCart() {
    document.getElementById("cartPanel")?.classList.remove("open");
    document.getElementById("cartOverlay")?.classList.remove("visible");
}

window.addEventListener("load", () => {
    console.log("Welcome to Isai Fashions!");

    document.querySelectorAll(".card").forEach(card => {
        if (card.querySelector(".add-to-cart-btn")) {
            card.querySelector(".add-to-cart-btn").remove();
        }
    });

    updateCartBadge();
    renderCart();

    const cartToggle = document.getElementById("cartToggle");
    const cartOverlay = document.getElementById("cartOverlay");
    const closeCartButton = document.getElementById("closeCart");
    const cartPayment = document.getElementById("cartPayment");

    cartToggle?.addEventListener("click", openCart);
    cartOverlay?.addEventListener("click", closeCart);
    closeCartButton?.addEventListener("click", closeCart);
    cartPayment?.addEventListener("change", renderCart);

    const checkoutForm = document.getElementById("cartCheckoutForm");
    checkoutForm?.addEventListener("submit", function (event) {
        event.preventDefault();

        const cart = getCart();
        if (!cart.length) {
            alert("Your cart is empty.");
            return;
        }

        const name = document.getElementById("cartName").value.trim();
        const phone = document.getElementById("cartPhone").value.trim();
        const city = document.getElementById("cartCity").value.trim();
        const pincode = document.getElementById("cartPincode").value.trim();
        const address = document.getElementById("cartAddress").value.trim();
        const paymentMethod = document.getElementById("cartPayment").value;
        const note = document.getElementById("cartNotes").value.trim();

        if (!name || !phone || !city || !pincode || !address) {
            alert("Please fill in all checkout details.");
            return;
        }

        const { subtotal, shipping, codFee, total } = calculateCartTotals(cart, paymentMethod);
        const finalTotal = subtotal + shipping + codFee;

        if (paymentMethod === "GPay (UPI)") {
            const orderTitle = cart.map(item => `${item.name} x${item.qty}`).join(", ");
            const upiLink = `upi://pay?pa=${encodeURIComponent(UPI_ID)}&pn=${encodeURIComponent("ISAI FASHIONS")}&am=${finalTotal.toFixed(2)}&cu=INR&tn=${encodeURIComponent(orderTitle)}`;
            window.location.href = upiLink;
            alert("GPay has been opened for payment. Complete the payment and then confirm the order by phone or WhatsApp.");
            return;
        }

        const itemsText = cart.map(item => `${item.name} x${item.qty} - ${formatPrice(item.price * item.qty)}`).join("\n");

        const message = [
            "Hi Isai Fashions! I would like to place my order.",
            "",
            "Items:",
            itemsText,
            "",
            `Subtotal: ${formatPrice(subtotal)}`,
            `Shipping: ${formatPrice(shipping)}`,
            `COD Fee: ${formatPrice(codFee)}`,
            `Total: ${formatPrice(finalTotal)}`,
            `Payment Method: ${paymentMethod}`,
            `Name: ${name}`,
            `Phone: ${phone}`,
            `City: ${city}`,
            `Pincode: ${pincode}`,
            `Address: ${address}`,
            note ? `Notes: ${note}` : "",
            "Please confirm my order and share the delivery details."
        ].filter(Boolean).join("\n");

        window.open(`https://wa.me/916381288411?text=${encodeURIComponent(message)}`, "_blank");
        localStorage.removeItem(CART_KEY);
        renderCart();
        updateCartBadge();
        checkoutForm.reset();
    });
});

// Shop Now button
const shopBtn = document.querySelector(".btn");

if (shopBtn) {
    shopBtn.addEventListener("click", function (e) {
        e.preventDefault();

        document.querySelector(".featured").scrollIntoView({
            behavior: "smooth"
        });
    });
}

// View Product buttons
const buttons = document.querySelectorAll(".featured button");

buttons.forEach(button => {
    if (button.classList.contains("add-to-cart-btn")) return;

    button.addEventListener("click", function () {
        const card = this.closest(".card");
        const product = card?.querySelector("h3")?.textContent || "this product";

        const phone = "+91 6381288411";

        const message =
            `Hi Isai Fashions! I'm interested in purchasing "${product}". Please share more details.`;

        window.open(
            `https://wa.me/${phone}?text=${encodeURIComponent(message)}`,
            "_blank"
        );
    });
});

// Newsletter
const form = document.querySelector(".newsletter form");

if (form) {
    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const email = form.querySelector("input").value.trim();

        if (email === "") {
            alert("Please enter your email.");
            return;
        }

        alert("Thank you for subscribing!");

        form.reset();
    });
}

function searchProducts() {
    let input = document.getElementById("searchInput").value.toLowerCase();

    let cards = document.querySelectorAll(".featured .card");

    cards.forEach(card => {
        let title = card.querySelector("h3").textContent.toLowerCase();

        if (title.includes(input)) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    });
}

function filterProducts(category) {
    const cards = document.querySelectorAll("[data-category]");

    cards.forEach(card => {
        if (category === "all") {
            card.style.display = "block";
        } else if (card.dataset.category === category) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    });
}