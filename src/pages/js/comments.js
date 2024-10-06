import { getAuth } from 'firebase/auth';

const API_URL = 'http://localhost:4000';

export const createComment = async (wishId, commentText) => {
    try {
        const auth = getAuth();
        const user = auth.currentUser;

        if (!user) {
            throw new Error('El usuario no está autenticado');
        }

        const token = await user.getIdToken();

        const response = await fetch(`${API_URL}/protected/comment/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({ wish_id: wishId, comment_text: commentText }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Error al crear el comentario');
        }

        return await response.json();
    } catch (error) {
        console.error('Error al crear el comentario:', error.message);
        throw new Error(error.message);
    }
};

export const getCommentsByWishId = async (wishId) => {
    try {
        const token = localStorage.getItem('token');

        const response = await fetch(`${API_URL}/protected/comment/allcomment/${wishId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Error al obtener los comentarios');
        }

        return data;
    } catch (error) {
        console.error('Error al obtener los comentarios:', error.message);
        throw error;
    }
};

export const deleteCommentById = async (commentId) => {
    try {
        const token = localStorage.getItem('token');

        const response = await fetch(`${API_URL}/protected/comment/${commentId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Error al eliminar el comentario');
        }

        return await response.json();
    } catch (error) {
        console.error('Error al eliminar el comentario:', error.message);
        throw error;
    }
};

export const updateCommentById = async (commentId, commentText) => {
    try {
        const token = localStorage.getItem('token');

        const response = await fetch(`${API_URL}/protected/comment/${commentId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({ comment_text: commentText }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Error al actualizar el comentario');
        }

        return await response.json();
    } catch (error) {
        console.error('Error al actualizar el comentario:', error.message);
        throw new Error(error.message);
    }
};
