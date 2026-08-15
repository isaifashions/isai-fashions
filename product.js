const products = {
  
    1: {
        name: "Pink Floral Cord Set",
        price: "₹749",
        image: "images/floral pink cord set.jpeg",
        sizes:["M", "L", "XL"]
    },
    2: {
        name: "Black Floral Cord Set",
        price: "₹749",
        image: "images/floral black cord set.jpeg",
        sizes:[ "M", "L", "XL"]
    },
    3: {
        name: "Burnt Orange Floral Cord Set",
        price: "₹749",
        image: "images/burnt orange cord set.jpeg",
        sizes:["M", "L", "XL"]
    },
      4: {
        name: "Rani Pink Floral Cord Set",
        price: "₹749",
        image: "images/rani pink cord set.jpeg",
        sizes:["M", "L", "XL"]
    },
    5: {
        name: "Coral Red Floral Print V-Neck Cord Set",
        price: "₹749",
        image: "images/Coral red floral print V-neck.jpeg",
        sizes:["M", "L", "XL"]
    },
    6: {
        name: "Royal blue and off-white floral print v-neck Cord Set",
        price: "₹749",
        image: "images/Royal blue v-neck.jpeg",
        sizes:["M", "L", "XL"]
    },

     7: {
        name: "Black Bliss Everyday Top",
        price: "₹359",
        image: "images/black top.jpeg",
        sizes:["M", "L", "XL"]
    },

     8: {
        name: "Blackpink Geometry-shaped Everyday Top ",
        price: "₹359",
        image: "images/blackpink.jpeg",
        sizes:["M", "L", "XL"]
    },

     9: {
        name: "Maroon and White Everyday Top",
        price: "₹359",
        image: "images/maroon.jpeg",
        sizes:["M", "L", "XL"]
    },

     10: {
        name: "Red Bloom Everyday Top",
        price: "₹359",
        image: "images/red blue.jpeg",
        sizes:["M", "L", "XL"]
    },

      11: {
        name: "Yellow Bliss Everyday Top",
        price: "₹359",
        image: "images/yellow.jpeg",
        sizes:["M", "L", "XL"]
    },

      12: {
        name: "Aqua Blue Floral Everyday Top",
        price: "₹359",
        image: "images/sky blue.jpeg",
        sizes:["M", "L", "XL"]
    },
      13: {
        name: "A-line puff sleeve kurti",
        price: "₹859",
        image: "images/maxi.jpeg",
        sizes:["M", "L", "XL"]
    },
 14: {
        name: "Rusty orange Printed Notch Collar Straight Kurti",
        price: "₹459",
        image: "images/nrusty.jpeg",
        sizes:["S","M", "L", "XL"]
    },
     15: {
        name: "Wine printed Notch Collar Straight Kurti",
        price: "₹459",
        image: "images/winetop.jpeg",
        sizes:["S","M", "L", "XL"]
    },
     16: {
        name: "Maroon Village folk art kurti",
        price: "₹459",
        image: "images/women.jpeg",
        sizes:["S", "M", "L", "XL"]
    },
    17: {
        name: "Dark Navy Floral Kurti",
        price: "₹459",
        image: "images/kerala.jpeg",
        sizes:["S", "M", "L", "XL"]
    },

    18: {
        name: "Mustard Yellow kathakali motif kurti",
        price: "₹459",
        image: "images/kalamkari.jpeg",
        sizes:["S", "M", "L", "XL"]
    },
};

const params = new URLSearchParams(window.location.search);
const id = params.get("id");
const product = products[id];
const sizesContainer = document.getElementById("product-sizes");
const checkoutForm = document.getElementById("checkout-form");
const quantityInput = document.getElementById("quantity");
const orderTotal = document.getElementById("order-total");
const subtotalPrice = document.getElementById("subtotal-price");
const shippingPrice = document.getElementById("shipping-price");
const selectedSizeLabel = document.getElementById("selected-size-label");
const selectedQuantityLabel = document.getElementById("selected-quantity-label");
const paymentMethodSelect = document.getElementById("payment-method");

const UPI_ID = "darsudarsu19-1@okaxis";
let selectedSize = "";

function formatIndianPrice(value) {
    return `₹${Number(value).toLocaleString("en-IN")}`;
}

