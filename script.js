const learnMoreBtn = document.querySelector(".learn-more");
const productDetail = document.querySelector(".product-detail");
const backBtn = document.querySelector(".back-btn");
learnMoreBtn.addEventListener("click", function () {
  productDetail.style.display = "block";
});
backBtn.addEventListener("click", function () {
  productDetail.style.display = "none";
});

const activeDescribeBtn = document.querySelector(".active-describe");
const describe = document.querySelector(".describe");
activeDescribeBtn.addEventListener("click", function () {
  describe.style.display = "block";
});
