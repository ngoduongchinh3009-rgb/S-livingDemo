const learnMoreBtns = document.querySelectorAll(".learn-more");
const productDetail = document.querySelector(".product-detail");
const productBackBtn = document.querySelector(".product-detail .back-btn");
const activeDescribeBtn = document.querySelector(".active-describe");
const activeSpecificationsBtn = document.querySelector(
  ".active-specifications"
);

const detailName = document.getElementById("detail-name");
const detailEng = document.getElementById("detail-eng");
const detailDescribe = document.getElementById("detail-describe");
const detailSpecification = document.getElementById("detail-specifications");
const detailImg = document.getElementById("detail-img");
const describeBox = document.querySelector(".describe");
const specificationsBox = document.querySelector(".specifications");

learnMoreBtns.forEach(function (btn) {
  btn.addEventListener("click", function () {
    productDetail.style.display = "block";
    const item = this.closest(".item");
    const name = item.querySelector("h2").innerText;
    const img = item.querySelector("img").src;
    const eng = this.dataset.eng || "";
    const describe = this.dataset.describe || "";
    const specifications = this.dataset.specifications || "";

    detailName.innerText = name;
    detailEng.innerText = eng;
    detailDescribe.innerText = describe;
    detailSpecification.innerText = specifications;
    detailImg.src = img;
  });
});
activeDescribeBtn.addEventListener("click", function () {
  describeBox.style.display = "block";
  specificationsBox.style.display = "none";
});
activeSpecificationsBtn.addEventListener("click", function () {
  specificationsBox.style.display = "block";
  describeBox.style.display = "none";
});
productBackBtn.addEventListener("click", function () {
  productDetail.style.display = "none";
});

const cartBox = document.querySelector(".cart-box");
const cartIcon = document.querySelector(".icon-cart");
const cartBackBtn = document.querySelector(".cart-box .back-btn");
const cartListContainer = document.querySelector(".cart-list");
const cartTotalElement = document.querySelector(".cart-footer b");

let cart = [];

const addCartBtns = document.querySelectorAll(".add-cart");

