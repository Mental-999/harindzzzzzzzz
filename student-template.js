"use strict";

const products = [
  { id: 1, name: "Ноутбук", price: 350000, category: "Техника", inStock: true },
  { id: 2, name: "Мышь", price: 7000, category: "Аксессуары", inStock: true },
  { id: 3, name: "Монитор", price: 120000, category: "Техника", inStock: false },
  { id: 4, name: "Клавиатура", price: 15000, category: "Аксессуары", inStock: true },
  { id: 5, name: "Наушники", price: 28000, category: "Аудио", inStock: true },
  { id: 6, name: "Микрофон", price: 45000, category: "Аудио", inStock: false },
];

function createProductCard(product) {
  const card = document.createElement("article");
  card.classList.add("product-card");
  if (!product.inStock) {
    card.classList.add("product-card--out");
  }

  const title = document.createElement("h3");
  title.classList.add("product-card__title");
  title.textContent = product.name;
  card.append(title);

  const category = document.createElement("p");
  category.classList.add("product-card__category");
  category.textContent = `Категория: ${product.category}`;
  card.append(category);

  const price = document.createElement("p");
  price.classList.add("product-card__price");
  price.textContent = `Цена: ${product.price} ₸`;
  card.append(price);

  const stock = document.createElement("p");
  stock.classList.add("product-card__stock");
  stock.textContent = product.inStock ? "В наличии" : "Нет в наличии";
  card.append(stock);

  return card;
}

function calculateStats(items) {
  const count = items.length;
  const availableCount = items.filter((p) => p.inStock).length;
  const totalPrice = items.reduce((sum, p) => sum + p.price, 0);

  let mostExpensive = null;
  items.forEach((p) => {
    if (mostExpensive === null || p.price > mostExpensive.price) {
      mostExpensive = p;
    }
  });

  return { count, availableCount, totalPrice, mostExpensive };
}

function countByCategory(items) {
  return items.reduce((acc, product) => {
    acc[product.category] = (acc[product.category] || 0) + 1;
    return acc;
  }, {});
}

function renderCatalog(items) {
  const catalog = document.querySelector("#catalog");
  catalog.replaceChildren();
  items.forEach((product) => {
    catalog.append(createProductCard(product));
  });

  const stats = calculateStats(items);
  document.querySelector("#product-count").textContent = stats.count;
  document.querySelector("#available-count").textContent = stats.availableCount;
  document.querySelector("#total-price").textContent = stats.totalPrice;
  document.querySelector("#most-expensive").textContent = stats.mostExpensive
    ? stats.mostExpensive.name
    : "—";

  const categoryStats = document.querySelector("#category-stats");
  categoryStats.replaceChildren();
  Object.entries(countByCategory(items)).forEach(([category, amount]) => {
    const li = document.createElement("li");
    li.textContent = `${category}: ${amount}`;
    categoryStats.append(li);
  });

  return catalog.children.length;
}

window.domSrs = {
  products,
  createProductCard,
  calculateStats,
  countByCategory,
  renderCatalog,
};

document.addEventListener("DOMContentLoaded", () => {
  if (document.querySelector("#catalog")) {
    renderCatalog(products);
  }
});