import React, { useEffect, useState } from 'react';
import { createCategory } from '../../js/category';
import CreateWishModal from '../createWishModal/CreateWishModal';
import Sidebar from '../sidebar/Sidebar';
import './createCategory.css';

function CreateCategory() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isWishModalOpen, setIsWishModalOpen] = useState(false);
    const [categoryName, setCategoryName] = useState('');
    const [categoryDescription, setCategoryDescription] = useState('');
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState({ name: false, description: false });

    useEffect(() => {
        const storedCategories = JSON.parse(localStorage.getItem('categories')) || [];
        setCategories(storedCategories);
    }, []);

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

            const newCategory = { name: categoryName, id: response.id || response.data.id };

            localStorage.setItem('categoryId', response.id || response.data.id);
            localStorage.setItem('categoryDescription', categoryDescription);

            const updatedCategories = [...categories, newCategory];
            setCategories(updatedCategories);
            localStorage.setItem('categories', JSON.stringify(updatedCategories));

            closeCategoryModal();
            openWishModal();
        } catch (error) {
            console.error('Error al crear la categoría en el frontend:', error.response?.data?.message || error.message);
            alert(`Error al crear la categoría: ${error.response?.data?.message || error.message}`);
        }
    };

    return (
        <div className="create-category-page">
            <Sidebar options={["Categoría", "Calendario"]} categories={categories} />
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
