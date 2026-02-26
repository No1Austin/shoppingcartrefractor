// ===== v2 (STRATEGY PATTERN: Discounts) =====

class ShoppingCart {
  constructor(discountStrategy) {
    this.items = [];
    this.discountStrategy = discountStrategy;
  }

  setDiscountStrategy(discountStrategy) {
    this.discountStrategy = discountStrategy;
  }

  addItem(name, quantity, price) {
    const existing = this.items.find((i) => i.name === name);
    if (existing) existing.quantity += quantity;
    else this.items.push({ name, quantity, price });
  }

  getSubtotal() {
    return this.items.reduce((sum, i) => sum + i.quantity * i.price, 0);
  }

  getTotal() {
    const subtotal = this.getSubtotal();
    return this.discountStrategy.apply(subtotal);
  }

  viewCart() {
    if (this.items.length === 0) return console.log("Cart is empty.");
    this.items.forEach((i) => {
      console.log(`${i.name} (x${i.quantity}) - ${(i.quantity * i.price).toFixed(2)} TND`);
    });
    console.log(`Subtotal: ${this.getSubtotal().toFixed(2)} TND`);
    console.log(`Total after discount: ${this.getTotal().toFixed(2)} TND`);
  }
}

// Strategy interface: apply(total) -> newTotal
class NoDiscount {
  apply(total) {
    return total;
  }
}

class VipDiscount20 {
  apply(total) {
    return total * 0.8;
  }
}

class PercentageDiscount {
  constructor(percent) {
    this.percent = percent;
  }
  apply(total) {
    return total * (1 - this.percent / 100);
  }
}

// ===== Test =====
const cart = new ShoppingCart(new NoDiscount());
cart.addItem("Apple", 2, 1.5);
cart.addItem("Orange", 3, 2.0);
cart.viewCart();

cart.setDiscountStrategy(new VipDiscount20());
cart.viewCart();

cart.setDiscountStrategy(new PercentageDiscount(10));
cart.viewCart();