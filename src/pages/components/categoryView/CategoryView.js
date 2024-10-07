import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getWishesByCategory } from '../../js/category';
import { createComment, getCommentsByWishId } from '../../js/comments';
import Sidebar from '../sidebar/Sidebar';
import './categoryView.css';

const CategoryView = () => {
    const { categoryName } = useParams();
    const [categoryDescription, setCategoryDescription] = useState('Descripción no disponible.');
    const [wishDetails, setWishDetails] = useState([]);
    const [comments, setComments] = useState({});
    const [newComment, setNewComment] = useState('');
    const [selectedWishId, setSelectedWishId] = useState(null);

    useEffect(() => {
        const storedDescription = localStorage.getItem('categoryDescription');
        const categoryId = localStorage.getItem('categoryId');

        if (storedDescription) {
            setCategoryDescription(storedDescription);
        }

        if (categoryId) {
            const fetchWishes = async () => {
                try {
                    const wishes = await getWishesByCategory(categoryId);
                    if (wishes) {
                        const uniqueWishes = wishes.filter(
                            (wish, index, self) =>
                                index === self.findIndex((w) => w.title === wish.title)
                        );
                        setWishDetails(uniqueWishes);

                        // Obtener comentarios para cada deseo
                        const commentsData = {};
                        for (const wish of uniqueWishes) {
                            const wishComments = await getCommentsByWishId(wish.id);
                            commentsData[wish.id] = wishComments;
                        }
                        setComments(commentsData);
                    }
                } catch (error) {
                    console.error('Error al obtener los deseos:', error.message);
                }
            };

            fetchWishes();
        }
    }, []);

    const handleCommentSubmit = async (wishId) => {
        try {
            await createComment(wishId, newComment);
            setNewComment('');
            const updatedComments = await getCommentsByWishId(wishId);
            setComments((prevComments) => ({ ...prevComments, [wishId]: updatedComments }));
        } catch (error) {
            console.error('Error al crear el comentario:', error.message);
        }
    };

    return (
        <div className="category-view-container">
            <Sidebar options={["Categoría", "Calendario"]} />
            <div className="category-content">
                <h1 className="category-title">Categoría: {categoryName}</h1>
                <p className="category-description">{categoryDescription}</p>

                <div className="wishes-list">
                    <h2>Deseos</h2>
                    {wishDetails.length > 0 ? (
                        <ul>
                            {wishDetails.map((wish, index) => (
                                <li key={index}>
                                    <h3>{wish.title}</h3>
                                    <p>{wish.description}</p>

                                    <div className="comments-section">
                                        <h4>Comentarios</h4>
                                        <ul>
                                            {comments[wish.id]?.length > 0 ? (
                                                comments[wish.id].map((comment, i) => (
                                                    <li key={i}>{comment.comment_text}</li>
                                                ))
                                            ) : (
                                                <li>No hay comentarios.</li>
                                            )}
                                        </ul>

                                        <form
                                            onSubmit={(e) => {
                                                e.preventDefault();
                                                handleCommentSubmit(wish.id);
                                            }}
                                        >
                                            <textarea
                                                value={newComment}
                                                onChange={(e) => setNewComment(e.target.value)}
                                                placeholder="Escribe un comentario..."
                                            />
                                            <button type="submit">Añadir comentario</button>
                                        </form>
                                    </div>
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