addCartBtns.forEach(function (btn) {
  const minusBtn = btn.querySelector(".qty-minus");
  const valueSpan = btn.querySelector(".qty-value");
  const plusBtn = btn.querySelector(".qty-plus");

  btn.addEventListener("click", function (e) {
    if (this.classList.contains("has-qty")) return;
    e.preventDefault();
    this.classList.add("has-qty");

    const productData = getProductData(this);
    addToCart(productData.name, productData.eng, productData.img);
  });

  plusBtn.addEventListener("click", function (e) {
    e.stopPropagation();
    e.preventDefault();

    const productData = getProductData(btn);
    const item = cart.find((i) => i.name === productData.name);

    if (item) {
      item.quantity++;
      valueSpan.innerText = item.quantity;
      renderCart();
    }
  });

  minusBtn.addEventListener("click", function (e) {
    e.stopPropagation();
    e.preventDefault();

    const productData = getProductData(btn);
    const item = cart.find((i) => i.name === productData.name);

    if (item) {
      if (item.quantity > 1) {
        item.quantity--;
        valueSpan.innerText = item.quantity;
        renderCart();
      } else {
        removeFromCart(productData.name);
        btn.classList.remove("has-qty");
        valueSpan.innerText = "1";
      }
    } else {
      btn.classList.remove("has-qty");
      valueSpan.innerText = "1";
    }
  });
});
function getProductData(btnElement) {
  const product = btnElement.closest(".best-sellers-list, .products-list");
  return {
    name: product.querySelector(".best-sellers-names").innerText,
    eng: product.querySelector(".best-sellers-names-e").innerText,
    img: product.querySelector("img").src,
  };
}
function addToCart(name, eng, img) {
  const existingItem = cart.find(function (item) {
    return item.name === name;
  });
  if (existingItem) {
    existingItem.quantity++;
  } else {
    cart.push({ name: name, eng: eng, img: img, quantity: 1 });
  }
  renderCart();
}
function removeFromCart(name) {
  cart = cart.filter(function (item) {
    return item.name !== name;
  });
  renderCart();
}
function renderCart() {
  const cartCountElement = document.querySelector(".cart-count");
  const cartFooter = document.querySelector(".cart-footer");
  const emptyCart = document.querySelector(".empty-cart");
  const template = document.getElementById("cart-item-template");

  cartListContainer.innerHTML = "";

  let totalQty = 0;
  cart.forEach(function (item) {
    totalQty += item.quantity;
  });

  if (cartCountElement) {
    if (totalQty > 0) {
      cartCountElement.innerText = totalQty;
      cartCountElement.style.display = "flex";
    } else {
      cartCountElement.innerText = 0;
      cartCountElement.style.display = "none";
    }
  }

  if (cart.length === 0) {
    emptyCart.style.display = "flex";
    cartListContainer.style.display = "none";
    if (cartFooter) cartFooter.style.display = "none";
    return;
  }

  emptyCart.style.display = "none";
  cartListContainer.style.display = "block";
  if (cartFooter) cartFooter.style.display = "block";

  cart.forEach(function (item) {
    const clone = template.content.cloneNode(true);

    clone.querySelector(".cart-img").src = item.img;
    clone.querySelector(".cart-name").innerText = item.name;
    clone.querySelector(".cart-eng").innerText = item.eng;
    clone.querySelector("span.cart-qty").innerText = item.quantity;

    clone.querySelector(".minus").setAttribute("data-name", item.name);
    clone.querySelector(".plus").setAttribute("data-name", item.name);
    clone.querySelector(".cart-remove").setAttribute("data-name", item.name);

    cartListContainer.appendChild(clone);
  });

  if (cartCountElement) {
    cartTotalElement.innerText = `${totalQty} sản phẩm`;
    cartCountElement.style.display = "flex";
  }

  addCartPopupEvents();
}
function addCartPopupEvents() {
  document.querySelectorAll(".cart-remove").forEach(function (btn) {
    btn.addEventListener("click", function () {
      const name = this.getAttribute("data-name");
      removeFromCart(name);
      resetMainButton(name);
    });
  });
  document.querySelectorAll(".cart-qty-btn").forEach(function (btn) {
    btn.addEventListener("click", function () {
      const name = this.getAttribute("data-name");
      const isPlus = this.classList.contains("plus");

      const item = cart.find(function (i) {
        return i.name === name;
      });
      if (item) {
        if (isPlus) {
          item.quantity++;
        } else {
          item.quantity--;
          if (item.quantity === 0) {
            removeFromCart(name);
            resetMainButton(name);
            return;
          }
        }
        renderCart();
        updateMainButtonQty(name, item.quantity);
      }
    });
  });
}
function resetMainButton(productName) {
  const allContainers = document.querySelectorAll(
    ".best-sellers-list, .products-list"
  );
  allContainers.forEach(function (container) {
    const nameEl = container.querySelector(".best-sellers-names");
    if (nameEl && nameEl.innerText === productName) {
      const btn = container.querySelector(".add-cart");
      if (btn) {
        btn.classList.remove("has-qty");
        const qtyVal = btn.querySelector(".qty-value");
        if (qtyVal) qtyVal.innerText = "1";
      }
    }
  });
}
function updateMainButtonQty(productName, newQty) {
  const allContainers = document.querySelectorAll(
    ".best-sellers-list, .products-list"
  );
  allContainers.forEach(function (container) {
    const nameEl = container.querySelector(".best-sellers-names");
    if (nameEl && nameEl.innerText === productName) {
      const qtyVal = container.querySelector(".qty-value");
      if (qtyVal) qtyVal.innerText = newQty;
    }
  });
}
function openCart() {
  cartBox.style.display = "flex";
  document.querySelector("footer").classList.add("hide");
}
function closeCart() {
  cartBox.style.display = "none";
  document.querySelector("footer").classList.remove("hide");
}

cartIcon.addEventListener("click", openCart);
cartBackBtn.addEventListener("click", closeCart);

const continueBtn = document.querySelector(".continue-btn");
if (continueBtn) continueBtn.addEventListener("click", closeCart);

const submitBtn = document.querySelector(".cart-submit");
if (submitBtn) submitBtn.addEventListener("click", closeCart);
