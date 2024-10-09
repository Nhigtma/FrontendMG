const API_URL = 'http://localhost:4000';

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

export const completeWish = async (wishId, userId) => {
    const token = localStorage.getItem('token');

    const completeData = {
        user_id: userId
    };

    try {
        const response = await fetch(`${API_URL}/protected/wishes/complete/${userId}/${wishId}`, {
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

export const performRoutine = async (wishId, userId) => {
    const token = localStorage.getItem('token');

    const performData = {
        user_id: userId
    };

    try {
        const response = await fetch(`${API_URL}/protected/wishes/performRoutine/${userId}/${wishId}`, {
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