const PRODUCTS = [
  {
    id: "vcol-colageno",
    name: "VCOL",
    badge: "Estrella",
    description: "Colágeno Hidrolizado Premium enriquecido con biotina y vitamina C.",
    price: 15600,
    unit: "Frasco x 360mL"
  },
  {
    id: "origen-disco",
    name: "ORIGEN",
    badge: "Línea Nutricional",
    description: "Alimento funcional prensado a base de fibra natural y extractos botánicos.",
    price: 17800,
    unit: "Caja x 12 discos"
  }
];

let cart = JSON.parse(localStorage.getItem("starnatural_cart") || "[]");
let deferredPrompt = null;

// Reemplaza esta llave con tu Llave Pública de Wompi en producción
const WOMPI_PUBLIC_KEY = "pub_prod_hTKZ7t71m1Xue0eFgOc3vSvKTvcUl1gZ"; 

document.addEventListener("DOMContentLoaded", () => {
  renderProducts();
  updateCartUI();
  setupPWAInstall();
  setupEventListeners();
});

function renderProducts() {
  const container = document.getElementById("product-grid");
  container.innerHTML = PRODUCTS.map(product => `
    <div class="product-card">
      <div class="product-header">
        <div>
          <h4 class="product-title">${product.name}</h4>
          <span style="font-size:0.8rem; color:#64748b;">${product.unit}</span>
        </div>
        ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}
      </div>
      <p class="product-desc">${product.description}</p>
      <div class="product-footer">
        <span class="product-price">$${product.price.toLocaleString("es-CO")} COP</span>
        <button class="btn-add-cart" onclick="addToCart('${product.id}')">+ Agregar</button>
      </div>
    </div>
  `).join("");
}

function addToCart(productId) {
  const existing = cart.find(item => item.id === productId);
  if (existing) { existing.qty += 1; } 
  else { cart.push({ ...PRODUCTS.find(p => p.id === productId), qty: 1 }); }
  saveAndRefreshCart();
  openCartModal();
}

function updateQty(productId, delta) {
  const item = cart.find(i => i.id === productId);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) { cart = cart.filter(i => i.id !== productId); }
  saveAndRefreshCart();
}

function saveAndRefreshCart() {
  localStorage.setItem("starnatural_cart", JSON.stringify(cart));
  updateCartUI();
}

function updateCartUI() {
  const totalCount = cart.reduce((acc, i) => acc + i.qty, 0);
  const totalPrice = cart.reduce((acc, i) => acc + (i.price * i.qty), 0);

  document.getElementById("cart-count").innerText = totalCount;
  document.getElementById("cart-total").innerText = `$${totalPrice.toLocaleString("es-CO")} COP`;

  const itemsContainer = document.getElementById("cart-items-container");
  if (cart.length === 0) {
    itemsContainer.innerHTML = `<p style="text-align:center; color:#64748b; padding:1rem;">Tu carrito está vacío</p>`;
  } else {
    itemsContainer.innerHTML = cart.map(item => `
      <div class="cart-item">
        <div>
          <div style="font-weight:700;">${item.name}</div>
          <div style="font-size:0.85rem; color:#64748b;">$${(item.price * item.qty).toLocaleString("es-CO")} COP</div>
        </div>
        <div class="qty-controls">
          <button class="qty-btn" onclick="updateQty('${item.id}', -1)">-</button>
          <span>${item.qty}</span>
          <button class="qty-btn" onclick="updateQty('${item.id}', 1)">+</button>
        </div>
      </div>
    `).join("");
  }
}

function openCartModal() { document.getElementById("cart-modal").classList.remove("hidden"); }
function closeCartModal() { document.getElementById("cart-modal").classList.add("hidden"); }

function setupEventListeners() {
  document.getElementById("cart-icon-btn").addEventListener("click", openCartModal);
  document.getElementById("close-cart-btn").addEventListener("click", closeCartModal);
  document.getElementById("btn-wompi-pay").addEventListener("click", handleWompiCheckout);
}

function handleWompiCheckout() {
  if (cart.length === 0) { alert("Agrega al menos un producto al carrito."); return; }

  const name = document.getElementById("customer-name").value.trim();
  const phone = document.getElementById("customer-phone").value.trim();
  const address = document.getElementById("customer-address").value.trim();

  if (!name || !phone || !address) { alert("Por favor completa tus datos de envío."); return; }

  const totalPrice = cart.reduce((acc, i) => acc + (i.price * i.qty), 0);
  
  const checkout = new WidgetCheckout({
    currency: 'COP',
    amountInCents: totalPrice * 100, // Wompi procesa en centavos
    reference: `SN-${Date.now()}`,
    publicKey: WOMPI_PUBLIC_KEY,
    customerData: { fullName: name, phoneNumber: phone, phoneNumberPrefix: '+57' }
  });

  checkout.open(function ( result ) {
    if (result.transaction.status === 'APPROVED') {
      alert(`¡Pago Aprobado! Gracias ${name}. Procesaremos tu pedido de inmediato.`);
      cart = [];
      saveAndRefreshCart();
      closeCartModal();
    }
  });
}

function setupPWAInstall() {
  const banner = document.getElementById("pwa-install-banner");
  window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    deferredPrompt = e;
    banner.classList.remove("hidden");
  });

  document.getElementById("btn-install-app").addEventListener("click", async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') { banner.classList.add("hidden"); }
    deferredPrompt = null;
  });

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js').catch(err => console.log(err));
  }
}
