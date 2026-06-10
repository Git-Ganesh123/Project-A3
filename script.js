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
    
    
    var popup = document.createElement("div");
    popup.className = "cart-popup";

    popup.textContent = name + " added to cart!";
    document.body.appendChild(popup);

    setTimeout(function() { popup.classList.add("show"); }, 10);
    setTimeout(function() {
      popup.classList.remove("show");
      setTimeout(function() { popup.remove(); }, 300);
    }, 2500);

  });
}

var cartItems = document.getElementById("cartItems");
if (cartItems) {
  var cart = JSON.parse(localStorage.getItem("cart") || "[]");
  var total = 0;

  cart.forEach(function(item, index) {
    var price = parseFloat(item.price.replace(/[^0-9.]/g, "")) || 0;
    total += price;
    var row = document.createElement("div");
    row.className = "cart-row";
    row.innerHTML =
      '<div class="cart-product">' +
        '<img src="' + item.image + '" class="cart-item-img" alt="">' +
        '<span>' + item.name + (item.size ? " &ndash; Size " + item.size : "") + '</span>' +
      '</div>' +
      '<div class="cart-amount">1</div>' +
      '<div class="cart-price">' + item.price + '</div>' +
      '<button class="cart-remove" data-index="' + index + '">&#10005;</button>';
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