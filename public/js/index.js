document.addEventListener('DOMContentLoaded', () => {
    let currentForm = null; // Para rastrear el formulario actualmente visible

    // Manejo de los botones del menú
    document.querySelectorAll('.menu-button').forEach(button => {
        button.addEventListener('click', () => {
            const formToShow = button.getAttribute('data-form');
            if (currentForm === formToShow) {
                // Si el formulario ya está visible, ocultarlo
                ocultarFormulario();
                currentForm = null;
            } else {
                // Mostrar el formulario seleccionado y ocultar los demás
                mostrarFormulario(formToShow);
                currentForm = formToShow;
            }
        });
    });

    function mostrarFormulario(formId) {
        document.querySelectorAll('.form-section').forEach(section => {
            if (section.id === formId) {
                section.style.display = 'block';
            } else {
                section.style.display = 'none';
            }
        });
        document.getElementById('response').style.display = 'none'; // Ocultar respuestas
    }

    function ocultarFormulario() {
        document.querySelectorAll('.form-section').forEach(section => {
            section.style.display = 'none';
        });
        document.getElementById('response').style.display = 'none'; // Ocultar respuestas
    }

    // Manejar la creación de usuario
    document.getElementById('createUserForm').addEventListener('submit', async (event) => {
        event.preventDefault();
        
        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData.entries());
        
        try {
            const response = await fetch('/api/users/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            
            const result = await response.json();
            
            if (response.ok) {
                mostrarDatosUsuario(result.user);
            } else {
                mostrarError(result.message || 'Ocurrió un error');
            }
        } catch (error) {
            mostrarError('Se produjo un error inesperado. Por favor, inténtalo de nuevo.');
        }
    });

    // Manejar la búsqueda de usuario
    document.getElementById('searchUserForm').addEventListener('submit', async (event) => {
        event.preventDefault();
        
        const userId = document.getElementById('searchId').value;
        
        try {
            const response = await fetch(`/api/users/${userId}`);
            const result = await response.json();
            
            if (response.ok) {
                mostrarDatosUsuario(result);
            } else {
                mostrarError(result.message || 'Ocurrió un error');
            }
        } catch (error) {
            mostrarError('Se produjo un error inesperado. Por favor, inténtalo de nuevo.');
        }
    });

    // Manejar la actualización de usuario
   //here
});
