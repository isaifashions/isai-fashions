const products = {
  
    1: {
        name: "Pink Floral Cord Set",
        price: "₹749",
        image: "images/floral pink cord set.jpeg",
        sizes:["M", "L", "XL"],
        description: "Delicate pink floral print on soft cotton.<br>Coordinated cord set for a cohesive look.<br>Perfect for casual outings and daily comfort."
    },
    2: {
        name: "Black Floral Cord Set",
        price: "₹749",
        image: "images/floral black cord set.jpeg",
        sizes:[ "M", "L", "XL"],
        description: "Classic black base with vibrant floral detailing.<br>Versatile cord set that pairs with everything.<br>Ideal for both casual and semi-formal occasions."
    },
    3: {
        name: "Burnt Orange Floral Cord Set",
        price: "₹749",
        image: "images/burnt orange cord set.jpeg",
        sizes:["M", "L", "XL"],
        description: "Warm burnt orange with elegant floral patterns.<br>Breathable cotton blend for all-day comfort.<br>A trendy pick for weekend getaways."
    },
      4: {
        name: "Rani Pink Floral Cord Set",
        price: "₹749",
        image: "images/rani pink cord set.jpeg",
        sizes:["M", "L", "XL"],
        description: "Rich rani pink with beautiful floral embellishments.<br>Soft and skin-friendly fabric.<br>Makes a statement while staying comfortable."
    },
    5: {
        name: "Coral Red Floral Print V-Neck Cord Set",
        price: "₹749",
        image: "images/Coral red floral print V-neck.jpeg",
        sizes:["M", "L", "XL"],
        description: "Vibrant coral red with striking floral print.<br>Flattering V-neckline design.<br>Perfect for adding color to your wardrobe."
    },
    6: {
        name: "Royal blue and off-white floral print v-neck Cord Set",
        price: "₹749",
        image: "images/Royal blue v-neck.jpeg",
        sizes:["M", "L", "XL"],
        description: "Elegant royal blue with off-white floral accents.<br>Sophisticated V-neckline for a polished look.<br>Timeless piece for your everyday collection."
    },

     7: {
        name: "Black Bliss Everyday Top",
        price: "₹399",
        image: "images/black top.jpeg",
        sizes:["M", "L", "XL"],
        description: "Classic black single-piece top in premium cotton.<br>Simple yet elegant design for versatile styling.<br>A wardrobe essential you'll reach for daily."
    },

     8: {
        name: "Blackpink Geometry-shaped Everyday Top",
        price: "₹399",
        image: "images/blackpink.jpeg",
        sizes:["M", "L", "XL"],
        description: "Chic geometric print on a black base.<br>Modern design with a minimalist appeal.<br>Perfect for creating bold everyday looks."
    },

     9: {
        name: "Maroon and White Everyday Top",
        price: "₹399",
        image: "images/maroon.jpeg",
        sizes:["M", "L", "XL"],
        description: "Beautiful contrast of maroon and white tones.<br>Lightweight and breathable for comfort.<br>Pairs well with any bottoms you choose."
    },

     10: {
        name: "Red Bloom Everyday Top",
        price: "₹399",
        image: "images/red blue.jpeg",
        sizes:["M", "L", "XL"],
        description: "Stunning red with blooming print details.<br>Comfortable fit for all-day wear.<br>Adds vibrancy to your casual style."
    },

      11: {
        name: "Yellow Bliss Everyday Top",
        price: "₹399",
        image: "images/yellow.jpeg",
        sizes:["M", "L", "XL"],
        description: "Cheerful yellow top in soft cotton blend.<br>Brings sunshine to your everyday look.<br>Perfect for boosting your mood and style."
    },

      12: {
        name: "Aqua Blue Floral Everyday Top",
        price: "₹399",
        image: "images/sky blue.jpeg",
        sizes:["M", "L", "XL"],
        description: "Serene aqua blue with delicate floral motifs.<br>Cooling and comfortable for warm weather.<br>Great for creating fresh, breezy outfits."
    },
      13: {
        name: "A-line puff sleeve kurti",
        price: "₹759",
        image: "images/maxi.jpeg",
        sizes:["M", "XL", "XXL"],
        description: "Elegant A-line silhouette with trendy puff sleeves.<br>Perfect length for a sophisticated look.<br>Ideal for festivals, events, and gatherings."
    },
 14: {
        name: "Rusty orange Printed Notch Collar Straight Kurti",
        price: "₹459",
        image: "images/nrusty.jpeg",
        sizes:[ "L", "XL"],
        description: "Earthy rusty orange with beautiful printed patterns.<br>Professional notch collar design.<br>Comfortable and elegant for any occasion."
    },
     15: {
        name: "Wine printed Notch Collar Straight Kurti",
        price: "₹459",
        image: "images/winetop.jpeg",
        sizes:["S","M", "XL", "XXL"],
        description: "Deep wine color with intricate printed details.<br>Sophisticated notch collar styling.<br>Perfect for work-from-home or casual outings."
    },
     16: {
        name: "Maroon Village folk art kurti",
        price: "₹459",
        image: "images/women.jpeg",
        sizes:["S", "M", "L", "XL"],
        description: "Traditional maroon with beautiful village folk art patterns.<br>Celebration-ready with authentic cultural designs.<br>Perfect for festivals and special gatherings."
    },
    17: {
        name: "Dark Navy Floral Kurti",
        price: "₹399",
        image: "images/kerala.jpeg",
        sizes:["S","M", "L", "XL", "XXL"],
        description: "Deep navy blue with exquisite floral motifs.<br>Elegant draping and comfortable fit.<br>Timeless classic for everyday elegance."
    },

    18: {
        name: "Mustard Yellow kathakali motif kurti",
        price: "₹399",
        image: "images/kalamkari.jpeg",
        sizes:["M", "L", "XXL"],
        description: "Vibrant mustard with intricate kathakali art patterns.<br>Celebrates traditional Indian craftsmanship.<br>Makes a bold statement for cultural occasions."
    },
    19: {
        name: "Red raw silk",
        price: "₹1099",
        image: "images/3red.jpeg",
        sizes:["L", "XL", "XXL"],
        description: "Bold red statement piece with a flattering fit.<br>Designed for confident everyday styling.<br>Premium fabric finish and comfortable wear.<br>Comes with a pant and dupatta."
    },
    20: {
        name: "Wine raw silk",
        price: "₹1099",
        image: "images/3wine.jpeg",
        sizes:["XXL"],
        description: "Elegant wine-toned design for a polished look.<br>Soft texture with a modern silhouette.<br>Perfect for both festive and day-to-day styling.<br>Comes with a pant and dupatta."
    },
    21: {
        name: "Green raw silk",
        price: "₹1099",
        image: "images/rawsilkgreen.jpeg",
        sizes:["M"],
        description: "Fresh raw-silk green shade with a luxurious finish.<br>Lightweight yet rich in texture.<br>Ideal for elevated casual elegance.<br>Comes with a pant and dupatta."
    },
    22: {
        name: "Pink raw silk",
        price: "₹1099",
        image: "images/pink3.jpeg",
        sizes:["L", "XXL"],
        description: "Soft pink tone with a refined contemporary fit.<br>Comfortable premium fabric for versatile styling.<br>A graceful addition to your wardrobe essentials.<br>Comes with a pant and dupatta."
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
    
    const descriptionEl = document.getElementById("product-description");
    if (descriptionEl && product.description) {
        descriptionEl.innerHTML = product.description;
    }
    
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

        // Send order to backend for customer WhatsApp confirmation
        fetch("https://isai-fashions.onrender.com/api/order", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name: name,
                phone: phone,
                address: address,
                city: city,
                pincode: pincode,
                item: product.name,
                size: selectedSize,
                quantity: quantity,
                total: total,
                paymentMethod: paymentMethod,
                notes: note
            })
        }).catch(error => console.log("Backend notification sent or queued."));

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