
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

  if (brandIcon && userMenu) {
    // Muestra/oculta el menú
    brandIcon.addEventListener('click', () => {
      if (userMenu.hidden) {
        renderMenu();
        userMenu.hidden = false;
      } else {
        userMenu.hidden = true;
      }
    });

    // Cierra el menú al hacer clic fuera
    document.addEventListener('mousedown', e => {
      if (!userMenu.contains(e.target) && e.target !== brandIcon) {
        userMenu.hidden = true;
      }
    });
  }
});
