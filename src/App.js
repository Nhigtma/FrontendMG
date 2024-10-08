import React from 'react';
import { Navigate, Route, BrowserRouter as Router, Routes, useLocation } from 'react-router-dom';
import Auth from '../src/pages/components/auth/Auth';
import CategoryView from '../src/pages/components/categoryView/CategoryView';
import CreateCategory from '../src/pages/components/createCategory/CreateCategory';
import History from '../src/pages/components/history/History';
import Home from '../src/pages/components/home/Home';
import NotificationsComponent from '../src/pages/components/notifications/notificationsCompenent';
import Topbar from '../src/pages/components/topbar/Topbar';

function App() {
    const location = useLocation();

    return (
        <div>
            <NotificationsComponent />
            
            {(location.pathname === '/home' || location.pathname === '/createCategory' || location.pathname.startsWith('/category/')) && <Topbar />}
            
            <Routes>
                <Route path="/" element={<Navigate to="/auth" />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/createCategory" element={<CreateCategory />} />
                <Route path="/home" element={<Home />} />
                <Route path="/history" element={< History/>} />
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