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