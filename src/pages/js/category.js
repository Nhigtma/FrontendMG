import { getAuth } from 'firebase/auth';

const API_URL = 'http://localhost:4000';

export const createCategory = async (name, description) => {
    try {
        const auth = getAuth();
        const user = auth.currentUser;

        if (!user) {
            throw new Error('El usuario no está autenticado');
        }

        const token = await user.getIdToken();

        const response = await fetch(`${API_URL}/protected/category`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
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

export const getCategories = async () => {
    try {
        const token = localStorage.getItem('token');

        const response = await fetch(`${API_URL}/protected/category`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Error al obtener las categorías');
        }

        return data;
    } catch (error) {
        console.error('Error al obtener las categorías:', error.message);
        throw error;
    }
};

export const getCategoryById = async (categoryId) => {
    try {
        const token = localStorage.getItem('token');

        const response = await fetch(`${API_URL}/protected/category/${categoryId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Error al obtener la categoría');
        }

        return data;
    } catch (error) {
        console.error('Error al obtener la categoría:', error.message);
        throw error;
    }
};

export const updateCategoryById = async (categoryId, name, description) => {
    try {
        const token = localStorage.getItem('token');

        const response = await fetch(`${API_URL}/protected/category/${categoryId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({ name, description }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Error al actualizar la categoría');
        }

        return await response.json();
    } catch (error) {
        console.error('Error al actualizar la categoría:', error.message);
        throw new Error(error.message);
    }
};

export const deleteCategoryById = async (categoryId) => {
    try {
        const token = localStorage.getItem('token');

        const response = await fetch(`${API_URL}/protected/category/${categoryId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Error al eliminar la categoría');
        }

        return await response.json();
    } catch (error) {
        console.error('Error al eliminar la categoría:', error.message);
        throw error;
    }
};

export const getWishesByCategory = async (categoryId) => {
    try {
        const token = localStorage.getItem('token');

        const response = await fetch(`${API_URL}/protected/wishes/category/${categoryId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Error al obtener los deseos de la categoría');
        }

        return data;
    } catch (error) {
        console.error('Error al obtener los deseos:', error.message);
        throw error;
    }
};
