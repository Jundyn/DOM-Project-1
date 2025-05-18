// Select all the necessary elements
const cartContainer = document.querySelector('.list-products');
const totalPrice = document.querySelector('.total');

// Function to update total price
function updateTotalPrice() {
  let total = 0;
  const items = cartContainer.querySelectorAll('.card-body'); // Select all items

  items.forEach(item => {
    const priceElement = item.querySelector('.unit-price');
    const quantityElement = item.querySelector('.quantity');
    
    const priceValue = parseFloat(priceElement.innerText.replace('$', '').trim());
    const quantityValue = parseInt(quantityElement.innerText.trim(), 10);
    
    total += priceValue * quantityValue;
  });

  totalPrice.innerText = `Total price: $${total.toFixed(2)}`;
}

// Handle item interactions (increase, decrease, delete, like)
cartContainer.addEventListener('click', function(event) {
  const itemCard = event.target.closest('.card-body');

  // Increase quantity
  if (event.target.classList.contains('fa-plus-circle')) {
    const quantityElement = itemCard.querySelector('.quantity');
    let quantity = parseInt(quantityElement.innerText, 10);
    quantityElement.innerText = quantity + 1;
    updateTotalPrice();
  }

  // Decrease quantity
  if (event.target.classList.contains('fa-minus-circle')) {
    const quantityElement = itemCard.querySelector('.quantity');
    let quantity = parseInt(quantityElement.innerText, 10);
    if (quantity > 0) {
      quantityElement.innerText = quantity - 1;
      updateTotalPrice();
    }
  }

  // Delete item from cart
  if (event.target.classList.contains('fa-trash-alt')) {
    itemCard.remove();
    updateTotalPrice();
  }

  // Like item
  if (event.target.classList.contains('fa-heart')) {
    event.target.classList.toggle('liked'); // Toggle the "liked" state
  }
});

// Add style for liked heart
const style = document.createElement('style');
style.innerHTML = `
  .liked {
    color: red;
  }
`;
document.head.appendChild(style);

// Initialize total price on page load
document.addEventListener('DOMContentLoaded', updateTotalPrice);
