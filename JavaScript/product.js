const productsEl = document.querySelector(".products");
const cartItemsEl = document.querySelector(".cart-items");
const subtotalEl = document.querySelector(".subtotal");
const totalItemsInCartEl = document.querySelector(".total-items-in-cart");

const products = [
    {
      id: 0,
      name: "FREE WIFI EMO 8.25.",
      price: 749.99,
      instock: 100,
      description: "standard popsicle shape.",
      category:"Skateboard",
      imgSrc: "https://i.postimg.cc/QCZJxhKJ/154417-0-Free-Wifi-Emo825.webp",
    },
    {
      id: 1,
      name: "Will Marshall Pro Model.",
      price: 599.99,
      instock: 43,
      description:
        "Standard popsicle shape.",
        category:"Skateboard",
      imgSrc: "https://i.postimg.cc/BvNs4n82/149464-0-Alltimers-Will-NVA81.webp",
    },
    {
      id: 2,
      name: "Long Island LongBoard.",
      price: 859.99,
      instock: 10,
      description:
        "Twin-tip shape.",
        category:"Longboard",
      imgSrc: "https://i.postimg.cc/HLTHqyLp/143724-0-Long-Island-Endless3285834cm-Drop.webp",
    },
    {
      id: 3,
      name: "ELEMENT X STAR WARS MILLENIUM FALCON",
      price: 549.99,
      instock: 5,
      description:
        "Standard popsicle shape.",

        category:"Skateboard",
      imgSrc: "https://i.postimg.cc/x1vnpRnx/153376-0-Element-x-Star-Wars-Millenium-Falcon8.webp",
    },
    {
      id: 4,
      name: "ELEMENT X TIMBER FLOOD DRAGON",
      price: 799.99,
      instock: 4,
      description:
        "Standard popsicle shape.",
        category:"Skateboard",
      imgSrc: "https://i.postimg.cc/9MM2MHTK/162493-0-Element-x-Timber-Flood-Dragon85.webp",
    },
    {
      id: 5,
      name: "Globe Conical Cruiser.",
      price: 999.99,
      instock: 40,
      description:
        "Kicktail, wheelwells.",
        category:"Longboard",
      imgSrc: "https://i.postimg.cc/XJzbB1kJ/143996-0-Globe-The-All-Time35875905cm.webp",
    },
  ];
  


//PRODUCTS
function renderProdcuts() {
  products.forEach((product) => {
    productsEl.innerHTML += `
            <div class="item">
                <div class="item-container">
                    <div class="item-img">
                        <img src="${product.imgSrc}" alt="${product.name}">
                    </div>
                    <div class="desc">
                        <h3>${product.name}</h3>
                        <h2>R${product.price}</h2>
                        <p>
                            ${product.description}
                        </p>
                    </div>
                    <div class="add-to-cart" onclick="addToCart(${product.id})">
                        <button class="add-to-cart">Add to cart</button>
                    </div>
                </div>
            </div>
        `;
  });
}
renderProdcuts();

// cart array
let cart = JSON.parse(localStorage.getItem("CART")) || [];
// updateCart();

// ADD TO CART
function addToCart(id) {
  // check if product already exist in cart
  if (cart.some((item) => item.id === id)) {
    changeNumberOfUnits("plus", id);
  } else {
    const item = products.find((product) => product.id === id);

    cart.push({
      ...item,
      numberOfUnits: 1,
    });
  }

  updateCart();
}

// update cart
function updateCart() {
  renderCartItems();
  renderSubtotal();

  // save to local storage
  localStorage.setItem("CART", JSON.stringify(cart));
}

// calculate subtotal
function renderSubtotal() {
  let totalPrice = 0,
    totalItems = 0;

  cart.forEach((item) => {
    totalPrice += item.price * item.numberOfUnits;
    totalItems += item.numberOfUnits;
  });

  subtotalEl.innerHTML = `Subtotal (${totalItems} items): R${totalPrice.toFixed(2)}`;
}

// render cart items to html
function renderCartItems() {
  cartItemsEl.innerHTML = ""; // clear cart element
  cart.forEach((item) => {
    cartItemsEl.innerHTML += `
        <div class="cart-item">
            <div class="item-info" onclick="removeItemFromCart(${item.id})">
                <img src="${item.imgSrc}" alt="${item.name}">
                <h4>${item.name}</h4>
            </div>
            <div class="unit-price">
                <small>R</small>${item.price}
            </div>
            <div class="units">
                <div class="btn minus" onclick="changeNumberOfUnits('minus', ${item.id})">-</div>
                <div class="number">${item.numberOfUnits}</div>
                <div class="btn plus" onclick="changeNumberOfUnits('plus', ${item.id})">+</div>           
            </div>
        </div>
      `;
  });
}

// remove item from cart
function removeItemFromCart(id) {
  cart = cart.filter((item) => item.id !== id);

  updateCart();
}

// change number of units for an item
function changeNumberOfUnits(action, id) {
  cart = cart.map((item) => {
    let numberOfUnits = item.numberOfUnits;

    if (item.id === id) {
      if (action === "minus" && numberOfUnits > 1) {
        numberOfUnits--;
      } else if (action === "plus" && numberOfUnits < item.instock) {
        numberOfUnits++;
      }
    }

    return {
      ...item,
      numberOfUnits,
    };
  });

  updateCart();
}


// Sorting by price
sortingByPrice.addEventListener('click', (e)=> {
  e.preventDefault();
  try{
      if(!products) throw "Please try again later."; 
      products.sort((a, b)=> a.amount - b.amount);
      displayProducts();
  }catch(e) {
      productCard.innerHTML = e;
  }
})