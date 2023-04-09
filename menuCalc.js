// Get the Pizza Category link
let link = document.querySelector('.pizza-category a');

// Add a click event listener to the link
link.addEventListener('click', function(event) {
  // Prevent the default action of the link (i.e. jumping to the href)
  event.preventDefault();

  // Get the ID of the element to jump to
  let targetID = link.getAttribute('data-id');

  // Use the scrollIntoView() method to jump to the element
  document.querySelector(`#${targetID}`).scrollIntoView({behavior: "smooth"});
});

// get the necessary DOM elements
const cartBtns = document.querySelectorAll(".add-to-cart-btn");
const addOnCheckboxes = document.querySelectorAll("input[type='checkbox']");
const amountDueInput = document.getElementById("amount-due");
const paymentInput = document.getElementById("payment");
const changeInput = document.getElementById("change");
const quantityInput = document.getElementById("quantity");

// initialize the total amount due to 0
let totalAmountDue = 0;

// add event listeners to the "Add to Cart" buttons
cartBtns.forEach(function(btn) {
  btn.addEventListener("click", function() {
    // get the price of the pizza from the "data-price" attribute
    const pizzaPrice = Number(btn.dataset.price);

    // ask for confirmation before updating the total amount due
    if (confirm(`Add this item to your cart for ₱${pizzaPrice.toFixed(2)}?`)) {
      // add the price to the total amount due
      totalAmountDue += pizzaPrice;

      // update the "Amount Due" input field with the new value
      amountDueInput.value = "₱ " + totalAmountDue.toFixed(2);
    }
  });
});

// add event listeners to the add-on checkboxes
addOnCheckboxes.forEach(function(checkbox) {
  checkbox.addEventListener("change", function() {
    // get the price of the add-on from the "data-price" attribute
    let addOnPrice = Number(checkbox.dataset.price);

    // calculate the total price of the add-on based on the quantity
    let quantity = Number(quantityInput.value) || 0;
    let totalAddOnPrice = addOnPrice * quantity;

    // add the total add-on price to the total amount due
    if (checkbox.checked) {
      totalAmountDue += totalAddOnPrice;
    } else {
      totalAmountDue -= totalAddOnPrice;
    }
    
    // update the "Amount Due" input field with the new value
    amountDueInput.value = "₱ " + totalAmountDue.toFixed(2);
  });
});

// add event listener to the "Order Now!" button
const orderBtn = document.querySelector(".buttons");
orderBtn.addEventListener("click", function() {
  // get the payment amount from the payment input field
  const paymentAmount = Number(paymentInput.value);

  // check if the payment is sufficient to cover the total amount due
  if (paymentAmount >= totalAmountDue) {
    // calculate the change
    const changeAmount = paymentAmount - totalAmountDue;

    // update the change input field with the new value
    changeInput.value = "₱ " + changeAmount.toFixed(2);

    // give feedback to the user
    alert("Order submitted successfully!");
    orderBtn.textContent = "Order placed!";
    orderBtn.disabled = true;

    // reset the input fields
    quantityInput.value = 1;
    amountDueInput.value = "₱0.00";
    paymentInput.value = "";

    // reset the total amount due
    totalAmountDue = 0;

    // re-enable the "Add to Cart" buttons
    cartBtns.forEach(function(btn) {
      btn.disabled = false;
    });

    // re-enable the add-on checkboxes
    addOnCheckboxes.forEach(function(checkbox) {
      checkbox.disabled = false;
    });

    // reset the "Order Now!" button
    setTimeout(function() {
      orderBtn.disabled = false;
      orderBtn.textContent = "Order Now!";
    }, 5000); // enable the button after 5 seconds
  } else {
    // payment is insufficient, display an error message
    paymentInput.value = "";
    alert("Insufficient payment amount!");
    paymentInput.placeholder = "Insufficient payment amount";
  }
});
