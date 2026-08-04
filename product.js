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

if (product) {
    document.getElementById("product-image").src = product.image;
    document.getElementById("product-name").textContent = product.name;
    document.getElementById("product-price").textContent = product.price;

    const phone = "916381288411";

    document.getElementById("whatsapp-btn").href =
        `https://wa.me/${phone}?text=Hi! I want to order ${product.name} (${product.price})`;

    product.sizes.forEach(size => {
        sizesContainer.innerHTML += `<button>${size}</button>`;
    });
} else {
    document.getElementById("product-name").textContent = "Product not found";
    document.getElementById("product-price").textContent = "";
    document.getElementById("product-image").alt = "Product not found";
    sizesContainer.innerHTML = "<p>Please return to the catalog and choose a valid product.</p>";
    document.getElementById("whatsapp-btn").style.display = "none";
}