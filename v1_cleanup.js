// ===== v1 (CLEANUP) =====
// Refactors: rename variables, extract functions, reduce duplication, keep code runnable

const cart = [];

function findItemIndexByName(name) {
  return cart.findIndex((item) => item.name === name);
}

function addItem(name, quantity, price) {
  if (!name || typeof name !== "string") return console.log("Invalid name.");
  if (typeof quantity !== "number" || quantity <= 0) return console.log("Invalid quantity.");
  if (typeof price !== "number" || price < 0) return console.log("Invalid price.");

  const index = findItemIndexByName(name);
  if (index >= 0) {
    cart[index].quantity += quantity;
  } else {
    cart.push({ name, quantity, price });
  }

  console.log(`Added: ${name} (x${quantity})`);
}

function removeItem(name) {
  const index = findItemIndexByName(name);
  if (index === -1) return console.log(`Item not found: ${name}`);
  cart.splice(index, 1);
  console.log(`Removed: ${name}`);
}

function clearCart() {
  cart.length = 0;
  console.log("Cart cleared.");
}

function getTotal() {
  return cart.reduce((sum, item) => sum + item.quantity * item.price, 0);
}

function viewCart() {
  if (cart.length === 0) return console.log("Cart is empty.");

  cart.forEach((item) => {
    const itemTotal = item.quantity * item.price;
    console.log(`${item.name} (x${item.quantity}) - ${itemTotal.toFixed(2)} TND`);
  });

  console.log(`Total: ${getTotal().toFixed(2)} TND`);
}

// ===== Test =====
addItem("Apple", 2, 1.5);
addItem("Orange", 3, 2.0);
viewCart();
removeItem("Apple");
viewCart();
clearCart();
viewCart();