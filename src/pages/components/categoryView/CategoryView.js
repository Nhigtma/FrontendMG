import React, { useEffect, useState } from 'react';
import { FaComment, FaEdit, FaTrash } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import { getWishesByCategory } from '../../js/category';
import { getCommentsByWishId } from '../../js/comments';
import { getRoutinesByWishId } from '../../js/routineWishes';
import { deleteWishById, updateWishById } from '../../js/wish';
import Sidebar from '../sidebar/Sidebar';
import './categoryView.css';

const CategoryView = () => {
  const { categoryName } = useParams();
  const [categoryDescription, setCategoryDescription] = useState('Descripción no disponible.');
  const [wishDetails, setWishDetails] = useState([]);
  const [comments, setComments] = useState({});
  const [routines, setRoutines] = useState({});
  const [newComment, setNewComment] = useState('');
  const [selectedWishId, setSelectedWishId] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [wishTitle, setWishTitle] = useState('');
  const [wishDescription, setWishDescription] = useState('');

  useEffect(() => {
    const storedDescription = localStorage.getItem('categoryDescription');
    const categoryId = localStorage.getItem('categoryId');

    if (storedDescription) setCategoryDescription(storedDescription);
    
    if (categoryId) {
      const fetchWishes = async () => {
        try {
          const wishes = await getWishesByCategory(categoryId);
          if (wishes) {
            setWishDetails([...new Map(wishes.map(wish => [wish.title, wish])).values()]);
            const commentsData = {};
            const routinesData = {};

            for (const wish of wishes) {
              const wishComments = await getCommentsByWishId(wish.id);
              commentsData[wish.id] = wishComments;

              const wishRoutines = await getRoutinesByWishId(wish.id);
              routinesData[wish.id] = wishRoutines;
            }

            setComments(commentsData);
            setRoutines(routinesData);
          }
        } catch (error) {
          console.error('Error al obtener los deseos:', error.message);
        }
      };
      fetchWishes();
    }
  }, []);

  const handleEditClick = (wish) => {
    setWishTitle(wish.title);
    setWishDescription(wish.description);
    setSelectedWishId(wish.id);
    setEditMode(true);
  };

  const handleUpdateWish = async (e) => {
    e.preventDefault();
    try {
      await updateWishById(selectedWishId, wishTitle, wishDescription);
      setEditMode(false);
      setWishTitle('');
      setWishDescription('');
      setWishDetails(prev => prev.map(wish => wish.id === selectedWishId ? { ...wish, title: wishTitle, description: wishDescription } : wish));
    } catch (error) {
      console.error('Error al actualizar el deseo:', error.message);
    }
  };

  const handleDeleteWish = async (wishId) => {
    try {
      await deleteWishById(wishId);
      setWishDetails(prevWishes => prevWishes.filter(wish => wish.id !== wishId));
    } catch (error) {
      console.error('Error al eliminar el deseo:', error.message);
    }
  };

  return (
    <div className="category-view-container">
      <Sidebar options={["Categoría", "Calendario"]} />
      <div className="category-content">
        <h1 className="category-title">{categoryName || "Categoría sin nombre"}</h1>
        <p className="category-description">{categoryDescription}</p>

        <section className="wishes-grid">
          {wishDetails.length > 0 ? (
            wishDetails.map(wish => (
              <WishItem
                key={wish.id}
                wish={wish}
                comments={comments[wish.id]}
                routines={routines[wish.id]}
                onEditClick={handleEditClick}
                onDeleteClick={handleDeleteWish}
                newComment={newComment}
                setNewComment={setNewComment}
              />
            ))
          ) : (
            <p>No hay deseos asociados a esta categoría.</p>
          )}
        </section>

        {editMode && (
          <WishForm
            wishTitle={wishTitle}
            wishDescription={wishDescription}
            setWishTitle={setWishTitle}
            setWishDescription={setWishDescription}
            handleUpdateWish={handleUpdateWish}
            setEditMode={setEditMode}
          />
        )}
      </div>
    </div>
  );
};

const WishItem = ({ wish, comments, routines, onEditClick, onDeleteClick, newComment, setNewComment }) => (
  <div className="wish-card">
    <h3 className="wish-title">{wish.title}</h3>
    <p className="wish-description">{wish.description}</p>
    <div className="wish-actions">
      <button className="wish-button" onClick={() => onEditClick(wish)}>
        <FaEdit /> Editar
      </button>
      <button className="wish-button" onClick={() => onDeleteClick(wish.id)}>
        <FaTrash /> Eliminar
      </button>
    </div>

    <CommentsSection comments={comments} newComment={newComment} setNewComment={setNewComment} />
    <RoutinesSection routines={routines} />
  </div>
);

const CommentsSection = ({ comments = [], newComment, setNewComment }) => (
  <div className="comments-section">
    <h4>Comentarios</h4>
    <ul>
      {comments.length > 0 ? comments.map((comment, i) => <li key={i}>{comment}</li>) : <li>No hay comentarios.</li>}
    </ul>
    <textarea
      value={newComment}
      onChange={(e) => setNewComment(e.target.value)}
      placeholder="Escribe un comentario..."
      className="comment-textarea"
    />
    <button type="submit" className="comment-button">
      <FaComment /> Añadir comentario
    </button>
  </div>
);

const RoutinesSection = ({ routines = [] }) => (
  <div className="routines-section">
    <h4>Rutinas</h4>
    {routines.length > 0 ? (
      <ul>
        {routines.map((routine, index) => (
          <li key={index}>{routine.description}</li>
        ))}
      </ul>
    ) : (
      <p>No hay rutinas asociadas a este deseo.</p>
    )}
  </div>
);

const WishForm = ({ wishTitle, wishDescription, setWishTitle, setWishDescription, handleUpdateWish, setEditMode }) => (
  <form onSubmit={handleUpdateWish} className="wish-form">
    <h3>Actualizar Deseo</h3>
    <input
      type="text"
      value={wishTitle}
      onChange={(e) => setWishTitle(e.target.value)}
      placeholder="Título"
      required
      className="wish-input"
    />
    <textarea
      value={wishDescription}
      onChange={(e) => setWishDescription(e.target.value)}
      placeholder="Descripción"
      required
      className="wish-textarea"
    />
    <div className="form-actions">
      <button type="submit" className="wish-button">Actualizar</button>
      <button type="button" className="wish-button cancel" onClick={() => setEditMode(false)}>Cancelar</button>
    </div>
  </form>
);

export default CategoryView;
