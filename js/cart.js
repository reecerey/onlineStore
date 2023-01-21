//empty array for the cart
let orderedItems = [];

//pushing items to the cart using session storage
if (sessionStorage.getItem("cartItems")) {
  orderedItems = JSON.parse(sessionStorage.getItem("cartItems"));
  $("#cart").text(orderedItems.length);
}

//function to update totals
function displayTotals() {
  cartTotal = 0;
  orderedItems.forEach((currentItem) => {
    cartTotal += currentItem.price;
  });
}

//button to remove individual items from the cart
function removeFromCart(code) {
  orderedItems.splice(
    orderedItems.findIndex((x) => x.code == code),
    1
  );
  sessionStorage.setItem("cartItems", JSON.stringify(orderedItems));
  cartList();
}

//button to remove all items from the cart
function clearAll() {
  sessionStorage.clear();
  location.reload();
}

//button to take you to checkout page
$(document).ready(function () {
  $("#checkoutButton").on("click", function () {
    location.href = "checkout.html";
  });
});

//button to take you to purchase page
$(document).ready(function (confirmOrder) {
  $("#orderButton").on("click", function () {
    location.href = "order.html";
  });
});

//pulling the finalTotal from the session storage
$(document).ready(function () {
  if (sessionStorage.getItem("finalTotal")) {
    finalTotal = sessionStorage.getItem("finalTotal");
  }
  document.getElementById(
    "finalTotal"
  ).innerHTML = `Final total: R${finalTotal}`;
});

//Hiding the collection and delivery options until clicked
function cartOnLoad() {
  let collectionBox = document.getElementById("collectionBox");
  collectionBox.style.visibility = "hidden";

  let deliveryBox = document.getElementById("deliveryBox");
  deliveryBox.style.visibility = "hidden";
}

//Jquery to show the collection or delivery options
$(document).ready(function () {
  $(".collectionButton").click(function () {
    $("#show").show("slow");
  });
});

//Showing and hiding the collection and delivery options
function showCollection() {
  $(".collection")
    .slideDown()
    .animate({ left: 50 }, "fast")
    .animate({ left: 0 }, "fast");
  $(".delivery").slideUp();
}

function showDelivery() {
  $(".collection").slideUp();
  // $('.delivery').css('position','absolute').slideDown().animate({"left": 1000}).animate({"left": 500});
  $(".delivery")
    .slideDown()
    .animate({ left: 50 }, "fast")
    .animate({ left: 0 }, "fast");
}
