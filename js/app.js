/* ==========================================
   INICIALIZACIÓN DE LA APLICACIÓN (ENTRYPOINT)
   ========================================== */

const APP_VERSION = "1.2.6";

if (localStorage.getItem("app_version") !== APP_VERSION) {
  localStorage.setItem("app_version", APP_VERSION);
  window.location.reload(true); 
}

let deferredPrompt = null;

document.addEventListener("DOMContentLoaded", () => {
  renderProducts();
  updateCartUI();
  setupPWAInstall();
  setupEventListeners();
  setupBackToTop();
});

// --- SOPORTE E INSTALACIÓN DE PWA ---
function setupPWAInstall() {
  const banner = document.getElementById("pwa-install-banner");
  window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    deferredPrompt = e;
    if (banner) banner.classList.remove("hidden");
  });

  const btnInstall = document.getElementById("btn-install-app");
  if (btnInstall) {
    btnInstall.addEventListener("click", async () => {
      if (!deferredPrompt) return;
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted' && banner) { banner.classList.add("hidden"); }
      deferredPrompt = null;
    });
  }

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('.public/sw.js').catch(err => console.log(err));
  }
}

/* ==========================================
   FUNCIÓN DE VISTA RÁPIDA (MODAL MULTIMEDIA)
   ========================================== */
function openQuickView(productId) {
  // 1. Buscar el producto por su ID
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  // 2. Buscar elementos del Modal en el HTML
  const modal = document.getElementById("image-modal");
  const contentContainer = document.getElementById("modal-media-content");

  if (!modal || !contentContainer) {
    console.error("No se encontró el modal '#image-modal' o '#modal-media-content' en el HTML.");
    return;
  }

  // 3. Verificar si el archivo es un video .mp4 o una imagen
  const isVideo = product.image && product.image.toLowerCase().endsWith(".mp4");

  if (isVideo) {
    contentContainer.innerHTML = `
      <video class="modal-animated-video" autoplay loop controls style="width: 100%; max-height: 80vh; border-radius: 8px;">
        <source src="${product.image}" type="video/mp4">
        Tu navegador no soporta reproducción de video.
      </video>
    `;
  } else {
    contentContainer.innerHTML = `
      <img src="${product.image}" alt="${product.name}" style="width: 100%; height: auto; max-height: 80vh; object-fit: contain; border-radius: 8px;" />
    `;
  }

  // 4. Mostrar el modal quitando la clase 'hidden'
  modal.classList.remove("hidden");
}

function closeMediaModal() {
  const modal = document.getElementById("image-modal");
  if (modal) {
    modal.classList.add("hidden");
    // Limpiar el contenido para detener la reproducción del video
    const contentContainer = document.getElementById("modal-media-content");
    if (contentContainer) contentContainer.innerHTML = "";
  }
}
document.addEventListener("DOMContentLoaded", () => {
  if (typeof renderProducts === "function") {
    renderProducts();
  }
});
