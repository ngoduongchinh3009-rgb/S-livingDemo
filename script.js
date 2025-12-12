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