function updateOrderTotal() {
    if (!product || !orderTotal || !subtotalPrice || !shippingPrice || !quantityInput) return;

    const price = Number(product.price.replace(/[₹,]/g, ""));
    const quantity = Math.max(1, Number(quantityInput.value) || 1);
    const subtotal = price * quantity;
    const shipping = subtotal > 999 ? 0 : 49;
    const paymentMethod = paymentMethodSelect?.value || "GPay (UPI)";
    const codFee = paymentMethod.includes("Cash on Delivery") ? 100 : 0;
    const total = subtotal + shipping + codFee;

    subtotalPrice.textContent = formatIndianPrice(subtotal);
    shippingPrice.textContent = formatIndianPrice(shipping + codFee);
    orderTotal.textContent = formatIndianPrice(total);

    if (selectedSizeLabel) {
        selectedSizeLabel.textContent = selectedSize || "M";
    }

    if (selectedQuantityLabel) {
        selectedQuantityLabel.textContent = String(quantity);
    }
}

if (product) {
    document.getElementById("product-image").src = product.image;
    document.getElementById("product-name").textContent = product.name;
    document.getElementById("product-price").textContent = product.price;
    updateOrderTotal();

    product.sizes.forEach(size => {
        const sizeButton = document.createElement("button");
        sizeButton.type = "button";
        sizeButton.textContent = size;
        sizeButton.className = "size-option";

        if (!selectedSize) {
            selectedSize = size;
            sizeButton.classList.add("selected");
        }

        sizeButton.addEventListener("click", () => {
            selectedSize = size;
            if (selectedSizeLabel) {
                selectedSizeLabel.textContent = selectedSize;
            }
            document.querySelectorAll(".size-option").forEach(button => {
                button.classList.toggle("selected", button === sizeButton);
            });
        });

        sizesContainer.appendChild(sizeButton);
    });

    quantityInput.addEventListener("input", () => {
        const value = Math.max(1, Number(quantityInput.value) || 1);
        quantityInput.value = value;
        updateOrderTotal();
    });

    paymentMethodSelect?.addEventListener("change", updateOrderTotal);

    checkoutForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const name = document.getElementById("customer-name").value.trim();
        const phone = document.getElementById("customer-phone").value.trim();
        const city = document.getElementById("customer-city").value.trim();
        const pincode = document.getElementById("customer-pincode").value.trim();
        const address = document.getElementById("customer-address").value.trim();
        const quantity = document.getElementById("quantity").value;
        const paymentMethod = document.getElementById("payment-method").value;
        const note = document.getElementById("customer-note").value.trim();

        if (!selectedSize) {
            alert("Please select a size before placing the order.");
            return;
        }

        if (!name || !phone || !city || !pincode || !address) {
            alert("Please complete all checkout fields before placing the order.");
            return;
        }

        const price = Number(product.price.replace(/[₹,]/g, ""));
        const subtotal = price * Number(quantity || 1);
        const shipping = subtotal > 999 ? 0 : 49;
        const codFee = paymentMethod.includes("Cash on Delivery") ? 100 : 0;
        const total = subtotal + shipping + codFee;

        if (paymentMethod === "GPay (UPI)") {
            const upiLink = `upi://pay?pa=${encodeURIComponent(UPI_ID)}&pn=${encodeURIComponent("ISAI FASHIONS")}&am=${total.toFixed(2)}&cu=INR&tn=${encodeURIComponent(product.name)}`;
            window.location.href = upiLink;
            alert("GPay has been opened for payment. Complete the transaction and then confirm the order by phone or WhatsApp.");
            return;
        }

        const message = [
            "Hi Isai Fashions! I would like to place this order.",
            `Product: ${product.name}`,
            `Price: ${product.price}`,
            `Size: ${selectedSize}`,
            `Quantity: ${quantity}`,
            `Subtotal: ${formatIndianPrice(subtotal)}`,
            `Shipping: ${formatIndianPrice(shipping)}`,
            `COD Fee: ${formatIndianPrice(codFee)}`,
            `Total: ${formatIndianPrice(total)}`,
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
    });

    if (params.get("buy") === "1") {
        checkoutForm.scrollIntoView({ behavior: "smooth", block: "start" });
    }
} else {
    document.getElementById("product-name").textContent = "Product not found";
    document.getElementById("product-price").textContent = "";
    document.getElementById("product-image").alt = "Product not found";
    sizesContainer.innerHTML = "<p>Please return to the catalog and choose a valid product.</p>";
    checkoutForm.style.display = "none";
}