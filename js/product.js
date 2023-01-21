//Using jquery for the image onclick function for each product
let currentItem = JSON.parse(sessionStorage.getItem("currentItem"));

$("#product-name").text(currentItem.name);
$("#product-description").text(currentItem.description);
$(".shop-item-price").text("R" + currentItem.price);

let img = document.createElement("img");
img.src = currentItem.picture;
img.alt = currentItem.name;

$(".shop-item-image").html(img);

$(".shop-item-button").on("click", function () {
  orderedItems.push(currentItem);
  $("#cart").text(orderedItems.length);
  sessionStorage.setItem("cartItems", JSON.stringify(orderedItems));
  displayTotals();
  alert("Current total is R" + cartTotal);
});
