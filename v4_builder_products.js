// ===== v4 (BUILDER PATTERN: Product creation) =====

class Product {
  constructor({ name, basePrice, category, tags, metadata }) {
    this.name = name;
    this.basePrice = basePrice;
    this.category = category;
    this.tags = tags;
    this.metadata = metadata;
  }
}

class ProductBuilder {
  constructor(name) {
    this.data = {
      name,
      basePrice: 0,
      category: "general",
      tags: [],
      metadata: {},
    };
  }

  price(value) {
    this.data.basePrice = value;
    return this;
  }

  category(value) {
    this.data.category = value;
    return this;
  }

  addTag(tag) {
    this.data.tags.push(tag);
    return this;
  }

  meta(key, value) {
    this.data.metadata[key] = value;
    return this;
  }

  build() {
    if (!this.data.name) throw new Error("Product must have a name.");
    if (this.data.basePrice < 0) throw new Error("Price cannot be negative.");
    return new Product(this.data);
  }
}

// ===== Example usage =====
const apple = new ProductBuilder("Apple")
  .price(1.5)
  .category("fruit")
  .addTag("fresh")
  .addTag("local")
  .meta("origin", "Tunisia")
  .build();

const laptop = new ProductBuilder("Laptop")
  .price(2500)
  .category("electronics")
  .addTag("fragile")
  .meta("warrantyMonths", 12)
  .build();

console.log("Built products:");
console.log(apple);
console.log(laptop);