
// =================================================================================
// CiberShield - Lógica Principal (Página de Inicio)
// =================================================================================
// Este script gestiona la interactividad específica de la página de inicio,
// como la comunicación con el personaje de la IA (el zorro) y la interacción
// con la base de datos de Firebase para el contador de visualizaciones.

import { incrementViewCounter } from './Firebase.js';

// ---------------------------------------------------------------------------------
// Elementos del DOM (Específicos de la página de inicio)
// ---------------------------------------------------------------------------------

const foxImg = document.getElementById('foxImg');
const bubble = document.getElementById('bubbleDialog');
const chatBar = document.getElementById('chatBar');
const chatInput = chatBar ? chatBar.querySelector('input[type="text"]') : null;
const chatSendButton = chatBar ? chatBar.querySelector('button[type="submit"]') : null;
const tagline = document.querySelector('.tagline');

// Estado de la aplicación
let talking = false; // Indica si el chat con el zorro está activo
const aiAvailable = false; // Controla si la IA está disponible para interactuar

// =================================================================================
// Interacción con el Personaje IA (Zorro)
// =================================================================================

// Solo añadir listeners si los elementos existen
if (foxImg && bubble && chatBar && chatInput && chatSendButton && tagline) {
  /**
   * Muestra la burbuja de diálogo cuando el mouse entra en la imagen del zorro.
   */
  foxImg.addEventListener('mouseenter', () => {
    if (!talking && !aiAvailable) {
      bubble.textContent = 'La IA aún no está disponible.';
      bubble.hidden = false;
    } else if (!talking && aiAvailable) {
      bubble.textContent = '¡Hola! Pasa el mouse o haz clic para hablar conmigo.';
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
    if (!aiAvailable) {
      bubble.textContent = 'La IA aún no está disponible. ¡Pronto podrás chatear conmigo!';
      bubble.hidden = false;
      // No mostrar la barra de chat si la IA no está disponible
      chatBar.hidden = true;
    } else if (!talking) {
      foxImg.src = 'src/images/fox_talk.png';
      bubble.textContent = '¡Estoy listo para responder!';
      bubble.hidden = false;
      chatBar.hidden = false;
      talking = true;
      chatInput.focus();
    }
  });

  /**
   * Maneja el envío del formulario de chat.
   */
  chatBar.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevenir el envío normal del formulario

    if (!aiAvailable) {
      bubble.textContent = 'La IA no está activa en este momento. ¡Vuelve pronto!';
      bubble.hidden = false;
      // Opcional: limpiar el input después de intentar enviar
      chatInput.value = '';
    } else {
      const userMessage = chatInput.value.trim();
      if (userMessage) {
        // Aquí se manejaría el envío del mensaje a la IA
        bubble.textContent = `Has dicho: "${userMessage}". (Respuesta de IA simulada)`;
        chatInput.value = ''; // Limpiar el input después de enviar
        bubble.hidden = false;
        foxImg.src = 'src/images/fox_talk.png'; // Mantener el zorro en estado de habla
      } else {
        bubble.textContent = 'Por favor, escribe un mensaje para la IA.';
        bubble.hidden = false;
      }
    }
  });

  // Asegurarse de que el tagline inicial sea correcto si la IA no está disponible
  if (!aiAvailable && tagline) {
    tagline.textContent = 'La IA aún no está disponible, ¡pero lo estará pronto!';
  } else if (aiAvailable && tagline) {
    tagline.textContent = 'IA lista para ayudarte — versión educativa';
  }
}

// =================================================================================
// Contador de Visualizaciones con Firebase Firestore
// =================================================================================

document.addEventListener('DOMContentLoaded', () => {
  // Selecciona todos los elementos 'a' con la clase 'tile' que están en las barras de navegación
  // Esto incluye tanto el menú móvil como los paneles laterales izquierdo y derecho
  const navLinks = document.querySelectorAll('.side.left .tile, .side.right .tile, .mobile-nav .tile');

  navLinks.forEach(link => {
    link.addEventListener('click', (event) => {
      // Extraer el texto de la opción para usarlo como nombre de campo en Firestore
      const optionTextElement = link.querySelector('.txt');
      if (optionTextElement) {
        const optionName = optionTextElement.textContent.trim();
        
        // Mapear los nombres de las opciones a los nombres de los campos en Firestore
        // Asegúrate de que estos nombres coincidan exactamente con los campos en tu base de datos
        let fieldToIncrement = '';
        switch(optionName) {
          case 'Paisajes y regiones':
            fieldToIncrement = 'PaisRegiones';
            break;
          case 'Seguridad Online':
            fieldToIncrement = 'SeguridadOnline';
            break;
          case 'Juegos':
            fieldToIncrement = 'Juegos';
            break;
          case 'Articulos':
            fieldToIncrement = 'Articulos';
            break;
          case 'Recomendaciones':
            fieldToIncrement = 'Recomendaciones';
            break;
          case 'MinTic':
            fieldToIncrement = 'MinTic';
            break;
          case 'Downloads':
            fieldToIncrement = 'Downloads';
            break;
          case 'Referencias':
            fieldToIncrement = 'Referencias';
            break;
          case 'Examen':
            fieldToIncrement = 'Examen';
            break;
          case 'Racha':
            fieldToIncrement = 'Racha';
            break;
          default:
            console.warn(`No se encontró un campo de Firestore para la opción: ${optionName}`);
            return; // No incrementar si no se encuentra un campo válido
        }

        if (fieldToIncrement) {
          incrementViewCounter(fieldToIncrement);
        }
      }
    });
  });
});
