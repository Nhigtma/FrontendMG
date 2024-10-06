import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getWishesByCategory } from '../../js/category';
import Sidebar from '../sidebar/Sidebar';
import './categoryView.css';

const CategoryView = () => {
    const { categoryName } = useParams();  // Obtener el nombre de la categoría de la URL
    const [categoryDescription, setCategoryDescription] = useState('');  // Descripción de la categoría
    const [wishes, setWishes] = useState([]);  // Lista de deseos

    useEffect(() => {
        const storedDescription = localStorage.getItem('categoryDescription');
        const categoryId = localStorage.getItem('categoryId');  // Obtén el categoryId del localStorage

        if (storedDescription) {
            setCategoryDescription(storedDescription);
        } else {
            setCategoryDescription('Descripción no disponible.');
        }

        if (categoryId) {
            // Función para obtener los deseos según el ID de la categoría
            const fetchWishes = async () => {
                try {
                    const response = await getWishesByCategory(categoryId);  // Llamar a la API con el ID de la categoría
                    if (response?.data) {
                        setWishes(response.data);  // Guardar los deseos en el estado
                    } else {
                        console.error('No se encontraron deseos.');
                    }
                } catch (error) {
                    console.error('Error al obtener los deseos:', error.message);
                }
            };

            fetchWishes();  // Ejecutar la función al cargar el componente
        } else {
            console.error('No se encontró el categoryId en el localStorage.');
        }
    }, []);

    return (
        <div className="category-view-container">
            <Sidebar options={["Categoría", "Calendario"]} />
            <div className="category-content">
                <h1 className="category-title">Categoría: {categoryName}</h1>
                <p className="category-description">{categoryDescription}</p>

                <div className="wishes-list">
                    <h2>Deseos</h2>
                    {wishes.length > 0 ? (
                        <ul>
                            {wishes.map(wish => (
                                <li key={wish.id}>
                                    <h3>{wish.title}</h3>  {/* Mostrar el título del deseo */}
                                    <p>{wish.description}</p>  {/* Mostrar la descripción del deseo */}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No hay deseos asociados a esta categoría.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CategoryView;
