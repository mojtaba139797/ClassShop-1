import { getProducts } from "./api.js";

async function products() {
  try {
    const products = await getProducts();

    const cardContainer = document.querySelector(".card-container");
    const searchInput = document.querySelector("input");
    const beautyBtn = document.querySelector("#beauty");
    const fragrancesBtn = document.querySelector("#fragrances");
    const furnitureBtn = document.querySelector("#furniture");
    const groceriesBtn = document.querySelector("#groceries");
    const allBtn = document.querySelector("#all");

    function createProductCard(product) {
      const productCard = document.createElement("div");
      productCard.className = "product-Card";
      productCard.innerHTML = `
          <img
            src=${product.thumbnail}
            width="100%"
            height="50%"
            alt=${product.title}
          />
          <a href="./ProductDetail.html?id=${product.id}" class="title">${product.title}</a>
          <p class="price">${product.price}تومان</p>
          <button>افزودن به سبد</button>
      `;
      return productCard;
    }

    function filterByCategory(category) {
      const filteredProducts = products.filter(
        (product) => product.category === category,
      );
      console.log(filteredProducts);
      renderProducts(filteredProducts);
    }

    function renderProducts(products) {
      cardContainer.innerHTML = ``;
      products.forEach((product) => {
        const productCard = createProductCard(product);
        cardContainer.appendChild(productCard);
      });
    }

    renderProducts(products);

    searchInput.addEventListener("keyup", (e) => {
      const searchValue = searchInput.value;
      const newProducts = products.filter((product) =>
        product.title.includes(searchValue),
      );
      if (newProducts.length > 0) {
        renderProducts(newProducts);
      } else {
        cardContainer.innerHTML = "";
        const noResults = document.createElement("div");
        noResults.className = "noResults";
        noResults.innerHTML = `
          <p>موردی یافت نشد</p> 
        `;
        cardContainer.appendChild(noResults);
      }
    });

    allBtn.addEventListener("click", () => {
      renderProducts(products);
      console.log(products);
    });

    beautyBtn.addEventListener("click", () => {
      const category = beautyBtn.id;
      filterByCategory(category);
    });

    fragrancesBtn.addEventListener("click", () => {
      const category = fragrancesBtn.id;
      filterByCategory(category);
    });

    furnitureBtn.addEventListener("click", () => {
      const category = furnitureBtn.id;
      filterByCategory(category);
    });

    groceriesBtn.addEventListener("click", () => {
      const category = groceriesBtn.id;
      filterByCategory(category);
    });
  } catch (error) {
    console.error(error);
    const cardContainer = document.querySelector(".card-container");
    const wrong = document.createElement("div");
    wrong.className = "error";
    wrong.innerHTML = `
      <p> خطایی رخ داد!!!</p>
    `;
    cardContainer.appendChild(wrong);
  }
}

products();
