const learnMoreBtns = document.querySelectorAll(".learn-more");
const productDetail = document.querySelector(".product-detail");
const backBtn = document.querySelector(".back-btn");
const activeDescribeBtn = document.querySelector(".active-describe");
const activeSpecificationsBtn = document.querySelector(
  ".active-specifications"
);

learnMoreBtns.forEach(function (btn) {
  btn.addEventListener("click", function () {
    productDetail.style.display = "block";

    const item = this.closest(".item");
    const name = item.querySelector("h2").innerText;
    const img = item.querySelector("img").src;
    const eng = this.dataset.eng || " ";
    const describe = this.dataset.describe || " ";
    const specifications = this.dataset.specifications || " ";

    document.getElementById("detail-name").innerText = name;
    document.getElementById("detail-eng").innerText = eng;
    document.getElementById("detail-describe").innerText = describe;
    document.getElementById("detail-specifications").innerText = specifications;
    document.getElementById("detail-img").src = img;
  });
});

const describeBox = document.querySelector(".describe");
const specificationsBox = document.querySelector(".specifications");
activeDescribeBtn.addEventListener("click", function () {
  describeBox.style.display = "block";
  specificationsBox.style.display = "none";
});
activeSpecificationsBtn.addEventListener("click", function () {
  specificationsBox.style.display = "block";
  describeBox.style.display = "none";
});
backBtn.addEventListener("click", function () {
  productDetail.style.display = "none";
});

const addCartBtns = document.querySelectorAll(".add-cart");
const cartIcon = document.querySelector(".icon-cart");
const cartBox = document.querySelector(".cart-box");
const cartImg = document.getElementById("cart-img");
const cartName = document.getElementById("cart-name");
const cartEng = document.getElementById("cart-eng");
const cartBackBtn = document.querySelector(".cart-box .back-btn");

let cart = [];
addCartBtns.forEach(function (btn) {
  btn.addEventListener("click", function () {
    const product = this.closest(".best-sellers-list, .products-list");
    const name = product.querySelector(".best-sellers-names").innerText;
    const eng = product.querySelector(".best-sellers-names-e").innerText;
    const img = product.querySelector("img").src;
    addToCart(name, eng, img);
  });
});
function addToCart(name, eng, img) {
  const existedItem = cart.find((item) => item.name === name);
  if (existedItem) {
    existedItem.quantity++;
  } else {
    cart.push({
      name: name,
      eng: eng,
      img: img,
      quantity: 1,
    });
  }
  showCart(cart[cart.length - 1]);
}
function showCart(item) {
  cartImg.src = item.img;
  cartName.innerText = item.name;
  cartEng.innerText = item.eng;
  cartBox.style.display = "block";
}
cartIcon.addEventListener("click", function () {
  cartBox.style.display = "block";
});
cartBackBtn.addEventListener("click", function () {
  cartBox.style.display = "none";
});
