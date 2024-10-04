import { getAuth } from 'firebase/auth'; // Importa la función para obtener la autenticación
import React, { useState } from 'react';
import { createCategory } from '../../js/category';
import CreateWishModal from '../createWishModal/CreateWishModal';
import Sidebar from '../sidebar/Sidebar';
import './createCategory.css';

function CreateCategory() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isWishModalOpen, setIsWishModalOpen] = useState(false);
    const [categoryName, setCategoryName] = useState('');
    const [categoryDescription, setCategoryDescription] = useState('');
    const [error, setError] = useState({ name: false, description: false });

    const openCategoryModal = () => {
        setIsModalOpen(true);
    };

    const closeCategoryModal = () => {
        setIsModalOpen(false);
        setCategoryName('');
        setCategoryDescription('');
        setError({ name: false, description: false });
    };

    const openWishModal = () => {
        setIsWishModalOpen(true);
    };

    const closeWishModal = () => {
        setIsWishModalOpen(false);
    };

    const getToken = async () => {
        const auth = getAuth();
        const user = auth.currentUser;

        if (!user) {
            throw new Error('El usuario no está autenticado');
        }

        return await user.getIdToken(); // Obtener el token de ID
    };

    const handleCreateCategory = async () => {
        if (categoryName === '' || categoryDescription === '') {
            setError({
                name: categoryName === '',
                description: categoryDescription === ''
            });
            return;
        }
        try {
            const response = await createCategory(categoryName, categoryDescription);
            console.log('Categoría creada exitosamente:', response);
            closeCategoryModal();
            openWishModal();
        } catch (error) {
            console.error('Error al crear la categoría front:', error.message);
            alert(`Error al crear la categoría front: ${error.message}`);
        }
    };

    return (
        <div className="create-category-page">
            <Sidebar options={["Categoría", "Calendario", "Opción 3", "Opción 4"]} />
            <div className="main-content">
                <div className="create-category-container">
                    <div className="create-category-button" onClick={openCategoryModal}>
                        <span className="plus-icon">+</span>
                        <p>Crea tu Categoría</p>
                    </div>

                    {isModalOpen && (
                        <div className="modal-overlay">
                            <div className="modal-content">
                                <h2>Crear Nueva Categoría</h2>

                                <div className="input-group">
                                    <input
                                        type="text"
                                        value={categoryName}
                                        onChange={(e) => setCategoryName(e.target.value)}
                                        required
                                    />
                                    <label>Nombre de la Categoría:</label>
                                    {error.name && <span className="error-message">El nombre es obligatorio</span>}
                                </div>

                                <div className="input-group">
                                    <textarea
                                        value={categoryDescription}
                                        onChange={(e) => setCategoryDescription(e.target.value)}
                                        required
                                    ></textarea>
                                    <label>Descripción:</label>
                                    {error.description && (
                                        <span className="error-message">La descripción es obligatoria</span>
                                    )}
                                </div>

                                <div className="modal-actions">
                                    <button onClick={closeCategoryModal} className="cancel-button">Cancelar</button>
                                    <button onClick={handleCreateCategory} className="create-button">Crear</button>
                                </div>
                            </div>
                        </div>
                    )}

                    {isWishModalOpen && <CreateWishModal onClose={closeWishModal} />}
                </div>
            </div>
        </div>
    );
}

export default CreateCategory;
