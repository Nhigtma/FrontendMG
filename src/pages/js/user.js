import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const API_URL = 'http://localhost:4000';

export const registerUser = async (name, email, password) => {
    try {
        const response = await fetch(`${API_URL}/users/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, password }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Error al registrar el usuario');
        }

        return await loginUser(email, password);
    } catch (error) {
        throw new Error(error.message);
    }
};

export const loginUser = async (email, password) => {
    try {
        const response = await fetch(`${API_URL}/users/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Error al iniciar sesión');
        }

        const responseData = await response.json();
        const uid = responseData.user || responseData.uid;

        if (!uid) {
            throw new Error('El ID del usuario es undefined');
        }

        const auth = getAuth();
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const idToken = await userCredential.user.getIdToken();

        if (!idToken) {
            throw new Error('El ID Token es undefined');
        }

        localStorage.setItem('token', idToken);
        localStorage.setItem('userId', uid);

        return idToken;
    } catch (error) {
        console.error('Error:', error.message);
        throw new Error(error.message);
    }
};
