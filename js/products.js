
/* ==========================================
   CATÁLOGO DE PRODUCTOS Y RENDERIZADO
   ========================================== */

const PRODUCTS = [
  {
    id: "gaf_plus_300ml",
    name: "GAF-PLUS 300mL",
    badge: "Estrella",
    fabricado: "GrenLab",
    netContent: "Cont. Neto: 300mL (10 Porciones)",
    invima: "PSA-0690-2025",
    benefit: "Regenera articulaciones, fortalece cabello, uñas y elasticidad de la piel.",
    usage: "Tomar 1 copa (30ml) al día, preferiblemente en la mañana.",
    price: 15600,
    originalPrice: 22300,
    image: "assets/images/gaf_plus_300ml.mp4"
  },
  {
    id: "origen_disco",
    name: "ORIGEN 15 Discos",
    badge: "Línea ORIGEN",
    fabricado: "Naturalisima",
    netContent: "Cont. Neto: Frasco x 15 Discos (15 Porciones)",
    invima: "PSA-0005343-2024",
    benefit: "Alimento funcional con fibra natural que mejora la digestión y el tránsito intestinal.",
    usage: "Disolver 1 disco en un vaso de agua caliente al día.",
    price: 17800,
    originalPrice: 25450,
    image: "assets/images/origen-disco.mp4"
  },
  {
    id: "origen_360ml",
    name: "ORIGEN 360mL",
    badge: "Línea ORIGEN",
    fabricado: "Naturalisima",
    netContent: "Cont. Neto: 360mL (12 Porciones)",
    invima: "RSA-0034995-2024",
    benefit: "Regenera articulaciones, fortalece cabello, uñas y elasticidad de la piel.",
    usage: "Tomar 1 copa (30ml) al día, preferiblemente en la mañana.",
    price: 15600,
    originalPrice: 22300,
    image: "assets/images/origen_360ml.mp4"
  },
  {
    id: "origen_400ml",
    name: "ORIGEN 400mL",
    badge: "Línea ORIGEN",
    fabricado: "Laboratorios vanier",
    netContent: "Cont. Neto: 400mL (13 Porciones)",
    invima: "RSAV12136011",
    benefit: "Regenera articulaciones, fortalece cabello, uñas y elasticidad de la piel.",
    usage: "Tomar 1 copa (30ml) al día, preferiblemente en la mañana.",
    price: 15600,
    originalPrice: 22300,
    image: "assets/images/origen_400ml.mp4"
  },
  {
    id: "vcol_360ml",
    name: "VCOL 360mL",
    badge: "Estrella",
    fabricado: "Naturalisima",
    netContent: "Cont. Neto: 360mL (12 Porciones)",
    invima: "RSA-0034995-2024",
    benefit: "Regenera articulaciones, fortalece cabello, uñas y elasticidad de la piel.",
    usage: "Tomar 1 copa (30ml) al día, preferiblemente en la mañana.",
    price: 15600,
    originalPrice: 22300,
    image: "assets/images/vcol-360ml.mp4"
  }
];

// URLs de emojis animados
const EMOJIS = {
  fire: "https://fonts.gstatic.com/s/e/notoemoji/latest/1f525/512.webp",
  package: "https://fonts.gstatic.com/s/e/notoemoji/latest/1f37e/512.webp",
  factory: "https://fonts.gstatic.com/s/e/notoemoji/latest/2b50/512.webp",
  shield: "https://fonts.gstatic.com/s/e/notoemoji/latest/2705/512.webp",
  calendar: "https://fonts.gstatic.com/s/e/notoemoji/latest/1f4c5/512.webp",
  cart: "https://fonts.gstatic.com/s/e/notoemoji/latest/1f6d2/512.webp"
};

function renderProducts(filterText = "") {
  const container = document.getElementById("product-grid");
  if (!container) return;

  const query = (filterText || "").toLowerCase().trim();

  const filteredProducts = PRODUCTS.filter(p => {
    if (!query) return true;
    return (p.name && p.name.toLowerCase().includes(query)) ||
           (p.benefit && p.benefit.toLowerCase().includes(query)) ||
           (p.fabricado && p.fabricado.toLowerCase().includes(query)) ||
           (p.netContent && p.netContent.toLowerCase().includes(query)) ||
           (p.invima && p.invima.toLowerCase().includes(query));
  });

  if (filteredProducts.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 2rem; color: #64748b;">
        <p style="font-size: 1.1rem; font-weight: 600; margin-bottom: 0.5rem;">No se encontraron productos para "${filterText}"</p>
        <p style="font-size: 0.9rem;">Intenta con otros términos como "origen", "vcol" o "colageno".</p>
      </div>
    `;
    return;
  }

  container.innerHTML = filteredProducts.map(product => {
    const ahorro = product.originalPrice - product.price;
    const ahorroFormateado = ahorro > 0 
      ? `<span class="savings-tag"><img src="${EMOJIS.fire}" class="animated-emoji" alt="Fuego"> ¡Ahorras $${ahorro.toLocaleString("es-CO")}!</span>` 
      : '';

 // Dentro de tu función de renderizado en js/ui.js, asegúrate de que el botón de Vista Rápida se vea así:

return `
    <div class="product-card">
        <!-- ... resto de la tarjeta ... -->
        
        <div class="product-image-wrapper">
            <img src="${product.image}" alt="${product.name}" class="product-img" />
            
            <!-- NUEVO BOTÓN DE VISTA RÁPIDA CIRCULAR CON OJO ANIMADO -->
            <button class="btn-quick-view-circular" onclick="openQuickView('${product.id}')" aria-label="Vista Rápida">
                <!-- OJO ANIMADO (Noto Emoji WebP) -->
                <img src="https://fonts.gstatic.com/s/e/notoemoji/latest/1f441/512.webp" alt="Ojo" class="quick-view-eye-icon" />
            </button>
        </div>

        <!-- ... resto de la tarjeta ... -->
    </div>
`;
