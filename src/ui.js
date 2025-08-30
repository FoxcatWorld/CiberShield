
// =================================================================================
// CiberShield - Lógica de Interfaz de Usuario Compartida
// =================================================================================
// Este script maneja la lógica que es común a todas las páginas, como el menú
// de usuario, para evitar errores en páginas que no tienen todos los elementos.

// ---------------------------------------------------------------------------------
// Estado de la Aplicación (Simulado)
// ---------------------------------------------------------------------------------
let usuario = null; // Almacena el nombre del usuario actual

// ---------------------------------------------------------------------------------
// Funciones del Menú de Usuario
// ---------------------------------------------------------------------------------

/**
 * Simula la obtención de la racha de un usuario.
 * @returns {Array} Un array de objetos que representa la racha de 7 días.
 */
function getRacha() {
  return [
    { dia: 1, emoji: '🌞', activo: true },
    { dia: 2, emoji: '🔥', activo: true },
    { dia: 3, emoji: '🔥', activo: true },
    { dia: 4, emoji: '❌', activo: false },
    { dia: 5, emoji: '🔥', activo: true },
    { dia: 6, emoji: '💧', activo: false },
    { dia: 7, emoji: '🔥', activo: true },
  ];
}

/**
 * Renderiza el contenido del menú de usuario en función de si hay un usuario logueado.
 */
function renderMenu() {
  const menuContent = document.getElementById('menuContent');
  if (!menuContent) return; // Salir si el elemento no existe

  if (!usuario) {
    // Formulario de registro/login
    menuContent.innerHTML = `
      <h3>Registro / Login</h3>
      <input type="text" id="nombreUsuario" placeholder="Nombre de usuario" autocomplete="username" />
      <button id="loginBtn">Registrarse / Iniciar sesión</button>
    `;
    // Añadir event listener al nuevo botón
    document.getElementById('loginBtn').addEventListener('click', window.registrarUsuario);
  } else {
    // Vista de usuario logueado
    const racha = getRacha();
    const diasDeRacha = racha.filter(d => d.emoji === '🔥').length;
    menuContent.innerHTML = `
      <h3>Usuario: <b>@${usuario}</b></h3>
      <button id="logoutBtn">Cerrar sesión</button>
      <div class="calendar" title="Racha de la semana">
        ${racha.map(d => `<span title="Día ${d.dia}">${d.emoji}</span>`).join('')}
      </div>
      <small style="display:block;margin-top:8px;color:var(--c-muted);">Racha: ${diasDeRacha} días</small>
    `;
    // Añadir event listener al nuevo botón
    document.getElementById('logoutBtn').addEventListener('click', window.cerrarSesion);
  }
}

/**
 * Registra un nuevo usuario y actualiza la interfaz.
 */
window.registrarUsuario = function() {
  const nombreInput = document.getElementById('nombreUsuario');
  const userMenu = document.getElementById('userMenu');
  const brandText = document.getElementById('brandText');
  const brandSub = document.getElementById('brandSub');
  
  if (nombreInput && userMenu && brandText && brandSub) {
    const nombre = nombreInput.value.trim();
    if (nombre) {
      usuario = nombre;
      brandText.textContent = "Bienvenido,";
      brandSub.textContent = `@${usuario}`;
      userMenu.hidden = true;
    } else {
      nombreInput.placeholder = "¡Introduce un nombre!";
    }
  }
}

/**
 * Cierra la sesión del usuario y restaura la interfaz.
 */
window.cerrarSesion = function() {
  const userMenu = document.getElementById('userMenu');
  const brandText = document.getElementById('brandText');
  const brandSub = document.getElementById('brandSub');

  usuario = null;
  if (brandText && brandSub) {
    brandText.textContent = "CiberShield";
    brandSub.textContent = "Tu escudo digital.";
  }
  if (userMenu) {
    userMenu.hidden = true;
  }
}

// ---------------------------------------------------------------------------------
// Event Listeners Globales
// ---------------------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
  const brandIcon = document.getElementById('brandIcon');
  const userMenu = document.getElementById('userMenu');
  const fabMenuToggle = document.getElementById('fabMenuToggle');
  const mobileNav = document.getElementById('mobileNav');
  const closeMenu = document.getElementById('closeMenu');
  const menuOverlay = document.getElementById('menuOverlay');

  if (brandIcon && userMenu) {
    // Muestra/oculta el menú de usuario
    brandIcon.addEventListener('click', () => {
      if (userMenu.hidden) {
        renderMenu();
        userMenu.hidden = false;
      } else {
        userMenu.hidden = true;
      }
    });

    // Cierra el menú de usuario al hacer clic fuera
    document.addEventListener('mousedown', e => {
      if (!userMenu.contains(e.target) && e.target !== brandIcon) {
        userMenu.hidden = true;
      }
    });
  }

  // Handle mobile navigation toggle and FAB drag functionality
  if (fabMenuToggle && mobileNav && closeMenu && menuOverlay) {
    let isDragging = false;
    let isClick = true; // Assume it's a click initially
    let initialX;
    let initialY;
    let xOffset = 0;
    let yOffset = 0;
    const dragThreshold = 5; // Pixels to distinguish a drag from a click

    // FAB drag functionality
    fabMenuToggle.addEventListener("mousedown", (e) => {
      initialX = e.clientX;
      initialY = e.clientY;
      isClick = true; // Assume it's a click until proven otherwise

      if (e.target === fabMenuToggle) {
        isDragging = true;
      }
    });

    document.addEventListener("mouseup", (e) => {
      if (isDragging) {
        isDragging = false; // End dragging
      }

      if (isClick && e.target === fabMenuToggle) {
        // Only toggle menu if it was a click (no significant drag) and the FAB was clicked
        mobileNav.classList.toggle('open');
        mobileNav.hidden = !mobileNav.hidden;
        menuOverlay.hidden = !menuOverlay.hidden;
      }
      // Reset isClick for the next interaction
      isClick = true;
    });

    document.addEventListener("mousemove", (e) => {
      if (!isDragging) return;
      e.preventDefault();

      const dx = e.clientX - initialX;
      const dy = e.clientY - initialY;

      // If movement exceeds threshold, it's a drag, not a click
      if (Math.abs(dx) > dragThreshold || Math.abs(dy) > dragThreshold) {
        isClick = false;
      }

      // Calculate new position relative to initial drag start and current offset
      const newX = e.clientX - initialX + xOffset;
      const newY = e.clientY - initialY + yOffset;

      // Limit FAB to stay within the viewport
      const maxX = window.innerWidth - fabMenuToggle.offsetWidth;
      const maxY = window.innerHeight - fabMenuToggle.offsetHeight;

      fabMenuToggle.style.left = `${Math.min(maxX, Math.max(0, newX))}px`;
      fabMenuToggle.style.top = `${Math.min(maxY, Math.max(0, newY))}px`;

      // Update offsets for continuous dragging
      xOffset = newX;
      yOffset = newY;

      initialX = e.clientX; // Update initialX/Y to current mouse position for smoother drag
      initialY = e.clientY;
    });

    // Close mobile menu
    closeMenu.addEventListener('click', (e) => {
      e.stopPropagation(); // Prevent click from bubbling to overlay
      mobileNav.classList.remove('open');
      mobileNav.hidden = true;
      menuOverlay.hidden = true;
    });

    // Close mobile menu when overlay is clicked
    menuOverlay.addEventListener('click', () => {
      mobileNav.classList.remove('open');
      mobileNav.hidden = true;
      menuOverlay.hidden = true;
    });

    // Prevent text selection during drag
    fabMenuToggle.ondragstart = function() {
      return false;
    };
  }
});
