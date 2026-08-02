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

/* ==========================================
   FUNCIÓN VISTA RÁPIDA (ABRIR MODAL)
   ========================================== */
function openQuickView(productId) {
  // 1. Buscar el producto seleccionado en la lista
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  // 2. Buscar el contenedor del modal en el HTML
  const modal = document.getElementById("image-modal");
  const contentContainer = document.getElementById("modal-media-content");

  if (!modal || !contentContainer) {
    console.error("Falta el modal #image-modal o #modal-media-content en el HTML");
    return;
  }

  // 3. Detectar si el recurso es un video MP4 o una imagen estática
  const isVideo = product.image && product.image.toLowerCase().endsWith(".mp4");

  if (isVideo) {
    contentContainer.innerHTML = `
      <video autoplay loop muted playsinline controls style="width: 100%; max-height: 80vh; border-radius: 12px; display: block;">
        <source src="${product.image}" type="video/mp4">
        Tu navegador no soporta reproducción de video.
      </video>
    `;
  } else {
    contentContainer.innerHTML = `
      <img src="${product.image}" alt="${product.name}" style="width: 100%; max-height: 80vh; object-fit: contain; border-radius: 12px; display: block;" />
    `;
  }

  // 4. Mostrar el modal quitando la clase hidden
  modal.classList.remove("hidden");
}

/* FUNCIÓN PARA CERRAR EL MODAL */
function closeMediaModal() {
  const modal = document.getElementById("image-modal");
  const contentContainer = document.getElementById("modal-media-content");
  
  if (modal) {
    modal.classList.add("hidden");
  }
  // Detener reproducción de video al cerrar
  if (contentContainer) {
    contentContainer.innerHTML = "";
  }
}
