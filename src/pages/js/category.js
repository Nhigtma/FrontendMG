import { getAuth } from 'firebase/auth';

const API_URL = 'http://localhost:4000';

// Función para crear categoría
export const createCategory = async (name, description) => {
    try {
        const auth = getAuth();
        const user = auth.currentUser;

        if (!user) {
            throw new Error('El usuario no está autenticado');
        }

        const token = await user.getIdToken(); // Obtener el token de ID del usuario autenticado

        const response = await fetch(`${API_URL}/protected/category`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`, // Incluir el token en las cabeceras
            },
            body: JSON.stringify({ name, description }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Error al crear la categoría');
        }

        return await response.json();
    } catch (error) {
        console.error('Error:', error.message);
        throw new Error(error.message);
    }
};
