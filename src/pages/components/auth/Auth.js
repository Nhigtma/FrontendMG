import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebaseConfig';
import { registerUser } from '../../js/user';
import './auth.css';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setErrorMessage('');
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (password !== confirmPassword) {
      setErrorMessage("Las contraseñas no coinciden");
      return;
    }

    try {
      await registerUser(name, email, password);
      alert("Usuario registrado exitosamente");
      navigate('/createCategory');
    } catch (error) {
      handleError(error);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const idToken = await userCredential.user.getIdToken();
      const uid = userCredential.user.uid;
      
      localStorage.setItem('token', idToken);
      localStorage.setItem('userId', uid);
      
      alert("Inicio de sesión exitoso con Firebase");
      navigate('/createCategory');
    } catch (error) {
      handleError(error);
    }
  };

  const handleError = (error) => {
    if (error.code === 'auth/email-already-in-use') {
      setErrorMessage("El correo ya está registrado");
    } else if (error.code === 'auth/weak-password') {
      setErrorMessage("La contraseña debe tener al menos 6 caracteres");
    } else if (error.code === 'auth/user-not-found') {
      setErrorMessage("Usuario no encontrado");
    } else if (error.code === 'auth/wrong-password') {
      setErrorMessage("Contraseña incorrecta");
    } else {
      setErrorMessage(`Error: ${error.message}`);
    }
  };

  return (
    <div className={`auth-container ${isLogin ? 'login-mode' : 'register-mode'}`}>
      <div className="auth-card">
        <div className="auth-left" style={{ backgroundImage: `url(${Image})` }}></div>
        <div className="auth-right">
          {isLogin ? (
            <form onSubmit={handleLogin} className="form">
              <h2 className="auth-title">Iniciar Sesión</h2>
              <div className="input-field">
                <input
                  type="email"
                  placeholder="Correo Electrónico"
                  className="input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="input-field">
                <input
                  type="password"
                  placeholder="Contraseña"
                  className="input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              {errorMessage && <p className="error-message">{errorMessage}</p>}
              <button type="submit" className="submit-button">Iniciar Sesión</button>
              <p className="switch-form">
                ¿No tienes una cuenta? <a onClick={toggleForm}>Regístrate</a>
              </p>
            </form>
          ) : (
            <form onSubmit={handleRegister} className="form">
              <h2 className="auth-title">Registro</h2>
              <div className="input-field">
                <input
                  type="text"
                  placeholder="Nombre"
                  className="input"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="input-field">
                <input
                  type="email"
                  placeholder="Correo Electrónico"
                  className="input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="input-field">
                <input
                  type="password"
                  placeholder="Contraseña"
                  className="input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="input-field">
                <input
                  type="password"
                  placeholder="Confirmar Contraseña"
                  className="input"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
              {errorMessage && <p className="error-message">{errorMessage}</p>}
              <button type="submit" className="submit-button">Registrar</button>
              <p className="switch-form">
                ¿Ya tienes una cuenta? <a onClick={toggleForm}>Inicia Sesión</a>
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Auth;
