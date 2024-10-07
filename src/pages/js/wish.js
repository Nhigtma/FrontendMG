const API_URL = 'http://localhost:4000';

// Crear un nuevo deseo
export const createWish = async (title, description, categoryId, userId, isRoutine, routines) => {
    const token = localStorage.getItem('token');

    const wishData = {
        title,
        description,
        user_id: userId,
        category_id: categoryId,
        is_routine: isRoutine,
        routines: isRoutine ? routines : undefined
    };

    console.log('Datos enviados:', wishData);

    try {
        const response = await fetch(`${API_URL}/protected/wishes/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(wishData),
        });

        const data = await response.json();
        console.log('Respuesta del servidor:', data);

        if (!response.ok) {
            throw new Error(data.error || 'Error al crear el deseo');
        }

        return data;
    } catch (error) {
        console.error('Error al crear el deseo:', error.message);
        throw error;
    }
};

// Obtener un deseo por ID
export const getWishById = async (wishId) => {
    const token = localStorage.getItem('token');

    try {
        const response = await fetch(`${API_URL}/protected/wishes/${wishId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.error || 'Error al obtener el deseo');
        }

        return data;
    } catch (error) {
        console.error('Error al obtener el deseo:', error.message);
        throw error;
    }
};

// Actualizar un deseo por ID
export const updateWishById = async (wishId, title, description) => {
    const token = localStorage.getItem('token');

    const updateData = {
        title,
        description
    };

    try {
        const response = await fetch(`${API_URL}/protected/wishes/${wishId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(updateData),
        });

        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.error || 'Error al actualizar el deseo');
        }

        return data;
    } catch (error) {
        console.error('Error al actualizar el deseo:', error.message);
        throw error;
    }
};
    
export const deleteWishById = async (wishId) => {
    const token = localStorage.getItem('token');

    try {
        const response = await fetch(`${API_URL}/protected/wishes/${wishId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.error || 'Error al eliminar el deseo');
        }

        return data;
    } catch (error) {
        console.error('Error al eliminar el deseo:', error.message);
        throw error;
    }
};

// Obtener todos los deseos de un usuario
export const getUserWishes = async (userId) => {
    const token = localStorage.getItem('token');

    try {
        const response = await fetch(`${API_URL}/protected/wishes/user/${userId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.error || 'Error al obtener los deseos del usuario');
        }

        return data;
    } catch (error) {
        console.error('Error al obtener los deseos del usuario:', error.message);
        throw error;
    }
};

// Marcar un deseo como completado
export const completeWish = async (wishId, userId) => {
    const token = localStorage.getItem('token');

    const completeData = {
        user_id: userId
    };

    try {
        const response = await fetch(`${API_URL}/protected/wishes/complete/${wishId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(completeData),
        });

        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.error || 'Error al completar el deseo');
        }

        return data;
    } catch (error) {
        console.error('Error al completar el deseo:', error.message);
        throw error;
    }
};

// Marcar la rutina del deseo como realizada
export const performRoutine = async (wishId, userId) => {
    const token = localStorage.getItem('token');

    const performData = {
        user_id: userId
    };

    try {
        const response = await fetch(`${API_URL}/protected/wishes/performRoutine/${wishId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(performData),
        });

        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.error || 'Error al marcar la rutina como realizada');
        }

        return data;
    } catch (error) {
        console.error('Error al marcar la rutina como realizada:', error.message);
        throw error;
    }
};

// Reiniciar el estado de "wasPerformed" de las rutinas del usuario
export const resetWasPerformed = async (userId) => {
    const token = localStorage.getItem('token');

    try {
        const response = await fetch(`${API_URL}/protected/wishes/resetWasPerformed/${userId}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.error || 'Error al reiniciar el estado "wasPerformed"');
        }

        return data;
    } catch (error) {
        console.error('Error al reiniciar el estado "wasPerformed":', error.message);
        throw error;
    }
};

// export const routineWishes = async (title, description, categoryId, userId, routines) => {
//     const token = localStorage.getItem('token');

//     const routineData = {
//         title,
//         description,
//         user_id: userId,
//         category_id: categoryId,
//         is_routine: true,
//         routines: {
//             lunes: routines.lunes || null,
//             martes: routines.martes || null,
//             miercoles: routines.miercoles || null,
//             jueves: routines.jueves || null,
//             viernes: routines.viernes || null,
//             sabado: routines.sabado || null,
//             domingo: routines.domingo || null,
//         }
//     };
// }
