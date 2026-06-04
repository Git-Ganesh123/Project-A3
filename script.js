const menuBtn = document.getElementById('menuBtn');
const closeBtn = document.getElementById('closeBtn');
const fullMenu = document.getElementById('fullMenu');

menuBtn.addEventListener('click', () => {
  fullMenu.classList.add('active');
});

closeBtn.addEventListener('click', () => {
  fullMenu.classList.remove('active');
});


document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && fullMenu.classList.contains('active')) {
    fullMenu.classList.remove('active');
  }
});

fullMenu.addEventListener('click', (e) => {
  if (e.target === fullMenu) {
    fullMenu.classList.remove('active');
  }
});

//adding product.html additions - 
var params = new URLSearchParams(window.location.search);
var productName = params.get("name");
var productPrice = params.get("price");
var productImage = params.get("image");

if (productName && document.getElementById("pdpName")) {
  document.getElementById("pdpName").textContent = productName;
  document.getElementById("pdpPrice").textContent = productPrice;
  document.getElementById("mainImg").src = productImage;
  document.getElementById("img2").src = params.get("img2") || productImage;
  document.getElementById("img3").src = params.get("img3") || productImage;
  document.getElementById("img4").src = params.get("img4") || productImage;
  document.title = productName + " - Jo Mercer";
}

var accordionToggles = document.querySelectorAll(".accordion-toggle");
accordionToggles.forEach(function(btn) {
  btn.addEventListener("click", function() {
    var content = btn.nextElementSibling;
    var arrow = btn.querySelector(".accordion-arrow");
    content.classList.toggle("open");
    arrow.textContent = content.classList.contains("open") ? "-" : "+";
  });
});

var sizeBtns = document.querySelectorAll(".size-btn");
sizeBtns.forEach(function(btn) {
  btn.addEventListener("click", function() {
    sizeBtns.forEach(function(b) { b.classList.remove("selected"); });
    btn.classList.add("selected");
  });
});

var addToCartBtn = document.querySelector(".pdp-add-cart");
if (addToCartBtn) {
  addToCartBtn.addEventListener("click", function() {
    var name = document.getElementById("pdpName").textContent;
    var price = document.getElementById("pdpPrice").textContent;
    var image = document.getElementById("mainImg").src;
    var selectedSize = document.querySelector(".size-btn.selected");
    var size = selectedSize ? selectedSize.textContent : "";

    var cart = JSON.parse(localStorage.getItem("cart") || "[]");
    cart.push({ name: name, price: price, image: image, size: size });
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(name + " added to cart!");
  });
}

var cartItems = document.getElementById("cartItems");
if (cartItems) {
  var cart = JSON.parse(localStorage.getItem("cart") || "[]");
  var total = 0;

  if (cart.length === 0) {
    cartItems.innerHTML = '<p class="cart-empty">Your cart is empty.</p>';
  }

  cart.forEach(function(item, index) {
    var price = parseFloat(item.price.replace(/[^0-9.]/g, "")) || 0;
    total += price;

    var row = document.createElement("div");
    row.className = "cart-row";
    row.innerHTML = '<div class="cart-product"><div class="cart-img"><img src="' + item.image + '" alt=""></div><div class="cart-product-info"><span class="cart-product-name">' + item.name + '</span><span class="cart-product-size">Size ' + item.size + '</span></div></div><div class="cart-amount"><span class="cart-qty">1</span></div><div class="cart-price">' + item.price + '</div><button class="cart-remove" data-index="' + index + '">&#10005;</button>';
    cartItems.appendChild(row);
  });

  document.getElementById("cartTotal").textContent = "$" + total.toFixed(2);

  cartItems.addEventListener("click", function(e) {
    if (e.target.classList.contains("cart-remove")) {
      var i = parseInt(e.target.getAttribute("data-index"));
      cart.splice(i, 1);
      localStorage.setItem("cart", JSON.stringify(cart));
      location.reload();
    }
  });
}