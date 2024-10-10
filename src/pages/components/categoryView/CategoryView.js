import React, { useEffect, useState } from 'react';
import { FaComment, FaEdit, FaTrash } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import { getWishesByCategory } from '../../js/category';
import { createComment, getCommentsByWishId } from '../../js/comments';
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

  // Cargar la información de la categoría, deseos y comentarios desde localStorage
  useEffect(() => {
    const storedDescription = localStorage.getItem('categoryDescription');
    const categoryId = localStorage.getItem('categoryId');
    const storedWishes = JSON.parse(localStorage.getItem('wishes')) || [];

    if (storedDescription) setCategoryDescription(storedDescription);

    if (storedWishes.length > 0) {
      setWishDetails(storedWishes);

      // Cargar comentarios desde localStorage
      const storedComments = {};
      storedWishes.forEach(wish => {
        const savedComments = JSON.parse(localStorage.getItem(`comments_${wish.id}`)) || [];
        storedComments[wish.id] = savedComments;
      });
      setComments(storedComments);
    } else if (categoryId) {
      const fetchWishes = async () => {
        try {
          const wishes = await getWishesByCategory(categoryId);
          if (wishes) {
            setWishDetails(wishes);
            localStorage.setItem('wishes', JSON.stringify(wishes));

            const commentsData = {};
            const routinesData = {};

            for (const wish of wishes) {
              // Obtener comentarios de la API o localStorage
              let wishComments = JSON.parse(localStorage.getItem(`comments_${wish.id}`)) || await getCommentsByWishId(wish.id);
              commentsData[wish.id] = wishComments;

              // Guardar comentarios en localStorage
              localStorage.setItem(`comments_${wish.id}`, JSON.stringify(wishComments));

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

  // Modo de edición de deseos
  const handleEditClick = (wish) => {
    setWishTitle(wish.title);
    setWishDescription(wish.description);
    setSelectedWishId(wish.id);
    setEditMode(true);
  };

  // Guardar los cambios de un deseo
  const handleUpdateWish = async (e) => {
    e.preventDefault();
    try {
      await updateWishById(selectedWishId, wishTitle, wishDescription);
      setEditMode(false);
      setWishTitle('');
      setWishDescription('');

      const updatedWishes = wishDetails.map(wish => wish.id === selectedWishId
        ? { ...wish, title: wishTitle, description: wishDescription }
        : wish);

      setWishDetails(updatedWishes);
      localStorage.setItem('wishes', JSON.stringify(updatedWishes));
    } catch (error) {
      console.error('Error al actualizar el deseo:', error.message);
    }
  };

  // Eliminar un deseo
  const handleDeleteWish = async (wishId) => {
    try {
      await deleteWishById(wishId);
      const updatedWishes = wishDetails.filter(wish => wish.id !== wishId);
      setWishDetails(updatedWishes);
      localStorage.setItem('wishes', JSON.stringify(updatedWishes));
    } catch (error) {
      console.error('Error al eliminar el deseo:', error.message);
    }
  };

  // Crear un nuevo comentario y guardarlo en localStorage
  const handleCreateComment = async (wishId) => {
    try {
      await createComment(wishId, newComment);

      const updatedComments = await getCommentsByWishId(wishId);
      setComments(prevComments => ({ ...prevComments, [wishId]: updatedComments }));

      // Guardar los comentarios actualizados en localStorage
      localStorage.setItem(`comments_${wishId}`, JSON.stringify(updatedComments));

      setNewComment('');
    } catch (error) {
      console.error('Error al crear el comentario:', error.message);
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
                onCreateComment={() => handleCreateComment(wish.id)}
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

// Componente para cada deseo
const WishItem = ({ wish, comments, routines, onEditClick, onDeleteClick, newComment, setNewComment, onCreateComment }) => (
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

    <CommentsSection
      comments={comments}
      newComment={newComment}
      setNewComment={setNewComment}
      onCreateComment={onCreateComment}
    />

    {routines && (
      <RoutinesSection routines={routines} />
    )}
  </div>
);

// Sección de comentarios
const CommentsSection = ({ comments, newComment, setNewComment, onCreateComment }) => (
  <div className="comments-section">
    <h4>Comentarios</h4>
    <ul>
      {comments && comments.length > 0 ? (
        comments.map((comment, idx) => <li key={idx}>{comment.text}</li>)
      ) : (
        <p>No hay comentarios</p>
      )}
    </ul>
    <textarea
      className="comment-textarea"
      value={newComment}
      onChange={e => setNewComment(e.target.value)}
      placeholder="Escribe un comentario"
    />
    <button className="comment-button" onClick={onCreateComment}>
      <FaComment /> Comentar
    </button>
  </div>
);

// Sección de rutinas
const RoutinesSection = ({ routines }) => (
  <div className="routines-section">
    <h4>Rutinas</h4>
    <ul>
      {routines.map((routine, idx) => <li key={idx}>{routine.description}</li>)}
    </ul>
  </div>
);

// Formulario para editar un deseo
const WishForm = ({ wishTitle, wishDescription, setWishTitle, setWishDescription, handleUpdateWish, setEditMode }) => (
  <form className="wish-form" onSubmit={handleUpdateWish}>
    <input
      type="text"
      value={wishTitle}
      onChange={e => setWishTitle(e.target.value)}
      placeholder="Título del deseo"
      required
    />
    <textarea
      value={wishDescription}
      onChange={e => setWishDescription(e.target.value)}
      placeholder="Descripción del deseo"
      required
    />
    <div className="form-buttons">
      <button type="submit">Guardar</button>
      <button type="button" onClick={() => setEditMode(false)}>Cancelar</button>
    </div>
  </form>
);

export default CategoryView;
