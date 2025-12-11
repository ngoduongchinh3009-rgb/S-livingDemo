const learnMoreBtns = document.querySelectorAll(".learn-more");

learnMoreBtns.forEach((learnMoreBtns) => {
  learnMoreBtns.addEventListener("click", function () {
    const item = this.closest(".item");

    const name = item.querySelector("h2").innerText;
    const img = item.querySelector("img").src;

    const eng = this.dataset.eng || " ";
    const describe =
      this.dataset.describe || item.querySelector(".content p").innerText;
    const specifications = this.dataset.specifications || " ";

    document.getElementById("detail-name").innerText = name;
    document.getElementById("detail-eng").innerText = eng;
    document.getElementById("detail-img").src = img;

    document.getElementById("detail-describe").innerText = describe;
    document.getElementById("detail-specifications").innerText = specifications;

    productDetail.style.display = "block";

    describeBox.style.display = "block";
    specificationsBox.style.display = "none";
  });
});

const productDetail = document.querySelector(".product-detail");
const backBtn = document.querySelector(".back-btn");

backBtn.addEventListener("click", () => {
  productDetail.style.display = "none";
});

const activeDescribeBtn = document.querySelector(".active-describe");
const activeSpecificationsBtn = document.querySelector(
  ".active-specifications"
);

const describeBox = document.querySelector(".describe");
const specificationsBox = document.querySelector(".specifications");

activeDescribeBtn.addEventListener("click", () => {
  describeBox.style.display = "block";
  specificationsBox.style.display = "none";
});

activeSpecificationsBtn.addEventListener("click", () => {
  describeBox.style.display = "none";
  specificationsBox.style.display = "block";
});
