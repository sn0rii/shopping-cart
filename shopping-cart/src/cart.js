let label = document.getElementById("label");
let ShoppingCart = document.getElementById("shopping-cart");

let basket = JSON.parse(localStorage.getItem("data")) || [];

let calculation = () => {
  let cartIcon = document.getElementById("cartAmount");
  cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
};

calculation();

let generateCartItem = () => {
  if (basket.length !== 0) {
    return (ShoppingCart.innerHTML = basket
      .map((x) => {
        let { id, item } = x;
        let search = shopItemsData.find((y) => y.id === id) || [];
        return `
      <div class="cart-item">
        <img width="100" src=${search.img} alt=""/>
        <div class="details">

          <div class="title-price-x">
            <h4 class="title-price">
            <p>${search.name}</p>
            <p class="cart-item-price">$ ${search.price} </p>
            </h4>
            <i class="bi bi-x-lg"></i>
            </div>

            <div class="buttons">
              <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
              <div id=${id} class="quantity">${item}</div>
              <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
            </div>

          <h3>$ ${item * search.price}</h3>

        </div>
      </div>
      `;
      })
      .join(""));
  } else {
    ShoppingCart.innerHTML = ``;
    label.innerHTML = `
    <h2>Cart is empty</h2>
    <a href="index.html">
    <button class="HomeBtn">Back to home</button>
    </a>
    `;
  }
};

generateCartItem();

let increment = (id) => {
  let selectedItems = id;
  let search = basket.find((x) => x.id === selectedItems.id);

  if (search === undefined) {
    basket.push({
      id: selectedItems.id,
      item: 1,
    });
  } else {
    search.item += 1;
  }

  generateCartItem();
  update(selectedItems.id);

  localStorage.setItem("data", JSON.stringify(basket));
};
let decrement = (id) => {
  let selectedItems = id;
  let search = basket.find((x) => x.id === selectedItems.id);

  if (search === undefined) return;
  else if (search.item === 0) return;
  else {
    search.item -= 1;
  }
  update(selectedItems.id);
  basket = basket.filter((x) => x.item !== 0);
  generateCartItem();

  localStorage.setItem("data", JSON.stringify(basket));
};

let update = (id) => {
  let search = basket.find((x) => x.id === id);
  //   console.log(search.item);
  document.getElementById(id).innerHTML = search.item;
  calculation();
};
