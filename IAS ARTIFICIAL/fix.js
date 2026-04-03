/* 
    IAS ARTIFICIAL - ESTRATEGIA 2026-2027
    FIX.JS: Optimización de Performance y UX (Nivel Élite)
*/

// Fix robusto para Viewport en Mobile (Evita el salto de la barra de direcciones)
function updateViewportHeight() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}

// Inicialización inmediata y en eventos clave
window.addEventListener('resize', updateViewportHeight);
window.addEventListener('orientationchange', updateViewportHeight);
updateViewportHeight();

document.addEventListener("DOMContentLoaded", () => {
    console.log("IAS Artificial: Motor de rendimiento y corrección de Viewport activo.");
    // Doble verificación post-load para asegurar precisión
    updateViewportHeight();
});
