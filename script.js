
const SUPABASE_URL = "https://trceilfmdgoxetlpibpv.supabase.co";
const SUPABASE_KEY = "sb_publishable_p6hrHewlbDo-Bh3Xhdiy8g_fNnBQO1m";

const supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);
const CART_KEY = "isai-fashions-cart";
const ORDERS_KEY = "isai-fashions-orders";
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

function saveOrderToLocalStorage(cart, customerInfo, paymentMethod, codFee, subtotal, shipping, total) {
    try {
        const orders = JSON.parse(localStorage.getItem(ORDERS_KEY)) || [];
        const normalizedCart = cart.map(item => ({
            ...item,
            size: item.size || 'N/A'
        }));
        const newOrder = {
            id: `ORD-${Date.now()}`,
            items: normalizedCart,
            name: customerInfo.name,
            phone: customerInfo.phone,
            city: customerInfo.city,
            pincode: customerInfo.pincode,
            address: customerInfo.address,
            notes: customerInfo.notes,
            paymentMethod: paymentMethod,
            subtotal: subtotal,
            shipping: shipping,
            codFee: codFee,
            total: total,
            createdAt: new Date().toISOString(),
            status: 'pending'
        };
        orders.push(newOrder);
        localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
        return newOrder.id;
    } catch (error) {
        console.error('Error saving order:', error);
        return null;
    }
}
async function saveOrderToSupabase(
  cart,
  customerInfo,
  paymentMethod,
  codFee,
  subtotal,
  shipping,
  total
) {
  const normalizedCart = cart.map(item => ({
    ...item,
    size: item.size || "N/A"
  }));

  const newOrder = {
    items: normalizedCart,
    name: customerInfo.name,
    phone: customerInfo.phone,
    city: customerInfo.city,
    pincode: customerInfo.pincode,
    address: customerInfo.address,
    notes: customerInfo.notes,
    paymentMethod: paymentMethod,
    subtotal: subtotal,
    shipping: shipping,
    codFee: codFee,
    total: total,
    createdAt: new Date().toISOString(),
    status: "pending"
  };

  const { data, error } = await supabaseClient
    .from("orders")
    .insert([newOrder])
    .select()
    .single();

  if (error) {
    console.error("Supabase order error:", error);
    return null;
  }

  console.log("Order saved to Supabase:", data);
  return data;
}

function getCart() {
    try {
        const saved = localStorage.getItem(CART_KEY);
        return saved ? JSON.parse(saved) : [];
    } catch (error) {
        return [];
    }
}

function getCartItemKey(item) {
    return `${item.id}-${item.size || "M"}`;
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
    const image = card.querySelector("img")?.src || "";

    if (!title) return null;

    return {
        id,
        name: title,
        price,
        qty: 1,
        image: image
    };
}

