import { getAuth } from 'firebase/auth';

const API_URL = 'http://localhost:4000';

export const getUserHistory = async (userId) => {
    try {
        const auth = getAuth();
        const user = auth.currentUser;

        if (!user) {
            throw new Error('El usuario no está autenticado');
        }

        const token = await user.getIdToken();

        const response = await fetch(`${API_URL}/protected/history/${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Error al obtener el historial del usuario');
        }

        return data;
    } catch (error) {
        console.error('Error al obtener el historial del usuario:', error.message);
        throw error;
    }
};
