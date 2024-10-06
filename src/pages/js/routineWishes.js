import { getAuth } from 'firebase/auth';

const API_URL = 'http://localhost:4000';

// Crear un deseo con rutina
export const createWishWithRoutine = async (wishData) => {
    try {
        const auth = getAuth();
        const user = auth.currentUser;

        if (!user) {
            throw new Error('El usuario no está autenticado');
        }

        const token = await user.getIdToken();

        const response = await fetch(`${API_URL}/protected/routines/wishesRoutine`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(wishData),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Error al crear el deseo con rutina');
        }

        return data;
    } catch (error) {
        console.error('Error al crear el deseo con rutina:', error.message);
        throw error;
    }
};

// Obtener rutinas por ID de deseo
export const getRoutinesByWishId = async (wishId) => {
    try {
        const auth = getAuth();
        const user = auth.currentUser;

        if (!user) {
            throw new Error('El usuario no está autenticado');
        }

        const token = await user.getIdToken();

        const response = await fetch(`${API_URL}/protected/routines/wishes/${wishId}/routines`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Error al obtener las rutinas');
        }

        return data;
    } catch (error) {
        console.error('Error al obtener las rutinas:', error.message);
        throw error;
    }
};

// Actualizar rutinas de un deseo
export const updateRoutinesByWishId = async (wishId, updatedRoutines) => {
    try {
        const auth = getAuth();
        const user = auth.currentUser;

        if (!user) {
            throw new Error('El usuario no está autenticado');
        }

        const token = await user.getIdToken();

        const response = await fetch(`${API_URL}/protected/routines/wishes/${wishId}/routines`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(updatedRoutines),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Error al actualizar las rutinas');
        }

        return data;
    } catch (error) {
        console.error('Error al actualizar las rutinas:', error.message);
        throw error;
    }
};

// Obtener todos los deseos con rutinas
export const getAllWishesWithRoutines = async () => {
    try {
        const auth = getAuth();
        const user = auth.currentUser;

        if (!user) {
            throw new Error('El usuario no está autenticado');
        }

        const token = await user.getIdToken();

        const response = await fetch(`${API_URL}/protected/routines/allRoutines`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Error al obtener todos los deseos con rutinas');
        }

        return data;
    } catch (error) {
        console.error('Error al obtener todos los deseos con rutinas:', error.message);
        throw error;
    }
};

// Eliminar una rutina
export const deleteRoutine = async (routineId) => {
    try {
        const auth = getAuth();
        const user = auth.currentUser;

        if (!user) {
            throw new Error('El usuario no está autenticado');
        }

        const token = await user.getIdToken();

        const response = await fetch(`${API_URL}/protected/routines/wishes/routines/${routineId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Error al eliminar la rutina');
        }

        return data;
    } catch (error) {
        console.error('Error al eliminar la rutina:', error.message);
        throw error;
    }
};
//     console.log('Datos de la rutina enviados:', routineData);

//     try {
//         const response = await fetch(`${API_URL}/protected/routines/wishesRoutine`, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': `Bearer ${token}`,
//             },
//             body: JSON.stringify(routineData),
//         });

//         const data = await response.json();
//         console.log('Respuesta del servidor:', data);

//         if (!response.ok) {
//             throw new Error(data.error || 'Error al crear la rutina');
//         }

//         return data;
//     } catch (error) {
//         console.error('Error al crear la rutina:', error.message);
//         throw error;
//     }
// };