function addToCart(product) {
    const cart = getCart();
    const normalizedProduct = {
        ...product,
        size: product.size || "M"
    };
    const existingItem = cart.find(item => getCartItemKey(item) === getCartItemKey(normalizedProduct));

    if (existingItem) {
        existingItem.qty += 1;
    } else {
        cart.push(normalizedProduct);
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

    cartItems.innerHTML = cart.map(item => {
        const sizeOptions = ["S", "M", "L", "XL", "XXL"];
        const selectedSize = item.size || "M";
        const itemKey = getCartItemKey(item);

        return `
        <div class="cart-item">
            <div class="cart-item-info">
                <h4>${item.name}</h4>
                <p>${formatPrice(item.price)} each</p>
                <label class="cart-item-size-control">
                    <span>Size</span>
                    <select class="cart-item-size-select" data-item-key="${itemKey}">
                        ${sizeOptions.map(size => `
                            <option value="${size}" ${size === selectedSize ? "selected" : ""}>${size}</option>
                        `).join("")}
                    </select>
                </label>
            </div>
            <div class="cart-item-actions">
                <div class="qty-controls">
                    <button type="button" class="qty-btn" data-action="decrease" data-item-key="${itemKey}">−</button>
                    <span class="qty-value">${item.qty}</span>
                    <button type="button" class="qty-btn" data-action="increase" data-item-key="${itemKey}">+</button>
                </div>
                <button type="button" class="remove-item" data-item-key="${itemKey}">Remove</button>
            </div>
        </div>
    `;
    }).join("");

    document.querySelectorAll(".cart-item-size-select").forEach(select => {
        select.addEventListener("change", () => {
            const itemKey = select.dataset.itemKey;
            const cartItemsList = getCart();
            const item = cartItemsList.find(entry => getCartItemKey(entry) === itemKey);

            if (!item) return;

            item.size = select.value;
            saveCart(cartItemsList);
        });
    });

    document.querySelectorAll(".qty-btn").forEach(button => {
        button.addEventListener("click", () => {
            const itemKey = button.dataset.itemKey;
            const action = button.dataset.action;
            const cartItemsList = getCart();
            const item = cartItemsList.find(entry => getCartItemKey(entry) === itemKey);

            if (!item) return;

            if (action === "increase") item.qty += 1;
            if (action === "decrease") {
                item.qty -= 1;
                if (item.qty <= 0) {
                    const filtered = cartItemsList.filter(entry => getCartItemKey(entry) !== itemKey);
                    saveCart(filtered);
                    return;
                }
            }

            saveCart(cartItemsList);
        });
    });

    document.querySelectorAll(".remove-item").forEach(button => {
        button.addEventListener("click", () => {
            const itemKey = button.dataset.itemKey;
            const filtered = getCart().filter(entry => getCartItemKey(entry) !== itemKey);
            saveCart(filtered);
        });
    });
}

function openCart() {
    document.getElementById("cartPanel")?.classList.add("open");
    document.getElementById("cartOverlay")?.classList.add("visible");
}

function setCartSubmitButtonState(isSubmitting) {
    const submitButton = document.querySelector("#cartCheckoutForm .cart-submit");
    if (!submitButton) return;

    submitButton.disabled = isSubmitting;
    submitButton.dataset.defaultText = submitButton.dataset.defaultText || submitButton.textContent;
    submitButton.textContent = isSubmitting ? "Placing Order..." : submitButton.dataset.defaultText;
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
    checkoutForm?.addEventListener("submit", async function (event) {
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

        setCartSubmitButtonState(true);

        try {
            const cartItemsWithSelectedSizes = cart.map(item => ({
                ...item,
                size: document.querySelector(`.cart-item-size-select[data-item-key="${getCartItemKey(item)}"]`)?.value || item.size || "M"
            }));

            const { subtotal, shipping, codFee, total } = calculateCartTotals(cartItemsWithSelectedSizes, paymentMethod);
            const finalTotal = subtotal + shipping + codFee;

            const localOrderId = saveOrderToLocalStorage(cartItemsWithSelectedSizes, {
                name: name,
                phone: phone,
                city: city,
                pincode: pincode,
                address: address,
                notes: note
            }, paymentMethod, codFee, subtotal, shipping, finalTotal);

            const savedOrder = await saveOrderToSupabase(cartItemsWithSelectedSizes, {
                name: name,
                phone: phone,
                city: city,
                pincode: pincode,
                address: address,
                notes: note
            }, paymentMethod, codFee, subtotal, shipping, finalTotal);

            if (!savedOrder) {
                console.error("Order save failed. Keeping local copy as fallback.");
                alert("There was a problem placing your order. Please try again.");
                return;
            }

            const successPageUrl = `order-success.html?payment=${encodeURIComponent(paymentMethod)}&orderId=${encodeURIComponent(savedOrder.id || localOrderId || "")}`;

            if (paymentMethod === "GPay (UPI)") {
                const orderTitle = cartItemsWithSelectedSizes.map(item => `${item.name} (${item.size || 'N/A'}) x${item.qty}`).join(", ");
                const upiLink = `upi://pay?pa=${encodeURIComponent(UPI_ID)}&pn=${encodeURIComponent("ISAI FASHIONS")}&am=${finalTotal.toFixed(2)}&cu=INR&tn=${encodeURIComponent(orderTitle)}`;
                window.location.href = upiLink;
                setTimeout(() => {
                    window.location.href = successPageUrl;
                }, 1200);
                return;
            }

            window.location.href = successPageUrl;
        } catch (error) {
            console.error("Checkout submit error:", error);
            alert("There was a problem placing your order. Please try again.");
        } finally {
            setCartSubmitButtonState(false);
            localStorage.removeItem(CART_KEY);
            renderCart();
            updateCartBadge();
            checkoutForm.reset();
        }
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