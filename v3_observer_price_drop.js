// ===== v3 (OBSERVER PATTERN: Price drop notifications) =====

class PriceDropNotifier {
  constructor() {
    this.subscribers = [];
  }

  subscribe(fn) {
    this.subscribers.push(fn);
  }

  notify(event) {
    this.subscribers.forEach((fn) => fn(event));
  }
}

class ProductCatalog {
  constructor(notifier) {
    this.products = new Map(); // name -> { price }
    this.notifier = notifier;
  }

  addProduct(name, price) {
    this.products.set(name, { price });
  }

  updatePrice(name, newPrice) {
    const product = this.products.get(name);
    if (!product) return console.log("Product not found:", name);

    const oldPrice = product.price;
    product.price = newPrice;

    if (newPrice < oldPrice) {
      this.notifier.notify({ type: "PRICE_DROP", name, oldPrice, newPrice });
    }
  }

  getPrice(name) {
    const product = this.products.get(name);
    return product ? product.price : null;
  }
}

// ===== Test =====
const notifier = new PriceDropNotifier();

// subscriber 1: user notification
notifier.subscribe((event) => {
  if (event.type === "PRICE_DROP") {
    console.log(
      `🔔 Price drop! ${event.name}: ${event.oldPrice.toFixed(2)} -> ${event.newPrice.toFixed(2)} TND`
    );
  }
});

// subscriber 2: logging
notifier.subscribe((event) => {
  console.log("LOG EVENT:", event);
});

const catalog = new ProductCatalog(notifier);
catalog.addProduct("Apple", 1.5);
catalog.addProduct("Orange", 2.0);

catalog.updatePrice("Orange", 1.8); // triggers observer
catalog.updatePrice("Apple", 1.6);  // no drop