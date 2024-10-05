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
