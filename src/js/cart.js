document.addEventListener("DOMContentLoaded", () => {
  const cart = localStorage.getItem("cart");
  console.log(cart);
  const products = JSON.parse(cart);
  const orders = document.querySelector(".orders");
  const cartContainer = document.querySelector(".cart-container");
  orders.innerHTML = ``;
  console.log(products);
  try {
    if (products) {
      const summary = document.createElement("div");
      summary.className = "summary";
      products.map((product) => {
        const orderCard = document.createElement("div");
        const price = Number(product.quantity) * Number(product.price);
        orderCard.className = "order-card";
        orderCard.innerHTML = `
        <div class="order-info">
              <img
                class="img-order"
                src=${product.image}
                alt=${product.title}
                width="40px"
                height="40px"
              />
              <div class="order-name">
                <p class="name"><a href="./ProductDetail.html">${product.title}</a></p>
                <p class="price">${product.price}تومان</p>
              </div>
            </div>
            <div class="counter-delete">
              <div class="counter-totalPrice">
                <div class="counter">
                  <span class="increase">-</span>
                  <p>${product.quantity}</p>
                  <span class="decrease">+</span>
                </div>
                <p class="total-order-price">${price}تومان</p>
              </div>
              <img
                class="delete-order"
                src="./assets/icon/zarbdar.png"
                alt="zarbdar"
                width="15px"
                height="15px"
              />
            </div>
    `;
        orders.appendChild(orderCard);
      });
      const summaryQuantity = products.reduce((acc, product) => {
        return acc + product.quantity;
      }, 0);
      const summaryPrice = products.reduce((acc, product) => {
        return acc + Number(product.price) * Number(product.quantity);
      }, 0);
      console.log(summaryPrice);
      summary.innerHTML = `
            <h3>خلاصه سفارش</h3>
          <div class="total-quantity">
            <p>تعداد محصول ها</p>
            <p>${summaryQuantity}</p>
          </div>
          <div class="total-price">
            <p>جمع کل</p>
            <p>${summaryPrice.toLocaleString("fa-IR")}تومان</p>
          </div>
          <div class="button-container">
            <button id="sabt">ثبت سفارش</button>
            <button id="kharid">ادامه خرید</button>
          </div>
        `;
      cartContainer.appendChild(summary);
      const quantityElement = document.querySelector(".cartQuantity");
      quantityElement.innerHTML = `${summaryQuantity}`;
    } else {
      const orders = document.querySelector(".orders");
      const wrong = document.createElement("p");
      wrong.className = "error";
      wrong.innerHTML = "سبد شما خالی است!";
      orders.appendChild(wrong);
    }
  } catch (error) {
    console.error(error);
  }
});
