//Array of all products
let products = [
  {
    name: "G305 Wireless",
    tag: "g305wireless",
    price: 300,
    inCart: 0,
    picture: "../images/G305.png",
    description:
      "The Logitech G305 LIGHTSPEED is a wireless gaming mouse with a solid, plastic shell. It connects using a USB receiver and uses a single AA battery for power. Its egg-shaped body is nearly symmetrical, and there's a pair of side buttons on the left and a button behind the scroll wheel that acts as a CPI button by default.",
    code: 0,
  },
  {
    name: "G502 Hero",
    tag: "g502hero",
    price: 400,
    inCart: 0,
    picture: "../images/LogitechG502.jpg",
    description:
      "The Logitech G502 HERO is a wired gaming mouse that feels very well-built. Its right-handed shape offers ergonomic support with a thumb rest, and it has a ton of programmable buttons, including a sniper button. It also has remarkably low click latency and a wide CPI range.",
    code: 1,
  },
  {
    name: "Pro X Superlight",
    tag: "proxsuperlight",
    price: 500,
    inCart: 0,
    picture: "../images/ProXSuperlight.jpg",
    description:
      "The Logitech PRO X SUPERLIGHT is an outstanding FPS gaming mouse. Despite not having a honeycomb design, this mouse is still extremely light and is among the lightest wireless mice ever! It has excellent build quality, exceptional click latency and high-quality PTFE feet that glide very well on mousepads and desks.",
    code: 2,
  },
  {
    name: "Viper Deathadder",
    tag: "proxsuperlight",
    price: 600,
    inCart: 0,
    picture: "../images/Deathadder.jpg",
    description:
      "The Razer DeathAdder V2 is an excellent FPS gaming mouse. Its click latency is extremely low, and you can set your own custom CPI setting within a very wide range. All of its buttons can be reprogrammed, and it's comfortable enough to use for long gaming marathons.",
    code: 3,
  },
];

// Changed to query selector
let productList = document.querySelector("#shop-items");

let cart = [];

let sum = 0;

let cartTotal = 0;

//Function to show the total of the cart
function displayTotals() {
  cartTotal = 0;
  orderedItems.forEach((currentItem) => {
    cartTotal += currentItem.price;
  });
}

//Function to update total based on items in cart and if coupon is applied + vat
function updateTotal() {
  cartTotal = 0;
  orderedItems.forEach((currentItem) => {
    cartTotal += currentItem.price;
  });
  let discountObject = document.getElementById("discount");
  if (coupon == "DISCOUNT123") {
    discount = cartTotal * 0.25;
    cartTotal = cartTotal - discount;
    discountObject.style.display = "block";
  } else {
    discountObject.style.display = "none";
  }

  vat = cartTotal * 0.15;
  finalTotal = cartTotal + vat;
  document.getElementById("newVat").innerHTML = `Total VAT: R${vat}`;
  document.getElementById("discount").innerHTML = `Discount: R${discount}`;
  document.getElementById(
    "finalTotal"
  ).innerHTML = `Final total: R${finalTotal}`;
  document.getElementById("cartTotal").innerHTML = `Cart total: R${cartTotal}`;
  sessionStorage.setItem("finalTotal", finalTotal);
  sessionStorage.setItem("discount", discount);
  sessionStorage.setItem("vat", vat);
}

// Change this to a normal function that is called on HTML side
function startList() {
  if (sessionStorage.getItem("cartItems")) {
    orderedItems = JSON.parse(sessionStorage.getItem("cartItems"));
    $("#cart").text(orderedItems.length);
  }

  for (i = 0; i < products.length; i++) {
    //creating the html image element
    let img = document.createElement("img");
    img.src = products[i].picture;
    img.alt = products[i].name;

    let codeID = products[i].code.toString();
    img.setAttribute("onclick", `moreInfo(${codeID})`);

    //creating a span with the "name" tag
    let name = document.createElement("div");
    name.innerHTML = products[i].name;
    name.style.paddingLeft = "100px";

    //creating a span with the "price" tag
    let price = document.createElement("span");
    price.innerHTML = `R${products[i].price} `;

    //creating an "add" button
    let productDetail = document.createElement("span");
    let button = document.createElement("button");
    button.innerHTML = "Quick add to cart";
    button.setAttribute("id", codeID);

    let item = products[i];
    button.addEventListener("click", function () {
      orderedItems.push(item);
      $("#cart").text(orderedItems.length);
      sessionStorage.setItem("cartItems", JSON.stringify(orderedItems));
      displayTotals();
      alert("Current total is R" + cartTotal);
      console.log("The total cart price is ", cartTotal);
    });

    if (productList == null || productList == undefined) {
      productList = document.querySelector("#shop-items");
    }

    productList.appendChild(name);
    productList.appendChild(img);

    productDetail.appendChild(price);
    productDetail.appendChild(button);

    productList.appendChild(productDetail);
  }
}

//Function to click on an image for more info
function moreInfo(code) {
  sessionStorage.setItem(
    "currentItem",
    JSON.stringify(products.filter((x) => x.code == code)[0])
  );
  window.location = "../html/product.html";
}

let cartItems = document.querySelector("cartItems");

let testOne = [];

let sumOne = 0;

//Creates a table of items for the cart when an item is added
function cartList() {
  orderedItems = JSON.parse(sessionStorage.getItem("cartItems"));
  document.getElementById("task-row").innerHTML = "";
  $("#cart").text(orderedItems.length);
  orderedItems.forEach((items, i) => {
    let cartTable = document.getElementById("task-row");

    //creating the html image element
    let img = document.createElement("img");
    img.src = orderedItems[i].picture;
    img.alt = orderedItems[i].name;

    cartTable.innerHTML += `
        <tr>
            <td><button type="button" class="btn btn-primary" onclick="removeFromCart(${items.code})">x</button></td>
            <td>${items.name}</td>
            <td>R${items.price}</td>
            <td><img onclick = "moreInfo(${items.code})" src=${items.picture} class="cartImage"></img></td>
            <td>${items.description}</td>
        </tr>
        
        `;
  });

  document.getElementById("cartTotal").innerHTML = `R${cartTotal}`;
  updateTotal();
}

let discount = 0;

let vat = 0;

let finalTotal = 0;

let coupon = "";

//Function to call the coupon with an ID
function getCouponData() {
  coupon = document.getElementById("cartCoupon").value;
  updateTotal();
}

//Creating a dropdown menu with an accordion animation
$(document).ready(function () {
  $(".dropdown li").hover(
    function () {
      $(">ul.sub:not(:animated)", this).slideDown(500);
    },
    function () {
      $(">ul.sub", this).slideUp(500);
    }
  );
});
