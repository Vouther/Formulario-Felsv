document.addEventListener('DOMContentLoaded', () => {
// Seleccionamos todos los botones de copia
const copyButtons = document.querySelectorAll('.btn-copy');

copyButtons.forEach(button => {
    button.addEventListener('click', event => {
    event.preventDefault(); // 🚫 evita enviar el formulario

    // Buscar el input asociado al botón (está justo antes del botón)
    const input = button.closest('.input').querySelector('input');
    const textToCopy = input.value.trim();

    if (!textToCopy) {
        alert('No hay nada para copiar');
        return;
    }

    navigator.clipboard.writeText(textToCopy)
        .then(() => {
        // ✅ feedback visual con Semantic UI
        $(button)
            .addClass('green')
            .removeClass('violet')
            .html('<i class="check icon"></i> Copiado!');
        setTimeout(() => {
            $(button)
            .removeClass('green')
            .addClass('violet')
            .html('<i class="copy icon"></i> Copy');
        }, 1500);
        })
        .catch(err => {
        console.error('Error al copiar:', err);
        });
    });
});
});