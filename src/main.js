
// =================================================================================
// CiberShield - Lógica Principal (Página de Inicio)
// =================================================================================
// Este script gestiona la interactividad específica de la página de inicio,
// como la comunicación con el personaje de la IA (el zorro).

// ---------------------------------------------------------------------------------
// Elementos del DOM (Específicos de la página de inicio)
// ---------------------------------------------------------------------------------

const foxImg = document.getElementById('foxImg');
const bubble = document.getElementById('bubbleDialog');
const chatBar = document.getElementById('chatBar');

// Estado de la aplicación
let talking = false; // Indica si el chat con el zorro está activo

// =================================================================================
// Interacción con el Personaje IA (Zorro)
// =================================================================================

// Solo añadir listeners si los elementos existen
if (foxImg && bubble && chatBar) {
  /**
   * Muestra la burbuja de diálogo cuando el mouse entra en la imagen del zorro.
   */
  foxImg.addEventListener('mouseenter', () => {
    if (!talking) {
      bubble.hidden = false;
    }
  });

  /**
   * Oculta la burbuja de diálogo cuando el mouse sale de la imagen del zorro.
   */
  foxImg.addEventListener('mouseleave', () => {
    if (!talking) {
      bubble.hidden = true;
    }
  });

  /**
   * Activa el modo de chat al hacer clic en el zorro.
   */
  foxImg.addEventListener('click', () => {
    if (!talking) {
      foxImg.src = 'src/images/fox_talk.png';
      bubble.textContent = '¡Estoy listo para responder!';
      bubble.hidden = false;
      chatBar.hidden = false;
      talking = true;
    }
  });
}
