import React from 'react';
import { Navigate, Route, BrowserRouter as Router, Routes, useLocation } from 'react-router-dom';
import Auth from '../src/pages/components/auth/Auth';
import CategoryView from '../src/pages/components/categoryView/CategoryView'; // Importa la vista de categorías
import CreateCategory from '../src/pages/components/createCategory/CreateCategory';
import Home from '../src/pages/components/home/Home';
import Topbar from '../src/pages/components/topbar/Topbar';

function App() {
    const location = useLocation();

    return (
        <div>
            {(location.pathname === '/home' || location.pathname === '/createCategory' || location.pathname.startsWith('/category/')) && <Topbar />}
            
            <Routes>
                <Route path="/" element={<Navigate to="/auth" />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/createCategory" element={<CreateCategory />} />
                <Route path="/home" element={<Home />} />
                {/* Ruta dinámica para categorías */}
                <Route path="/category/:categoryName" element={<CategoryView />} />
            </Routes>
        </div>
    );
}

function AppWrapper() {
    return (
        <Router>
            <App />
        </Router>
    );
}

export default AppWrapper;
