// Slideshow functionality
let slideIndex = 0;
function showSlides() {
  const slides = document.getElementsByClassName("slide");
  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > slides.length) { slideIndex = 1; }
  if (slides[slideIndex - 1]) {
    slides[slideIndex - 1].style.display = "block";
  }
  setTimeout(showSlides, 3000); // Change image every 3 seconds
}

document.addEventListener("DOMContentLoaded", function() {
  showSlides();

  // Search Functionality
  document.getElementById('coffeeSearch')?.addEventListener('input', function(e) {
    const searchTerm = e.target.value.toLowerCase();
    document.querySelectorAll('.coffee-item').forEach(item => {
      const text = item.textContent.toLowerCase();
      item.style.display = text.includes(searchTerm) ? 'block' : 'none';
    });
  });

  // Enhanced Cart System
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  function addItem(name, price) {
    cart.push({ name, price, id: Date.now() });
    updateCart();
  }

  // Update add-to-cart buttons
  document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
      addItem(button.dataset.name, button.dataset.price);
    });
  });

  // Updated cart display
  function updateCart() {
    // ... existing code for cart display ...
    cart.forEach((item, index) => {
      li.innerHTML = `
        ${item.name} - $${item.price}
        <button class="remove" onclick="removeItem(${index})">Remove</button>
      `;
    });
    // ... rest of existing code ...
  }

  // Modal popup for first-time visitors
  const modal = document.getElementById("modal");
  const closeModal = document.getElementById("closeModal");
  if (modal && !localStorage.getItem("visited")) {
    modal.style.display = "block";
    localStorage.setItem("visited", "true");
  }
  if (closeModal) {
    closeModal.addEventListener("click", function() {
      modal.style.display = "none";
    });
  }
});

// Email signup functionality for modal popup
document.getElementById("emailForm") && document.getElementById("emailForm").addEventListener("submit", function(event) {
  event.preventDefault();
  let emailInput = document.getElementById("userEmail").value;
  let emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

  if (emailInput.match(emailPattern)) {
      localStorage.setItem("userEmail", emailInput);
      document.getElementById("modal").style.display = "none";
      alert("Thank you! Your discount code is: BEAN10");
  } else {
      document.getElementById("errorMessage").style.display = "block";
  }
});

window.onload = function() {
  if (localStorage.getItem("userEmail")) {
      document.getElementById("modal").style.display = "none";
  }
};

// =========================
// Shopping Cart Functionality
// =========================

// Retrieve cart from localStorage or initialize a new array
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Function to update the cart display and save the cart
function updateCart() {
  const cartList = document.getElementById("cartList");
  const cartMessage = document.getElementById("cartMessage");
  const checkoutBtn = document.getElementById("checkout");

  if (!cartList) return; // Ensure element exists

  cartList.innerHTML = "";
  if (cart.length === 0) {
    if (cartMessage) cartMessage.style.display = "block";
    if (checkoutBtn) checkoutBtn.style.display = "none";
  } else {
    if (cartMessage) cartMessage.style.display = "none";
    if (checkoutBtn) checkoutBtn.style.display = "block";
    cart.forEach((item, index) => {
      let li = document.createElement("li");
      li.innerHTML = `${item} <button class="remove" onclick="removeItem(${index})">Remove</button>`;
      cartList.appendChild(li);
    });
  }
  localStorage.setItem("cart", JSON.stringify(cart));
}

// Function to add an item to the cart
function addItem(itemName) {
  cart.push(itemName);
  updateCart();
}

// Function to remove an item from the cart
function removeItem(index) {
  cart.splice(index, 1);
  updateCart();
}

// Setup cart functionality after DOM loads
document.addEventListener("DOMContentLoaded", function() {
  updateCart();

  // Button to add a sample item
  const addItemButton = document.getElementById("addItem");
  if (addItemButton) {
    addItemButton.addEventListener("click", function() {
      // You can adjust this string to add different items
      addItem("Sample Coffee Blend");
    });
  }

  // Checkout button functionality
  const checkoutButton = document.getElementById("checkout");
  if (checkoutButton) {
    checkoutButton.addEventListener("click", function() {
      alert("Checkout process coming soon!");
    });
  }
});

// =========================
// Date Picker Initialization for Registration Form
// =========================
document.addEventListener("DOMContentLoaded", function() {
  const eventDateInput = document.getElementById("eventDate");
  if (eventDateInput) {
    // Initialize Flatpickr on the eventDate input for a responsive and nice date picker.
    flatpickr("#eventDate", {
      dateFormat: "F j, Y",
      minDate: "today"
      // Additional configurations can be added here
    });
  }
});
