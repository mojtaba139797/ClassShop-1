import { getProducts } from "./api.js";

async function productDetails() {
  const pageUrl = window.location.search;
  const searchParams = new URLSearchParams(pageUrl);
  const id = searchParams.get("id");
  const main = document.querySelector(".main");

  try {
    const products = await getProducts();
    const thisProduct = products.find((product) => product.id === Number(id));

    // cart.push(addedProduct);
    // console.log(cart);

    main.innerHTML = `
        <img src=${thisProduct.thumbnail} alt=${thisProduct.title} id="product-img" />
      <div class="product-info">
        <button class="filter">${thisProduct.category}</button>
        <h2 id="product-name">${thisProduct.title}</h2>
        <p id="product-price">${thisProduct.price} تومان</p>
        <p id="describtion"> 
            ${thisProduct.description}
        </p>
        <div class="quantity">
          <div class="counter">
            <span class="increase">-</span>
            <p>1</p>
            <span class="decrease">+</span>
          </div>
          <button id="addToCart">افزودن به سبد</button>
        </div>
        <a href="./Index.html">برگشت به فهرست محصولات</a>
      </div>
    `;
    const addToCartBtn = document.querySelector("#addToCart");
    addToCartBtn.addEventListener("click", () => {
      let cart = localStorage.getItem("cart");
      console.log(cart);
      if (cart) {
        cart = JSON.parse(cart);
      } else {
        cart = [];
      }
      console.log(cart);
      let addedProduct = {
        id: thisProduct.id,
        title: thisProduct.title,
        price: thisProduct.price,
        image: thisProduct.thumbnail,
        quantity: 1,
      };
      console.log(addedProduct);
      const existingProduct = cart.find((p) => p.id === addedProduct.id);
      console.log(existingProduct);
      if (existingProduct !== undefined) {
        existingProduct.quantity++;
      } else {
        cart.push(addedProduct);
      }
      console.log(cart);
      localStorage.setItem("cart", JSON.stringify(cart));
      console.log(localStorage.getItem("cart"));
    });
  } catch (error) {
    console.error(error);
  }
}

productDetails();
