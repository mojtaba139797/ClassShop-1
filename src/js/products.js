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
          <a href="./ProductDetail.html" class="title">${product.title}</a>
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
      cardContainer.innerHTML = ``;
      filteredProducts.forEach((product) => {
        const filteredProductCard = createProductCard(product);
        cardContainer.appendChild(filteredProductCard);
      });
    }

    products.forEach((product) => {
      const productCard = createProductCard(product);
      cardContainer.appendChild(productCard);
    });

    searchInput.addEventListener("keyup", (e) => {
      const searchValue = searchInput.value;
      const newProducts = products.filter((product) =>
        product.title.includes(searchValue),
      );
      cardContainer.innerHTML = ``;
      if (newProducts.length > 0) {
        newProducts.forEach((newProduct) => {
          const newProductCard = createProductCard(newProduct);
          cardContainer.appendChild(newProductCard);
        });
      } else {
        const noResults = document.createElement("div");
        noResults.className = "noResults";
        noResults.innerHTML = `
          <p>موردی یافت نشد</p> 
        `;
        cardContainer.appendChild(noResults);
      }
    });

    beautyBtn.addEventListener("click", () => {
      const category = beautyBtn.id;
      filterByCategory(category);
      // const beautyProducts = products.filter(
      //   (product) => product.category === category,
      // );
      // console.log(beautyProducts);
      // cardContainer.innerHTML = ``;
      // beautyProducts.forEach((product) => {
      //   const beautyProductCard = createProductCard(product);
      //   cardContainer.appendChild(beautyProductCard);
      // });
    });

    fragrancesBtn.addEventListener("click", () => {
      const category = fragrancesBtn.id;
      filterByCategory(category);
      // const fragrancesProducts = products.filter(
      //   (product) => product.category === category,
      // );
      // console.log(fragrancesProducts);
      // cardContainer.innerHTML = ``;
      // fragrancesProducts.forEach((product) => {
      //   const fragrancesProductCard = createProductCard(product);
      //   cardContainer.appendChild(fragrancesProductCard);
      // });
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
