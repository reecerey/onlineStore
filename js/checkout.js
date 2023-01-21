function confirmDelivery() {
  if (sessionStorage.getItem("finalTotal")) {
    finalTotal = Number(sessionStorage.getItem("finalTotal"));
    finalTotal += 100;
    sessionStorage.setItem("finalTotal", finalTotal);
  }
  document.getElementById(
    "finalTotal"
  ).innerHTML = `Final total: R${finalTotal}`;

  $("#confirmDeliveryButton").attr("disabled", true);
  $(".dropdown li").off("mouseenter mouseleave");

  let deliveryDetails = {
    city:$('#city').val(),
    firstName:$('#firstName').val(),
    lastName:$('#lastName').val(),
    birthYear:$('#birthYear').val(),
    address:$('#Address').val(),    
  };

  sessionStorage.setItem("deliveryDetails", JSON.stringify(deliveryDetails));
  sessionStorage.setItem("isDelivery", true);
}

function confirmOrder() {
  let oNum = (Math.random() * 1000).toFixed(0);
  sessionStorage.setItem("orderNumber", oNum);
  alert("order successful! OrderNumber: " + oNum);
}

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
              <td>${items.name}</td>
              <td>R${items.price}</td>
              <td><img onclick = "moreInfo(${items.code})" src=${items.picture} class="cartImage"></img></td>
              <td>${items.description}</td>
          </tr>
          
          `;
  });
  updateTotal();
}

function updateTotal() {
  finalTotal = sessionStorage.getItem("finalTotal");
  discount = sessionStorage.getItem("discount");
  vat = sessionStorage.getItem("vat");

  cartTotal = 0;
  orderedItems.forEach((currentItem) => {
    cartTotal += currentItem.price;
  });

  vat = cartTotal * 0.15;
  finalTotal = cartTotal + vat - discount;
  if (sessionStorage.getItem("isDelivery")) {
    document.getElementById("deliveryTotal").innerHTML = `Delivery is: R100`;
    $("#deliverySummary").html(`Delivery Summary:`);
    finalTotal = finalTotal + 100;
  }

  let deliveryDetails = JSON.parse(sessionStorage.getItem("deliveryDetails"));

  let orderNumber = sessionStorage.getItem("orderNumber");

  $("#newVat").html(`Total VAT: R${vat}`);
  $("#cartTotal").html(`Cart total: R${cartTotal}`);
  if (discount > 0) {
    $("#discount").html(`Discount: R${discount}`);
  }
  $("#finalTotal").html(`Final total: R${finalTotal}`);
  $("#orderNumber").html(`Order Number: ${orderNumber}`);

  $("#city").html(`City: ${deliveryDetails.city}`);
  $("#firstName").html(`First Name: ${deliveryDetails.firstName}`);
  $("#lastName").html(`Last Name: ${deliveryDetails.lastName}`);
  $("#birthYear").html(`Birth Year: ${deliveryDetails.birthYear}`);
  $("#address").html(`Address: ${deliveryDetails.address}`);
}
