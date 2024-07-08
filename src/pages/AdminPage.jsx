import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import AddMovie from './AddMovie';
import MyList from './MyList';
import TopNav from '../components/TopNav';

const AdminPage = () => {
    return (
        <Router>
            <TopNav />
            <Routes>
                <Route path="/admin/add-movie" element={<AddMovie />} />
                <Route path="/admin/my-list" element={<MyList />} />
            </Routes>
        </Router>
    );
};

export default AdminPage;

